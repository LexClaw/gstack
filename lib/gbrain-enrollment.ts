import { createHash } from "crypto";
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, realpathSync, renameSync, statSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { homedir, hostname } from "os";
import { canonicalizeRemote } from "./gstack-memory-helpers";
import { buildGbrainEnv, execGbrainJson, spawnGbrain } from "./gbrain-exec";
import { parseSourcesList, type GbrainSourceRow } from "./gbrain-sources";

const ENROLLMENT_SCHEMA = 2;
const SETUP_SCHEMA = 1;
const MIN_GBRAIN_VERSION = "0.42.0";

export interface RepoIdentity {
  canonical_root: string;
  git_common_dir: string;
  remote: string | null;
  head_commit: string;
  host: string;
  repo_key: string;
  repo_hash: string;
}

export interface BrainIdentity {
  gbrain_home: string;
  database_hash: string;
  database_kind: "configured" | "missing";
}

export interface SourceBinding {
  source_id: string;
  source_generation: string;
}

export interface EnrollmentRecord {
  schema_version: 2;
  enrollment_id: string;
  source: SourceBinding;
  brain: BrainIdentity;
  repo: RepoIdentity;
  filesystem: {
    root_dev: number | null;
    root_ino: number | null;
  };
  created_at: string;
  updated_at: string;
  tamper_hash: string;
}

export interface SetupOperation {
  schema_version: 1;
  operation_id: string;
  enrollment_id: string;
  source_id: string;
  canonical_root: string;
  state:
    | "started"
    | "source_registering"
    | "source_registered"
    | "syncing"
    | "synced"
    | "failed"
    | "complete";
  updated_at: string;
  error?: string;
}

export interface CapabilityGateResult {
  ok: boolean;
  reason: string;
  version?: string;
  capabilities?: string[];
}

export interface CollisionDisposition {
  ok: boolean;
  reason: string;
  legacy_id?: string;
  legacy_path?: string;
}

export interface EnrollmentPaths {
  enrollmentPath: string;
  setupPath: string;
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
  const host = env.GSTACK_HOSTNAME || hostname();
  const repoKey = [host, remote || "local", gitCommonDir, canonicalRoot].join("|");
  return {
    canonical_root: canonicalRoot,
    git_common_dir: gitCommonDir,
    remote,
    head_commit: headCommit,
    host,
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
  const homeBase = env.HOME || homedir();
  const rawHome = env.GBRAIN_HOME || join(homeBase, ".gbrain");
  const gbrainHome = existsSync(rawHome) ? realpathSync(rawHome) : resolve(rawHome);
  const configPath = join(gbrainHome, "config.json");
  if (!existsSync(configPath)) {
    return { gbrain_home: gbrainHome, database_hash: sha256("missing"), database_kind: "missing" };
  }
  try {
    const cfg = JSON.parse(readFileSync(configPath, "utf-8")) as { database_url?: string };
    if (!cfg.database_url) return { gbrain_home: gbrainHome, database_hash: sha256("missing"), database_kind: "missing" };
    return { gbrain_home: gbrainHome, database_hash: sha256(cfg.database_url), database_kind: "configured" };
  } catch {
    return { gbrain_home: gbrainHome, database_hash: sha256("invalid"), database_kind: "missing" };
  }
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

function enrollmentDigest(record: Omit<EnrollmentRecord, "tamper_hash">): string {
  return sha256(stableJson(record));
}

export function enrollmentPaths(enrollmentId: string, gstackHome: string): EnrollmentPaths {
  return {
    enrollmentPath: join(gstackHome, "gbrain-enrollments", `${enrollmentId}.json`),
    setupPath: join(gstackHome, "gbrain-setup-ops", `${enrollmentId}.json`),
  };
}

export function expectedEnrollmentId(repo: RepoIdentity, brain: BrainIdentity): string {
  return sha256(stableJson({ repo_hash: repo.repo_hash, brain })).slice(0, 24);
}

export function buildEnrollmentRecord(
  repo: RepoIdentity,
  brain: BrainIdentity,
  source: SourceBinding,
  existing?: EnrollmentRecord,
): EnrollmentRecord {
  const now = new Date().toISOString();
  let rootDev: number | null = null;
  let rootIno: number | null = null;
  try {
    const st = realpathSync(repo.canonical_root);
    const stat = statSync(st);
    rootDev = Number(stat.dev);
    rootIno = Number(stat.ino);
  } catch {
    rootDev = null;
    rootIno = null;
  }
  const withoutHash = {
    schema_version: ENROLLMENT_SCHEMA,
    enrollment_id: expectedEnrollmentId(repo, brain),
    source,
    brain,
    repo,
    filesystem: { root_dev: rootDev, root_ino: rootIno },
    created_at: existing?.created_at || now,
    updated_at: now,
  } satisfies Omit<EnrollmentRecord, "tamper_hash">;
  return { ...withoutHash, tamper_hash: enrollmentDigest(withoutHash) };
}

export function readEnrollment(path: string): EnrollmentRecord | null {
  if (!existsSync(path)) return null;
  const record = JSON.parse(readFileSync(path, "utf-8")) as EnrollmentRecord;
  const { tamper_hash, ...withoutHash } = record;
  if (tamper_hash !== enrollmentDigest(withoutHash)) {
    throw new Error("enrollment tamper hash mismatch");
  }
  return record;
}

export function writeEnrollment(path: string, record: EnrollmentRecord): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp.${process.pid}`;
  writeFileSync(tmp, JSON.stringify(record, null, 2), { encoding: "utf-8", flag: "wx" });
  renameSync(tmp, path);
}

export function validateEnrollment(record: EnrollmentRecord, repo: RepoIdentity, brain: BrainIdentity, row: GbrainSourceRow | undefined): void {
  if (record.schema_version !== ENROLLMENT_SCHEMA) throw new Error("unsupported enrollment schema");
  if (record.enrollment_id !== expectedEnrollmentId(repo, brain)) throw new Error("enrollment is bound to a different repo or brain identity");
  if (record.repo.repo_hash !== repo.repo_hash) throw new Error("repository identity mismatch");
  if (record.repo.canonical_root !== repo.canonical_root) throw new Error("canonical root identity mismatch");
  if (record.brain.database_hash !== brain.database_hash || record.brain.gbrain_home !== brain.gbrain_home) throw new Error("brain/database identity mismatch");
  if (!row) throw new Error("enrolled source is missing from gbrain");
  if (row.local_path !== repo.canonical_root) throw new Error("registered source root drift");
  if (sourceGeneration(row) !== record.source.source_generation) throw new Error("source registration generation changed");
}

export function legacySourceId(repo: RepoIdentity): string {
  const remoteParts = repo.remote?.split("/").filter(Boolean) || [];
  const raw = remoteParts.length >= 2
    ? remoteParts.slice(-2).join("-")
    : repo.canonical_root.split(/[\\/]/).pop() || "repo";
  const clean = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "repo";
  return `gstack-code-${clean}`.slice(0, 32).replace(/-+$/g, "");
}

export function sourceCollisionDisposition(
  sourceId: string,
  repo: RepoIdentity,
  env: NodeJS.ProcessEnv = process.env,
): CollisionDisposition {
  const raw = execGbrainJson<unknown>(["sources", "list", "--json"], { baseEnv: env });
  if (raw === null) {
    return { ok: false, reason: "cannot read gbrain sources list for source-collision disposition" };
  }
  const oldId = legacySourceId(repo);
  if (oldId === sourceId) return { ok: true, reason: "ok" };
  const row = parseSourcesList(raw).find((s) => s.id === oldId);
  if (!row) return { ok: true, reason: "ok" };
  return {
    ok: false,
    legacy_id: oldId,
    legacy_path: row.local_path,
    reason: `legacy source ${oldId} requires explicit collision migration/disposition before syncing`,
  };
}

export function capabilityGate(env: NodeJS.ProcessEnv = process.env): CapabilityGateResult {
  const versionResult = spawnGbrain(["--version"], { baseEnv: env, timeout: 5000 });
  const versionText = `${versionResult.stdout || ""}${versionResult.stderr || ""}`.trim();
  const version = versionText.match(/(\d+\.\d+\.\d+(?:\.\d+)?)/)?.[1] || "0.0.0";
  if (versionResult.status !== 0 || !versionAtLeast(version, MIN_GBRAIN_VERSION)) {
    return { ok: false, reason: `gbrain ${version || "unknown"} lacks required sync-safety version ${MIN_GBRAIN_VERSION}`, version };
  }

  const capsRaw = execGbrainJson<unknown>(["capabilities", "--json"], { baseEnv: env, timeout: 5000 });
  const caps = Array.isArray((capsRaw as { capabilities?: unknown[] } | null)?.capabilities)
    ? ((capsRaw as { capabilities: unknown[] }).capabilities.filter((c): c is string => typeof c === "string"))
    : [];
  const required = ["explicit-source", "root-identity", "reconciliation-manifest", "db-roles", "schema-v2"];
  const missing = required.filter((c) => !caps.includes(c));
  if (missing.length > 0) {
    return { ok: false, reason: `gbrain capability gate failed: missing ${missing.join(",")}`, version, capabilities: caps };
  }
  return { ok: true, reason: "ok", version, capabilities: caps };
}

export function writeSetupState(path: string, op: SetupOperation): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp.${process.pid}`;
  writeFileSync(tmp, JSON.stringify({ ...op, updated_at: new Date().toISOString() }, null, 2), { encoding: "utf-8" });
  renameSync(tmp, path);
}

export function readSetupState(path: string): SetupOperation | null {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf-8")) as SetupOperation;
}

export function ensureNoInterruptedSetup(path: string): void {
  const op = readSetupState(path);
  if (!op) return;
  if (!["complete", "failed"].includes(op.state)) {
    throw new Error(`interrupted setup operation ${op.operation_id} is ${op.state}; run explicit enrollment recovery before syncing`);
  }
}

export function newSetupOperation(enrollmentId: string, sourceId: string, canonicalRoot: string): SetupOperation {
  return {
    schema_version: SETUP_SCHEMA,
    operation_id: sha256(`${enrollmentId}:${Date.now()}:${process.pid}`).slice(0, 24),
    enrollment_id: enrollmentId,
    source_id: sourceId,
    canonical_root: canonicalRoot,
    state: "started",
    updated_at: new Date().toISOString(),
  };
}

export function enrollmentContext(root: string, gstackHome: string, env: NodeJS.ProcessEnv = process.env) {
  const repo = realRepoIdentity(root, env);
  const brain = brainIdentity(env);
  const enrollmentId = expectedEnrollmentId(repo, brain);
  const paths = enrollmentPaths(enrollmentId, gstackHome);
  return { repo, brain, enrollmentId, paths };
}

export function enrollmentStatus(root: string, gstackHome: string, env: NodeJS.ProcessEnv = process.env): string {
  const { repo, brain, paths } = enrollmentContext(root, gstackHome, env);
  const record = readEnrollment(paths.enrollmentPath);
  if (!record) return "missing";
  const row = fetchSourceRow(record.source.source_id, buildGbrainEnv({ baseEnv: env }));
  validateEnrollment(record, repo, brain, row);
  return "valid";
}
