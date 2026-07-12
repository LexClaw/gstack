import { describe, it, expect } from "bun:test";
import { chmodSync, lstatSync, mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { spawnSync } from "child_process";

import {
  acquireEnrollmentLock,
  buildEnrollmentRecord,
  brainIdentity,
  capabilityGate,
  enrollmentPaths,
  ensureNoInterruptedSetup,
  inspectEnrollment,
  legacySourceId,
  readEnrollment,
  realRepoIdentity,
  sourceCollisionDisposition,
  sourceGeneration,
  validateEnrollment,
  writeEnrollment,
  writeSetupState,
  type SetupOperation,
} from "../lib/gbrain-enrollment";

function tempDir(prefix: string): string {
  return mkdtempSync(join(tmpdir(), prefix));
}

function makeRepo(remote = "https://github.com/garrytan/gstack.git"): string {
  const repo = tempDir("gstack-enroll-repo-");
  spawnSync("git", ["init", "--quiet", "-b", "main"], { cwd: repo });
  spawnSync("git", ["remote", "add", "origin", remote], { cwd: repo });
  spawnSync("git", ["config", "user.email", "test@example.com"], { cwd: repo });
  spawnSync("git", ["config", "user.name", "Test User"], { cwd: repo });
  spawnSync("git", ["commit", "--allow-empty", "-m", "init", "--quiet"], { cwd: repo });
  return repo;
}

function makeHome(databaseUrl = "postgres://user:***@localhost:5432/db"): string {
  const home = tempDir("gstack-enroll-home-");
  const gbrain = join(home, ".gbrain");
  mkdirSync(gbrain, { recursive: true });
  writeFileSync(join(gbrain, "config.json"), JSON.stringify({ database_url: databaseUrl }));
  return home;
}

function makeShim(responses: Record<string, { stdout?: string; stderr?: string; exit?: number }>): { bin: string; env: NodeJS.ProcessEnv } {
  const bin = tempDir("gstack-enroll-bin-");
  const cases = Object.entries(responses).map(([key, r]) => {
    const stdout = (r.stdout || "").replace(/'/g, "'\\''");
    const stderr = (r.stderr || "").replace(/'/g, "'\\''");
    return `  "${key}") printf '%s' '${stdout}'; printf '%s' '${stderr}' >&2; exit ${r.exit ?? 0} ;;`;
  }).join("\n");
  const shim = join(bin, "gbrain");
  writeFileSync(shim, `#!/bin/sh\nARGS="$*"\ncase "$ARGS" in\n${cases}\n  *) echo "shim: no match for [$ARGS]" >&2; exit 1 ;;\nesac\n`);
  chmodSync(shim, 0o755);
  return { bin, env: { ...process.env, PATH: `${bin}:${process.env.PATH || ""}` } };
}

function capPayload(database_identity = "pg:test-db") {
  return JSON.stringify({
    capabilities: ["explicit-source", "root-identity", "reconciliation-manifest", "db-roles", "schema-v2"],
    database_identity,
  });
}

function makeCapShim(extra: Record<string, { stdout?: string; stderr?: string; exit?: number }> = {}): { bin: string; env: NodeJS.ProcessEnv } {
  return makeShim({
    "--version": { stdout: "gbrain 0.42.0" },
    "capabilities --json": { stdout: capPayload() },
    ...extra,
  });
}

function setupOp(state: SetupOperation["state"]): SetupOperation {
  return {
    schema_version: 2,
    operation_id: "op1",
    enrollment_id: "enroll1",
    source_id: "source1",
    canonical_root: "/repo",
    state,
    attempt: 1,
    lease_owner: "test",
    lease_until: new Date(Date.now() + 10000).toISOString(),
    updated_at: new Date().toISOString(),
  };
}

describe("gbrain enrollment authority", () => {
  it("detects missing and tampered signed external enrollment records", () => {
    const home = makeHome();
    const repo = makeRepo();
    const shim = makeCapShim();
    const gstackHome = join(home, ".gstack");
    const env = { ...shim.env, HOME: home };
    const repoId = realRepoIdentity(repo, env);
    const brain = brainIdentity(env);
    const paths = enrollmentPaths("enroll-test", gstackHome);

    expect(readEnrollment(paths.enrollmentPath)).toBeNull();

    const row = { id: "gstack-code-test", local_path: repoId.canonical_root, config: null };
    const record = buildEnrollmentRecord(repoId, brain, { source_id: row.id, source_generation: sourceGeneration(row) }, undefined, paths.enrollmentPath);
    writeEnrollment(paths.enrollmentPath, record);
    const raw = JSON.parse(readFileSync(paths.enrollmentPath, "utf-8"));
    raw.repo.canonical_root = `${repoId.canonical_root}-evil`;
    writeFileSync(paths.enrollmentPath, JSON.stringify(raw, null, 2));

    expect(() => readEnrollment(paths.enrollmentPath)).toThrow(/signature mismatch/);
    rmSync(home, { recursive: true, force: true });
    rmSync(repo, { recursive: true, force: true });
    rmSync(shim.bin, { recursive: true, force: true });
  });

  it("binds enrollment to capability-session brain identity, canonical root, repo identity, and generation", () => {
    const home = makeHome("postgres://one");
    const repo = makeRepo();
    const shim = makeCapShim();
    const env = { ...shim.env, HOME: home };
    const repoId = realRepoIdentity(repo, env);
    const brain = brainIdentity(env);
    const row = { id: "gstack-code-test", local_path: repoId.canonical_root, config: null };
    const record = buildEnrollmentRecord(repoId, brain, { source_id: row.id, source_generation: sourceGeneration(row) });

    validateEnrollment(record, repoId, brain, row);
    expect(() => validateEnrollment(record, { ...repoId, canonical_root: `${repoId.canonical_root}-replaced` }, brain, row)).toThrow(/repo identity|canonical root/);
    expect(() => validateEnrollment(record, repoId, { ...brain, database_identity: "pg:other", database_hash: "other-db" }, row)).toThrow(/brain identity|brain\/database identity mismatch/);
    expect(() => validateEnrollment(record, repoId, brain, { ...row, config: { remote_url: "https://example.com/other.git" } })).toThrow(/source registration generation changed/);
    rmSync(home, { recursive: true, force: true });
    rmSync(repo, { recursive: true, force: true });
    rmSync(shim.bin, { recursive: true, force: true });
  });

  it("fails closed on old, capability-missing, or DB-identity-missing callees", () => {
    const old = makeShim({ "--version": { stdout: "gbrain 0.41.9" } });
    expect(capabilityGate(old.env).ok).toBe(false);
    expect(capabilityGate(old.env).reason).toMatch(/lacks required sync-safety/);
    rmSync(old.bin, { recursive: true, force: true });

    const exactContract = makeShim({
      "--version": { stdout: "gbrain 0.42.0" },
      "capabilities --json": { stdout: JSON.stringify({
        capabilities: ["explicit-source", "root-identity", "reconciliation-manifest", "db-roles", "schema-v2"],
        database_identity: "pg:test-db",
        gbrain_sha: "4e58de8117c9addaa15667436daf6ad29535ddad",
        compatible_gstack_shas: ["59b818f21f2e363f4ec1e54d15ccd17bf9a26538"],
      }) },
    });
    expect(capabilityGate(exactContract.env).ok).toBe(true);
    rmSync(exactContract.bin, { recursive: true, force: true });

    const missingCaps = makeShim({
      "--version": { stdout: "gbrain 0.42.0" },
      "capabilities --json": { stdout: JSON.stringify({ capabilities: ["explicit-source", "root-identity"] }) },
    });
    expect(capabilityGate(missingCaps.env).ok).toBe(false);
    expect(capabilityGate(missingCaps.env).reason).toMatch(/capability gate failed/);
    rmSync(missingCaps.bin, { recursive: true, force: true });

    const missingDb = makeShim({
      "--version": { stdout: "gbrain 0.42.0" },
      "capabilities --json": { stdout: JSON.stringify({ capabilities: ["explicit-source", "root-identity", "reconciliation-manifest", "db-roles", "schema-v2"] }) },
    });
    expect(capabilityGate(missingDb.env).ok).toBe(false);
    expect(capabilityGate(missingDb.env).reason).toMatch(/connected-database-identity/);
    rmSync(missingDb.bin, { recursive: true, force: true });
  });

  it("removes GSTACK_HOSTNAME from trusted repo identity", () => {
    const repo = makeRepo();
    const a = realRepoIdentity(repo, { ...process.env, GSTACK_HOSTNAME: "machine-a" });
    const b = realRepoIdentity(repo, { ...process.env, GSTACK_HOSTNAME: "machine-b" });
    expect(a.repo_hash).toBe(b.repo_hash);
    expect(a.host_display).not.toBe(b.host_display);
    rmSync(repo, { recursive: true, force: true });
  });

  it("requires one pre-side-effect collision disposition inventory", () => {
    const repo = makeRepo();
    const repoId = realRepoIdentity(repo);
    const oldId = legacySourceId(repoId);
    const ok = makeShim({ "sources list --json": { stdout: JSON.stringify({ sources: [] }) } });
    expect(sourceCollisionDisposition("gstack-code-new", repoId, ok.env).ok).toBe(true);
    rmSync(ok.bin, { recursive: true, force: true });

    const collision = makeShim({
      "sources list --json": { stdout: JSON.stringify({ sources: [
        { id: oldId, local_path: repoId.canonical_root },
        { id: "archived", local_path: repoId.canonical_root, config: { status: "archived", aliases: ["gstack-code-new"] } },
      ] }) },
    });
    const disposition = sourceCollisionDisposition("gstack-code-new", repoId, collision.env);
    expect(disposition.ok).toBe(false);
    expect(disposition.reason).toMatch(/explicit disposition/);
    expect(disposition.collisions.map((c) => c.kind)).toContain("historical-id");
    expect(disposition.collisions.map((c) => c.kind)).toContain("alias");
    expect(disposition.collisions.map((c) => c.kind)).toContain("archived-row");
    rmSync(collision.bin, { recursive: true, force: true });

    const unreadable = makeShim({ "sources list --json": { exit: 2, stderr: "db mismatch" } });
    expect(sourceCollisionDisposition("gstack-code-new", repoId, unreadable.env).ok).toBe(false);
    rmSync(unreadable.bin, { recursive: true, force: true });
    rmSync(repo, { recursive: true, force: true });
  });

  it("blocks sync and enroll resume after interrupted setup state", () => {
    const dir = tempDir("gstack-setup-state-");
    const path = join(dir, "op.json");
    const op = setupOp("source_registered");
    writeSetupState(path, op);
    expect(() => ensureNoInterruptedSetup(path)).toThrow(/interrupted setup operation/);
    writeSetupState(path, { ...op, state: "failed" });
    expect(() => ensureNoInterruptedSetup(path)).not.toThrow();
    rmSync(dir, { recursive: true, force: true });
  });

  it("rejects symlinked state files and writes restrictive mode files", () => {
    const home = makeHome();
    const repo = makeRepo();
    const shim = makeCapShim({ "sources list --json": { stdout: JSON.stringify({ sources: [{ id: "gstack-code-test", local_path: repo }] }) } });
    const env = { ...shim.env, HOME: home };
    const repoId = realRepoIdentity(repo, env);
    const brain = brainIdentity(env);
    const gstackHome = join(home, ".gstack");
    const paths = enrollmentPaths("enroll-test", gstackHome);
    const row = { id: "gstack-code-test", local_path: repoId.canonical_root, config: null };
    const record = buildEnrollmentRecord(repoId, brain, { source_id: row.id, source_generation: sourceGeneration(row) }, undefined, paths.enrollmentPath);
    writeEnrollment(paths.enrollmentPath, record);
    expect((lstatSync(paths.enrollmentPath).mode & 0o777)).toBe(0o600);
    const symlinkPath = join(gstackHome, "gbrain-enrollments", "evil.json");
    symlinkSync(paths.enrollmentPath, symlinkPath);
    expect(() => readEnrollment(symlinkPath)).toThrow(/symlinked state path/);
    rmSync(home, { recursive: true, force: true });
    rmSync(repo, { recursive: true, force: true });
    rmSync(shim.bin, { recursive: true, force: true });
  });

  it("uses lock files to reject concurrent enrollment writers", () => {
    const dir = tempDir("gstack-enroll-lock-");
    const lock = join(dir, "op.lock");
    const release = acquireEnrollmentLock(lock);
    expect(() => acquireEnrollmentLock(lock)).toThrow();
    release();
    const releaseAgain = acquireEnrollmentLock(lock);
    releaseAgain();
    rmSync(dir, { recursive: true, force: true });
  });

  it("inspect reports valid refreshed enrollment state", () => {
    const home = makeHome();
    const repo = makeRepo();
    const gstackHome = join(home, ".gstack");
    const sourceId = "gstack-code-test";
    const shim = makeCapShim({ "sources list --json": { stdout: "" } });
    const env = { ...shim.env, HOME: home };
    const repoId = realRepoIdentity(repo, env);
    const row = { id: sourceId, local_path: repoId.canonical_root, config: null };
    const sourcesJson = JSON.stringify({ sources: [row] });
    rmSync(shim.bin, { recursive: true, force: true });
    const shim2 = makeCapShim({ "sources list --json": { stdout: sourcesJson } });
    const env2 = { ...shim2.env, HOME: home };
    const brain = brainIdentity(env2);
    const paths = enrollmentPaths(buildEnrollmentRecord(repoId, brain, { source_id: sourceId, source_generation: sourceGeneration(row) }).enrollment_id, gstackHome);
    const record = buildEnrollmentRecord(repoId, brain, { source_id: sourceId, source_generation: sourceGeneration(row) }, undefined, paths.enrollmentPath);
    writeEnrollment(paths.enrollmentPath, record);
    const status = inspectEnrollment(repo, gstackHome, env2);
    expect(status.valid).toBe(true);
    expect(status.reason).toBe("valid");
    rmSync(home, { recursive: true, force: true });
    rmSync(repo, { recursive: true, force: true });
    rmSync(shim2.bin, { recursive: true, force: true });
  });
});
