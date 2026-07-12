import { createHash, createHmac, randomUUID } from "crypto";
import { execFileSync } from "child_process";
import {
  chmodSync,
  closeSync,
  existsSync,
  fsyncSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  realpathSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { dirname, join, resolve } from "path";
import { canonicalizeRemote } from "./gstack-memory-helpers";
import { buildGbrainEnv, execGbrainJson, spawnGbrain } from "./gbrain-exec";
import { parseSourcesList, type GbrainSourceRow } from "./gbrain-sources";

const ENROLLMENT_SCHEMA = 3;
const SETUP_SCHEMA = 2;
const MIN_GBRAIN_VERSION = "0.42.0";
const REQUIRED_CAPABILITIES = ["explicit-source", "root-identity", "reconciliation-manifest", "db-roles", "schema-v2"];
const ACTIVE_SETUP_STATES = new Set(["started", "validated", "source_registering", "source_registered", "syncing", "synced", "rolling_back"]);

export interface RepoIdentity {
  canonical_root: string;
  git_common_dir: string;
  remote: string | null;
  head_commit: string;
  host_display: string;
  repo_key: string;
  repo_hash: string;
}

export interface BrainIdentity {
  gbrain_home: string;
  database_identity: string;
  database_hash: string;
  database_kind: "capability-session";
}

export interface SourceBinding {
  source_id: string;
  source_generation: string;
}

export interface EnrollmentRecord {
  schema_version: 3;
  enrollment_id: string;
  generation: number;
  source: SourceBinding;
  brain: BrainIdentity;
  repo: RepoIdentity;
  filesystem: {
    root_dev: number | null;
    root_ino: number | null;
  };
  created_at: string;
  updated_at: string;
  signature: string;
}

export interface SetupOperation {
  schema_version: 2;
  operation_id: string;
  enrollment_id: string;
  source_id: string;
  canonical_root: string;
  state:
    | "started"
    | "validated"
    | "source_registering"
    | "source_registered"
    | "syncing"
    | "synced"
    | "failed"
    | "complete"
    | "rolling_back"
    | "rolled_back";
  attempt: number;
  lease_owner: string;
  lease_until: string;
  previous_state?: SetupOperation["state"];
  previous_operation_id?: string;
  source_preexisted?: boolean;
  source_created?: boolean;
  source_generation_before?: string;
  source_generation_after?: string;
  anchor_before?: string;
  anchor_after?: string;
  page_count?: number | null;
  valid_empty_proof?: string;
  failed_files?: number;
  updated_at: string;
  error?: string;
}

export interface CapabilityGateResult {
  ok: boolean;
  reason: string;
  version?: string;
  capabilities?: string[];
  database_identity?: string;
}

export interface CollisionDisposition {
  ok: boolean;
  reason: string;
  target_id?: string;
  collisions: Array<{ kind: string; id: string; path?: string | null; detail?: string }>;
}

export interface EnrollmentPaths {
  enrollmentPath: string;
  setupPath: string;
  lockPath: string;
}

export interface EnrollmentCommandStatus {
  enrollment: EnrollmentRecord | null;
  setup: SetupOperation | null;
  valid: boolean;
  reason: string;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${JSON.stringify(k)}:${stableJson(v)}`);
    return `{${entries.join(",")}}`;
  }
  return JSON.stringify(value);
}

function parseVersion(v: string): number[] {
  const m = v.match(/(\d+)\.(\d+)\.(\d+)/);
  if (!m) return [0, 0, 0];
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function versionAtLeast(actual: string, required: string): boolean {
  const a = parseVersion(actual);
  const r = parseVersion(required);
  for (let i = 0; i < 3; i++) {
    if (a[i] > r[i]) return true;
    if (a[i] < r[i]) return false;
  }
  return true;
}

function fsyncParent(path: string): void {
  const fd = openSync(dirname(path), "r");
  try { fsyncSync(fd); } finally { closeSync(fd); }
}

function assertNotSymlink(path: string): void {
  if (!existsSync(path)) return;
  if (lstatSync(path).isSymbolicLink()) throw new Error(`refusing symlinked state path: ${path}`);
}

function atomicWriteProtected(path: string, body: string): void {
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  chmodSync(dirname(path), 0o700);
  assertNotSymlink(path);
  const tmp = `${path}.tmp.${process.pid}.${randomUUID()}`;
  const fd = openSync(tmp, "wx", 0o600);
  try {
    writeFileSync(fd, body, "utf-8");
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
  chmodSync(tmp, 0o600);
  renameSync(tmp, path);
  chmodSync(path, 0o600);
  fsyncParent(path);
}

function keyPathFor(recordPath: string): string {
  return join(dirname(recordPath), ".enrollment-signing-key");
}

function signingKey(recordPath: string): Buffer {
  const path = keyPathFor(recordPath);
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  chmodSync(dirname(path), 0o700);
  assertNotSymlink(path);
  if (!existsSync(path)) {
    const key = createHash("sha256").update(`${randomUUID()}:${Date.now()}:${process.pid}`).digest("hex");
    atomicWriteProtected(path, key);
  }
  chmodSync(path, 0o600);
  return Buffer.from(readFileSync(path, "utf-8"), "utf-8");
}

function signRecord(path: string, record: Omit<EnrollmentRecord, "signature">): string {
  return createHmac("sha256", signingKey(path)).update(stableJson(record)).digest("hex");
}

function capabilitiesPayload(env: NodeJS.ProcessEnv): Record<string, unknown> | null {
  return execGbrainJson<Record<string, unknown>>(["capabilities", "--json"], { baseEnv: env, timeout: 5000 });
}

function databaseIdentityFromCapabilities(payload: Record<string, unknown> | null): string | null {
  if (!payload) return null;
  const direct = payload.database_identity ?? payload.db_identity ?? payload.connected_database_identity;
  if (typeof direct === "string" && direct.trim()) return direct.trim();
  const db = payload.database;
  if (db && typeof db === "object") {
    const nested = (db as Record<string, unknown>).identity ?? (db as Record<string, unknown>).session_identity;
    if (typeof nested === "string" && nested.trim()) return nested.trim();
  }
  return null;
}

export function realRepoIdentity(root: string, env: NodeJS.ProcessEnv = process.env): RepoIdentity {
  let canonicalRoot: string;
  try {
    canonicalRoot = realpathSync(root);
  } catch (err) {
    throw new Error(`cannot prove canonical repo root identity: ${(err as Error).message}`);
  }
  const git = (args: string[]) => execFileSync("git", args, { cwd: canonicalRoot, encoding: "utf-8", timeout: 5000, env }).trim();
  const commonRaw = git(["rev-parse", "--git-common-dir"]);
  const gitCommonDir = realpathSync(resolve(canonicalRoot, commonRaw));
  let headCommit: string;
  try {
    headCommit = git(["rev-parse", "HEAD"]);
  } catch {
    headCommit = "unborn";
  }
  let remote: string | null = null;
  try {
    remote = canonicalizeRemote(git(["remote", "get-url", "origin"]));
  } catch {
    remote = null;
  }
  const hostDisplay = env.GSTACK_HOSTNAME || execFileSync("hostname", [], { encoding: "utf-8", timeout: 2000 }).trim();
  const repoKey = [remote || "local", gitCommonDir, canonicalRoot].join("|");
  return {
    canonical_root: canonicalRoot,
    git_common_dir: gitCommonDir,
    remote,
    head_commit: headCommit,
    host_display: hostDisplay,
    repo_key: repoKey,
    repo_hash: sha256(repoKey),
  };
}

export function deriveCollisionResistantSourceId(repo: RepoIdentity): string {
  const remoteParts = repo.remote?.split("/").filter(Boolean) || [];
  const name = remoteParts[remoteParts.length - 1] || repo.canonical_root.split(/[\\/]/).pop() || "repo";
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "repo";
  const suffix = repo.repo_hash.slice(0, 14);
  const prefix = "gstack-code";
  const budget = 32 - prefix.length - suffix.length - 2;
  const trimmed = cleanName.slice(0, Math.max(1, budget)).replace(/-+$/g, "") || "repo";
  return `${prefix}-${trimmed}-${suffix}`;
}

export function brainIdentity(env: NodeJS.ProcessEnv = process.env): BrainIdentity {
  const payload = capabilitiesPayload(env);
  const databaseIdentity = databaseIdentityFromCapabilities(payload);
  if (!databaseIdentity) {
    throw new Error("cannot prove connected database identity from gbrain capabilities --json");
  }
  const gbrainHome = env.GBRAIN_HOME ? resolve(env.GBRAIN_HOME) : resolve(env.HOME || process.cwd(), ".gbrain");
  return {
    gbrain_home: existsSync(gbrainHome) ? realpathSync(gbrainHome) : gbrainHome,
    database_identity: databaseIdentity,
    database_hash: sha256(databaseIdentity),
    database_kind: "capability-session",
  };
}

export function sourceGeneration(row: GbrainSourceRow | undefined): string {
  if (!row) return "absent";
  return sha256(stableJson({ id: row.id, local_path: row.local_path || null, config: row.config || null }));
}

export function fetchSourceRow(sourceId: string, env: NodeJS.ProcessEnv): GbrainSourceRow | undefined {
  const raw = execGbrainJson<unknown>(["sources", "list", "--json"], { baseEnv: env });
  if (raw === null) throw new Error("cannot read gbrain sources list for enrollment validation");
  return parseSourcesList(raw).find((s) => s.id === sourceId);
}

export function enrollmentPaths(enrollmentId: string, gstackHome: string): EnrollmentPaths {
  return {
    enrollmentPath: join(gstackHome, "gbrain-enrollments", `${enrollmentId}.json`),
    setupPath: join(gstackHome, "gbrain-setup-ops", `${enrollmentId}.json`),
    lockPath: join(gstackHome, "gbrain-setup-ops", `${enrollmentId}.lock`),
  };
}

export function expectedEnrollmentId(repo: RepoIdentity, brain: BrainIdentity): string {
  return sha256(stableJson({ repo_hash: repo.repo_hash, database_identity: brain.database_identity })).slice(0, 24);
}

export function buildEnrollmentRecord(
  repo: RepoIdentity,
  brain: BrainIdentity,
  source: SourceBinding,
  existing?: EnrollmentRecord,
  recordPath = "",
): EnrollmentRecord {
  const now = new Date().toISOString();
  let rootDev: number | null = null;
  let rootIno: number | null = null;
  try {
    const stat = statSync(realpathSync(repo.canonical_root));
    rootDev = Number(stat.dev);
    rootIno = Number(stat.ino);
  } catch {
    rootDev = null;
    rootIno = null;
  }
  const withoutSignature = {
    schema_version: ENROLLMENT_SCHEMA,
    enrollment_id: expectedEnrollmentId(repo, brain),
    generation: existing ? existing.generation + 1 : 1,
    source,
    brain,
    repo,
    filesystem: { root_dev: rootDev, root_ino: rootIno },
    created_at: existing?.created_at || now,
    updated_at: now,
  } satisfies Omit<EnrollmentRecord, "signature">;
  const signature = recordPath ? signRecord(recordPath, withoutSignature) : sha256(stableJson(withoutSignature));
  return { ...withoutSignature, signature };
}

export function readEnrollment(path: string): EnrollmentRecord | null {
  if (!existsSync(path)) return null;
  assertNotSymlink(path);
  const record = JSON.parse(readFileSync(path, "utf-8")) as EnrollmentRecord;
  const { signature, ...withoutSignature } = record;
  const expected = signRecord(path, withoutSignature);
  if (signature !== expected) {
    throw new Error("enrollment signature mismatch");
  }
  return record;
}

export function writeEnrollment(path: string, record: EnrollmentRecord): void {
  const { signature: _old, ...withoutSignature } = record;
  const signed = { ...withoutSignature, signature: signRecord(path, withoutSignature) };
  atomicWriteProtected(path, JSON.stringify(signed, null, 2));
}

export function validateEnrollment(record: EnrollmentRecord, repo: RepoIdentity, brain: BrainIdentity, row: GbrainSourceRow | undefined): void {
  if (record.schema_version !== ENROLLMENT_SCHEMA) throw new Error("unsupported enrollment schema");
  if (record.enrollment_id !== expectedEnrollmentId(repo, brain)) throw new Error("enrollment is bound to a different repo or brain identity");
  if (record.repo.repo_hash !== repo.repo_hash) throw new Error("repository identity mismatch");
  if (record.repo.canonical_root !== repo.canonical_root) throw new Error("canonical root identity mismatch");
  if (record.brain.database_identity !== brain.database_identity) throw new Error("brain/database identity mismatch");
  if (!row) throw new Error("enrolled source is missing from gbrain");
  if (row.local_path !== repo.canonical_root) throw new Error("registered source root drift");
  if (sourceGeneration(row) !== record.source.source_generation) throw new Error("source registration generation changed");
}

export function legacySourceId(repo: RepoIdentity): string {
  const remoteParts = repo.remote?.split("/").filter(Boolean) || [];
  const raw = remoteParts.length >= 2 ? remoteParts.slice(-2).join("-") : repo.canonical_root.split(/[\\/]/).pop() || "repo";
  const clean = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "repo";
  return `gstack-code-${clean}`.slice(0, 32).replace(/-+$/g, "");
}

function pathHashLegacySourceId(repo: RepoIdentity): string {
  const pathHash = createHash("sha1").update(repo.canonical_root).digest("hex").slice(0, 8);
  const base = legacySourceId(repo).replace(/^gstack-code-/, "");
  return `gstack-code-${base}-${pathHash}`.slice(0, 32).replace(/-+$/g, "");
}

export function sourceCollisionDisposition(
  sourceId: string,
  repo: RepoIdentity,
  env: NodeJS.ProcessEnv = process.env,
): CollisionDisposition {
  const raw = execGbrainJson<unknown>(["sources", "list", "--json"], { baseEnv: env });
  if (raw === null) {
    return { ok: false, target_id: sourceId, collisions: [{ kind: "inventory-unreadable", id: sourceId }], reason: "cannot read gbrain sources list for source-collision disposition" };
  }
  const rows = parseSourcesList(raw);
  const ids = new Set([sourceId, legacySourceId(repo), pathHashLegacySourceId(repo)]);
  const collisions: CollisionDisposition["collisions"] = [];
  for (const row of rows) {
    const path = row.local_path ?? null;
    if (row.id === sourceId && path && path !== repo.canonical_root) collisions.push({ kind: "target-id-different-root", id: row.id, path });
    if (ids.has(row.id) && row.id !== sourceId) collisions.push({ kind: "historical-id", id: row.id, path });
    const cfg = row.config && typeof row.config === "object" ? row.config as Record<string, unknown> : {};
    const archived = cfg.archived === true || cfg.archive === true || cfg.status === "archived";
    const aliases = Array.isArray(cfg.aliases) ? cfg.aliases.filter((a): a is string => typeof a === "string") : [];
    if (archived && (ids.has(row.id) || path === repo.canonical_root)) collisions.push({ kind: "archived-row", id: row.id, path });
    if (aliases.some((a) => ids.has(a))) collisions.push({ kind: "alias", id: row.id, path, detail: aliases.join(",") });
    if (row.id !== sourceId && path === repo.canonical_root) collisions.push({ kind: "duplicate-root", id: row.id, path });
    if (repo.remote && cfg.remote_url && canonicalizeRemote(String(cfg.remote_url)) === repo.remote && row.id !== sourceId) collisions.push({ kind: "duplicate-remote", id: row.id, path });
  }
  if (collisions.length > 0) {
    return { ok: false, target_id: sourceId, collisions, reason: `source collision inventory requires explicit disposition before side effects: ${collisions.map((c) => `${c.kind}:${c.id}`).join(",")}` };
  }
  return { ok: true, target_id: sourceId, collisions: [], reason: "ok" };
}

export function capabilityGate(env: NodeJS.ProcessEnv = process.env): CapabilityGateResult {
  const versionResult = spawnGbrain(["--version"], { baseEnv: env, timeout: 5000 });
  const versionText = `${versionResult.stdout || ""}${versionResult.stderr || ""}`.trim();
  const version = versionText.match(/(\d+\.\d+\.\d+(?:\.\d+)?)/)?.[1] || "0.0.0";
  if (versionResult.status !== 0 || !versionAtLeast(version, MIN_GBRAIN_VERSION)) {
    return { ok: false, reason: `gbrain ${version || "unknown"} lacks required sync-safety version ${MIN_GBRAIN_VERSION}`, version };
  }
  const capsRaw = capabilitiesPayload(env);
  const caps = Array.isArray((capsRaw as { capabilities?: unknown[] } | null)?.capabilities)
    ? ((capsRaw as { capabilities: unknown[] }).capabilities.filter((c): c is string => typeof c === "string"))
    : [];
  const missing = REQUIRED_CAPABILITIES.filter((c) => !caps.includes(c));
  const databaseIdentity = databaseIdentityFromCapabilities(capsRaw);
  if (!databaseIdentity) missing.push("connected-database-identity");
  if (missing.length > 0) {
    return { ok: false, reason: `gbrain capability gate failed: missing ${missing.join(",")}`, version, capabilities: caps };
  }
  return { ok: true, reason: "ok", version, capabilities: caps, database_identity: databaseIdentity || undefined };
}

export function writeSetupState(path: string, op: SetupOperation, expectedState?: SetupOperation["state"]): void {
  const existing = readSetupState(path);
  if (expectedState && existing && existing.state !== expectedState) {
    throw new Error(`setup CAS failed: expected ${expectedState}, found ${existing.state}`);
  }
  const previous_state = existing?.state;
  const next = { ...op, previous_state, updated_at: new Date().toISOString() };
  atomicWriteProtected(path, JSON.stringify(next, null, 2));
}

export function transitionSetupState(path: string, op: SetupOperation, state: SetupOperation["state"], patch: Partial<SetupOperation> = {}): SetupOperation {
  const current = readSetupState(path);
  const next: SetupOperation = {
    ...op,
    ...current,
    ...patch,
    state,
    previous_state: current?.state || op.state,
    attempt: (current?.attempt || op.attempt || 0) + (state === "started" ? 0 : 1),
    updated_at: new Date().toISOString(),
  };
  writeSetupState(path, next);
  return next;
}

export function readSetupState(path: string): SetupOperation | null {
  if (!existsSync(path)) return null;
  assertNotSymlink(path);
  return JSON.parse(readFileSync(path, "utf-8")) as SetupOperation;
}

export function ensureNoInterruptedSetup(path: string): void {
  const op = readSetupState(path);
  if (!op) return;
  if (ACTIVE_SETUP_STATES.has(op.state)) {
    throw new Error(`interrupted setup operation ${op.operation_id} is ${op.state}; run gstack-gbrain-sync --enroll-inspect, --enroll-resume, or --enroll-rollback before syncing`);
  }
}

export function newSetupOperation(enrollmentId: string, sourceId: string, canonicalRoot: string, previous?: SetupOperation | null): SetupOperation {
  const seed = stableJson({ enrollmentId, sourceId, canonicalRoot, previous: previous?.operation_id || null });
  return {
    schema_version: SETUP_SCHEMA,
    operation_id: sha256(seed).slice(0, 24),
    enrollment_id: enrollmentId,
    source_id: sourceId,
    canonical_root: canonicalRoot,
    state: "started",
    attempt: (previous?.attempt || 0) + 1,
    lease_owner: `${process.pid}`,
    lease_until: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    previous_operation_id: previous?.operation_id,
    updated_at: new Date().toISOString(),
  };
}

export function acquireEnrollmentLock(path: string): () => void {
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  chmodSync(dirname(path), 0o700);
  assertNotSymlink(path);
  const fd = openSync(path, "wx", 0o600);
  writeFileSync(fd, JSON.stringify({ pid: process.pid, at: new Date().toISOString() }), "utf-8");
  fsyncSync(fd);
  closeSync(fd);
  return () => {
    unlinkSync(path);
    fsyncParent(path);
  };
}

export function enrollmentContext(root: string, gstackHome: string, env: NodeJS.ProcessEnv = process.env) {
  const gate = capabilityGate(env);
  if (!gate.ok) throw new Error(gate.reason);
  const repo = realRepoIdentity(root, env);
  const brain = brainIdentity(env);
  const enrollmentId = expectedEnrollmentId(repo, brain);
  const paths = enrollmentPaths(enrollmentId, gstackHome);
  return { repo, brain, enrollmentId, paths, gate };
}

export function enrollmentStatus(root: string, gstackHome: string, env: NodeJS.ProcessEnv = process.env): string {
  const status = inspectEnrollment(root, gstackHome, env);
  return status.valid ? "valid" : status.reason;
}

export function inspectEnrollment(root: string, gstackHome: string, env: NodeJS.ProcessEnv = process.env): EnrollmentCommandStatus {
  const { repo, brain, paths } = enrollmentContext(root, gstackHome, env);
  const setup = readSetupState(paths.setupPath);
  const record = readEnrollment(paths.enrollmentPath);
  if (!record) return { enrollment: null, setup, valid: false, reason: "missing" };
  try {
    const row = fetchSourceRow(record.source.source_id, buildGbrainEnv({ baseEnv: env }));
    validateEnrollment(record, repo, brain, row);
    return { enrollment: record, setup, valid: true, reason: "valid" };
  } catch (err) {
    return { enrollment: record, setup, valid: false, reason: (err as Error).message };
  }
}

export async function rollbackEnrollment(root: string, gstackHome: string, env: NodeJS.ProcessEnv = process.env): Promise<SetupOperation> {
  const ctx = enrollmentContext(root, gstackHome, env);
  const release = acquireEnrollmentLock(ctx.paths.lockPath);
  try {
    const op = readSetupState(ctx.paths.setupPath);
    if (!op) throw new Error("no setup operation to roll back");
    if (!op.source_created) {
      const rolled = { ...op, state: "rolled_back" as const, error: undefined };
      writeSetupState(ctx.paths.setupPath, rolled);
      return rolled;
    }
    transitionSetupState(ctx.paths.setupPath, op, "rolling_back");
    const rm = spawnGbrain(["sources", "remove", op.source_id, "--yes"], { baseEnv: env, timeout: 10000 });
    if (rm.status !== 0) throw new Error(`source compensation failed: gbrain sources remove exited ${rm.status}`);
    const rolled = transitionSetupState(ctx.paths.setupPath, op, "rolled_back");
    return rolled;
  } finally {
    release();
  }
}

export async function resumeEnrollment(root: string, gstackHome: string, env: NodeJS.ProcessEnv = process.env): Promise<SetupOperation> {
  const ctx = enrollmentContext(root, gstackHome, env);
  const release = acquireEnrollmentLock(ctx.paths.lockPath);
  try {
    const op = readSetupState(ctx.paths.setupPath);
    if (!op) throw new Error("no interrupted setup operation to resume");
    if (!ACTIVE_SETUP_STATES.has(op.state)) return op;
    const row = fetchSourceRow(op.source_id, env);
    if (!row) throw new Error("cannot resume enrollment because source is not registered");
    const existing = readEnrollment(ctx.paths.enrollmentPath) || undefined;
    const record = buildEnrollmentRecord(ctx.repo, ctx.brain, { source_id: op.source_id, source_generation: sourceGeneration(row) }, existing, ctx.paths.enrollmentPath);
    validateEnrollment(record, ctx.repo, ctx.brain, row);
    writeEnrollment(ctx.paths.enrollmentPath, record);
    return transitionSetupState(ctx.paths.setupPath, op, "complete", { source_generation_after: sourceGeneration(row) });
  } finally {
    release();
  }
}
