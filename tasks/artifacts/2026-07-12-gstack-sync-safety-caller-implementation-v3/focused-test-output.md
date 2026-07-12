# Focused caller test output

Command: bun test test/gstack-gbrain-source-wireup.test.ts test/gbrain-sync-source-guard.test.ts

bun test v1.3.12 (700fc117)

test/gbrain-sync-source-guard.test.ts:
(pass) gbrain sync source guard > no executable surface calls sync with repo but without source [110.83ms]

test/gstack-gbrain-source-wireup.test.ts:
(pass) gstack-gbrain-source-wireup — wireup mode > fresh state: registers source + creates worktree + writes pin + syncs with source [480.68ms]
(pass) gstack-gbrain-source-wireup — wireup mode > idempotent re-run after success: no new sources add call [580.83ms]
(pass) gstack-gbrain-source-wireup — wireup mode > drift guard: existing source with different path fails closed before sync [448.91ms]
(pass) gstack-gbrain-source-wireup — wireup mode > same-basename different root is unsafe and fails closed [497.14ms]
(pass) gstack-gbrain-source-wireup — wireup mode > source pin mismatch fails closed before sync [609.10ms]
(pass) gstack-gbrain-source-wireup — wireup mode > default source id is refused before registration or sync [144.68ms]
(pass) gstack-gbrain-source-wireup — wireup mode > --strict + gbrain too old: exits 2 [422.41ms]
(pass) gstack-gbrain-source-wireup — wireup mode > non-strict + gbrain too old: warn + exit 0 [419.59ms]
(pass) gstack-gbrain-source-wireup — wireup mode > --strict + gbrain missing on PATH: exits 2 [232.35ms]
(pass) gstack-gbrain-source-wireup — wireup mode > source-id derived from origin URL [544.57ms]
(pass) gstack-gbrain-source-wireup — wireup mode > source-id fallback to ~/.gstack-brain-remote.txt when .git is gone [275.08ms]
(pass) gstack-gbrain-source-wireup — wireup mode > source-id from --source-id flag overrides everything [445.03ms]
(pass) gstack-gbrain-source-wireup — wireup mode > --probe: read-only, prints state without mutating [438.23ms]
(pass) gstack-gbrain-source-wireup — wireup mode > gbrain sync failure: exits 1 with stderr [527.23ms]
(pass) gstack-gbrain-source-wireup — --database-url lock (defends against external config rewrites) > --database-url flag is exported as GBRAIN_DATABASE_URL to child gbrain calls [467.14ms]
(pass) gstack-gbrain-source-wireup — --database-url lock (defends against external config rewrites) > falls back to ~/.gbrain/config.json database_url when no flag and no env [625.13ms]
(pass) gstack-gbrain-source-wireup — --database-url lock (defends against external config rewrites) > --database-url overrides env GBRAIN_DATABASE_URL and config.json [533.23ms]
(pass) gstack-gbrain-source-wireup — uninstall mode > after wireup: removes source + worktree [614.85ms]
(pass) gstack-gbrain-source-wireup — uninstall mode > with no prior state: exits 3 (cannot derive id) [109.49ms]
(pass) gstack-gbrain-source-wireup — uninstall mode > --uninstall when gbrain is missing: exits 0 (best-effort), still removes worktree [589.41ms]
(pass) gstack-gbrain-source-wireup — defensive paths > --no-pull skips HEAD advance on existing worktree [717.18ms]
(pass) gstack-gbrain-source-wireup — defensive paths > stray non-git directory at worktree path is cleaned up + worktree created [489.28ms]

 23 pass
 0 fail
 76 expect() calls
Ran 23 tests across 2 files. [10.34s]

Command: bun test test/gstack-gbrain-sync.test.ts test/skill-e2e-memory-pipeline.test.ts

bun test v1.3.12 (700fc117)

test/skill-e2e-memory-pipeline.test.ts:
(pass) V1 memory ingest pipeline E2E > --probe finds all 9 fixture files across all source types [531.33ms]
(pass) V1 memory ingest pipeline E2E > --incremental writes a state file with schema_version: 1 + last_writer [555.80ms]
(pass) V1 memory ingest pipeline E2E > --incremental is idempotent — re-run reports 0 changes [525.54ms]
(pass) V1 memory ingest pipeline E2E > --probe shows new vs unchanged distinction after first --incremental [512.73ms]
(pass) V1 /gbrain-sync orchestrator E2E > --dry-run with all stages enabled previews 3 stages [521.83ms]
(pass) V1 /gbrain-sync orchestrator E2E > --no-code --no-brain-sync --incremental runs only memory ingest, writes sync state [420.60ms]
(pass) V1 retrieval surface — real V1 manifest dispatch > loads office-hours/SKILL.md manifest and dispatches 4 queries [382.23ms]
(pass) V1 retrieval surface — real V1 manifest dispatch > renders datamark envelope around every loaded section (Section 1D + D12) [376.98ms]
(pass) V1 retrieval surface — real V1 manifest dispatch > Layer 1 fallback when no skill specified — default 3-section manifest [1064.54ms]
(pass) V1 retrieval surface — real V1 manifest dispatch > plan-ceo-review/SKILL.md manifest also dispatches correctly (regression for V1 manifest authoring) [350.65ms]

test/gstack-gbrain-sync.test.ts:
(pass) gstack-gbrain-sync CLI > --help exits 0 with usage text [22.93ms]
(pass) gstack-gbrain-sync CLI > rejects unknown flag [22.90ms]
(pass) gstack-gbrain-sync CLI > uses the shared local gbrain status classifier instead of shelling through command -v [0.14ms]
(pass) gstack-gbrain-sync CLI > --dry-run with --code-only reports the code import preview only [122.05ms]
(pass) gstack-gbrain-sync CLI > --dry-run with all stages shows previews for all three [466.47ms]
(pass) gstack-gbrain-sync CLI > --no-code skips the code import stage [366.66ms]
(pass) gstack-gbrain-sync CLI > dry-run derives a stable source id from the canonical git remote [130.04ms]
(pass) gstack-gbrain-sync CLI > derived source ids are gbrain-valid (≤32 chars, alnum + interior hyphens, no dots) for any remote [631.53ms]
(pass) gstack-gbrain-sync CLI > derives a gbrain-valid source id when the cwd repo has NO origin remote [143.83ms]
(pass) gstack-gbrain-sync CLI > derives a gbrain-valid source id when the basename sanitizes to empty [145.45ms]
(pass) gstack-gbrain-sync CLI > derives distinct source ids for the same absolute path on different hosts [293.43ms]
(pass) gstack-gbrain-sync CLI > dry-run does NOT acquire the lock file (lock is for write paths only) [491.67ms]
(pass) gstack-gbrain-sync CLI > a stale lock file (older than 5 min) is taken over, not blocking [24.77ms]
(pass) gstack-gbrain-sync CLI > a fresh lock file (less than 5 min old) blocks a second invocation with exit 2 [24.11ms]
(pass) gstack-gbrain-sync CLI > writes a state file with schema_version: 1 after a non-dry run [24.34ms]
(pass) gstack-gbrain-sync CLI > does NOT write state file on --dry-run [499.28ms]
(pass) gstack-gbrain-sync CLI > records stage results in state file [24.40ms]
(pass) gstack-gbrain-sync CLI > brain-sync stage resolves the sibling binary, not a HOME-rooted path [49.11ms]
(pass) gstack-gbrain-sync CLI > worktree-aware source ID: two worktrees of the same repo get DIFFERENT ids [283.80ms]
(pass) gstack-gbrain-sync CLI > worktree-aware source ID: same path produces the same id across runs (deterministic) [223.42ms]
(pass) gstack-gbrain-sync CLI > dry-run preview includes legacy-source removal + attach (post-codex-review hardening) [165.90ms]
(pass) gstack-gbrain-sync CLI > dry-run preview includes the `sources attach` step (kubectl-style CWD pin) [160.57ms]
(pass) derivePathOnlyHashLegacyId > returns the pre-#1468 form (path-only sha1, no hostname) [73.58ms]
(pass) derivePathOnlyHashLegacyId > produces a different id than the new hostname-folded form [168.54ms]
(pass) planHostnameFoldMigration > returns ids-match when legacy == new (degenerate case) [0.18ms]
(pass) planHostnameFoldMigration > returns no-legacy-source when sources list does not include the legacy id [138.21ms]
(pass) planHostnameFoldMigration > returns skipped-path-drift when old source local_path differs from current repo root [110.30ms]
(pass) planHostnameFoldMigration > returns renamed when rename is supported and exits 0 [126.49ms]
(pass) planHostnameFoldMigration > returns pending-cleanup when rename is unsupported (current gbrain 0.35.0.0) [129.01ms]
(pass) planHostnameFoldMigration > returns pending-cleanup when rename is supported but the rename call itself fails [125.21ms]
(pass) constrainSourceId truncation (hyphen-boundary cut) > never produces mid-word truncation artifacts like `kill` (from `skill`) [140.86ms]
(pass) constrainSourceId truncation (hyphen-boundary cut) > produces a period-free source id for HTTPS remotes ending in .git (#1357) [147.26ms]
(pass) sourceLocalPath > returns local_path when the source exists [129.47ms]
(pass) sourceLocalPath > returns null when the source is missing [113.85ms]
(pass) sourceLocalPath > returns null when gbrain exits non-zero or returns malformed JSON [126.36ms]
(pass) sourceLocalPath > handles {sources: [...]} wrapped shape (gbrain v0.20+) [117.42ms]
(pass) sourceLocalPath > returns null when the source is missing in the wrapped shape [114.33ms]

 47 pass
 0 fail
 174 expect() calls
Ran 47 tests across 2 files. [11.35s]
