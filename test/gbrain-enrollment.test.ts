import { describe, it, expect } from "bun:test";
import { chmodSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { spawnSync } from "child_process";

import {
  buildEnrollmentRecord,
  brainIdentity,
  capabilityGate,
  enrollmentPaths,
  ensureNoInterruptedSetup,
  legacySourceId,
  readEnrollment,
  realRepoIdentity,
  sourceCollisionDisposition,
  sourceGeneration,
  validateEnrollment,
  writeEnrollment,
  writeSetupState,
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

function makeHome(databaseUrl = "postgres://user:pass@localhost:5432/db"): string {
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

describe("gbrain enrollment authority", () => {
  it("detects missing and tampered external enrollment records", () => {
    const home = makeHome();
    const repo = makeRepo();
    const gstackHome = join(home, ".gstack");
    const env = { ...process.env, HOME: home };
    const repoId = realRepoIdentity(repo, env);
    const brain = brainIdentity(env);
    const paths = enrollmentPaths("enroll-test", gstackHome);

    expect(readEnrollment(paths.enrollmentPath)).toBeNull();

    const row = { id: "gstack-code-test", local_path: repoId.canonical_root, config: null };
    const record = buildEnrollmentRecord(repoId, brain, { source_id: row.id, source_generation: sourceGeneration(row) });
    writeEnrollment(paths.enrollmentPath, record);
    const raw = JSON.parse(readFileSync(paths.enrollmentPath, "utf-8"));
    raw.repo.canonical_root = `${repoId.canonical_root}-evil`;
    writeFileSync(paths.enrollmentPath, JSON.stringify(raw, null, 2));

    expect(() => readEnrollment(paths.enrollmentPath)).toThrow(/tamper hash mismatch/);
    rmSync(home, { recursive: true, force: true });
    rmSync(repo, { recursive: true, force: true });
  });

  it("binds enrollment to brain, canonical root, repo identity, and source generation", () => {
    const home = makeHome("postgres://one");
    const repo = makeRepo();
    const env = { ...process.env, HOME: home };
    const repoId = realRepoIdentity(repo, env);
    const brain = brainIdentity(env);
    const row = { id: "gstack-code-test", local_path: repoId.canonical_root, config: null };
    const record = buildEnrollmentRecord(repoId, brain, { source_id: row.id, source_generation: sourceGeneration(row) });

    validateEnrollment(record, repoId, brain, row);
    expect(() => validateEnrollment(record, { ...repoId, canonical_root: `${repoId.canonical_root}-replaced` }, brain, row)).toThrow(/repo identity|canonical root/);
    expect(() => validateEnrollment(record, repoId, { ...brain, database_hash: "other-db" }, row)).toThrow(/brain identity|brain\/database identity mismatch/);
    expect(() => validateEnrollment(record, repoId, brain, { ...row, config: { remote_url: "https://example.com/other.git" } })).toThrow(/source registration generation changed/);
    rmSync(home, { recursive: true, force: true });
    rmSync(repo, { recursive: true, force: true });
  });

  it("fails closed on old or capability-missing callees", () => {
    const old = makeShim({ "--version": { stdout: "gbrain 0.41.9" } });
    expect(capabilityGate(old.env).ok).toBe(false);
    expect(capabilityGate(old.env).reason).toMatch(/lacks required sync-safety/);
    rmSync(old.bin, { recursive: true, force: true });

    const missingCaps = makeShim({
      "--version": { stdout: "gbrain 0.42.0" },
      "capabilities --json": { stdout: JSON.stringify({ capabilities: ["explicit-source", "root-identity"] }) },
    });
    expect(capabilityGate(missingCaps.env).ok).toBe(false);
    expect(capabilityGate(missingCaps.env).reason).toMatch(/capability gate failed/);
    rmSync(missingCaps.bin, { recursive: true, force: true });
  });

  it("requires explicit collision disposition for legacy source ids and fails closed when source inventory is unreadable", () => {
    const repo = makeRepo();
    const repoId = realRepoIdentity(repo);
    const oldId = legacySourceId(repoId);
    const ok = makeShim({ "sources list --json": { stdout: JSON.stringify({ sources: [] }) } });
    expect(sourceCollisionDisposition("gstack-code-new", repoId, ok.env).ok).toBe(true);
    rmSync(ok.bin, { recursive: true, force: true });

    const collision = makeShim({
      "sources list --json": { stdout: JSON.stringify({ sources: [{ id: oldId, local_path: repoId.canonical_root }] }) },
    });
    const disposition = sourceCollisionDisposition("gstack-code-new", repoId, collision.env);
    expect(disposition.ok).toBe(false);
    expect(disposition.reason).toMatch(/explicit collision migration\/disposition/);
    rmSync(collision.bin, { recursive: true, force: true });

    const unreadable = makeShim({ "sources list --json": { exit: 2, stderr: "db mismatch" } });
    expect(sourceCollisionDisposition("gstack-code-new", repoId, unreadable.env).ok).toBe(false);
    rmSync(unreadable.bin, { recursive: true, force: true });
    rmSync(repo, { recursive: true, force: true });
  });

  it("blocks sync resume after interrupted setup state", () => {
    const dir = tempDir("gstack-setup-state-");
    const path = join(dir, "op.json");
    const op = {
      schema_version: 1 as const,
      operation_id: "op1",
      enrollment_id: "enroll1",
      source_id: "source1",
      canonical_root: "/repo",
      state: "source_registered" as const,
      updated_at: new Date().toISOString(),
    };
    writeSetupState(path, op);
    expect(() => ensureNoInterruptedSetup(path)).toThrow(/interrupted setup operation/);
    writeSetupState(path, { ...op, state: "failed" });
    expect(() => ensureNoInterruptedSetup(path)).not.toThrow();
    rmSync(dir, { recursive: true, force: true });
  });
});
