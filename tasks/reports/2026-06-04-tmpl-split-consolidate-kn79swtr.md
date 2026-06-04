# gstack .tmpl split-mirror consolidation, card kn79swtr

## Final outcome (one line)

The 6 gstack skills split by card kn75753n have their split mirrored into the durable LexClaw/gstack `.tmpl` templates plus restored `references/validation-log.md` files, so `bun run gen:skill-docs` is reproducible and no regen re-freezes any of the 6 over the 100k Hermes `skill_manage` gate.

## Why this card existed

Card kn75753n split 6 oversized gstack SKILL.md files directly in the DEPLOYED copies (`~/.hermes/skills/gstack-*`). But gstack SKILL.md files are GENERATED from `.tmpl` templates in the source repo. Without mirroring the split into the `.tmpl` files, the next `bun run gen:skill-docs` would clobber the split and re-freeze the 6 skills back over 100k, silently undoing the unfreeze and breaking HR-1's patch loop on the highest-traffic gstack skills.

## Routing

Per `fork-branch-policy`, gstack edits route through the durable LexClaw/gstack fork, NOT read-only upstream `garrytan/gstack`. This branch consolidates the three previously-stranded card-related commits on `lexclaw/main` into ONE coherent deliverable:

- `789d4caa` (PR #1, card kn7c4vnb): the .tmpl split-mirror + trimmed canonical SKILL.md + gstack-upgrade fork-source patch.
- `80d14cb2` (card kn79swtr): restore the 6 `references/validation-log.md` files dropped by PR #1 (orphan pointers were pointing at missing files).
- The `4296bd56` hostall-regen branch contained only a report (regen is a no-op on tracked files); its finding is folded into this report.

Consolidated branch: `reid/consolidate-tmpl-split-kn79swtr` off `lexclaw/main`, built in an isolated worktree (`/tmp/gstack-consolidate-kn79swtr`) so the dirty primary checkout was never touched.

## Acceptance criteria results

### AC1: each .tmpl reflects the split (validation log in references/, body has pointer) — PASS
All 6 `.tmpl` files carry the split: a `## Validation log archive` pointer block plus inline `Detailed ... was archived to references/validation-log.md` pointers. Diff touches all 6 `.tmpl` + 6 `references/validation-log.md`.

### AC2: gen produces SKILL.md bodies <95k for the 6 — 5/6 PASS, office-hours flagged
Post-regen canonical SKILL.md sizes:

| skill | bytes | vs 95k soft | vs 100k freeze wall |
|-------|-------|-------------|---------------------|
| ship | 91966 | OK | OK |
| plan-ceo-review | 92178 | OK | OK |
| office-hours | 96444 | OVER by 1444 | OK (3556 under) |
| plan-design-review | 91412 | OK | OK |
| plan-devex-review | 90598 | OK | OK |
| design-review | 94330 | OK | OK |

office-hours is the one skill over the 95k SOFT target. It is under the 100k HARD freeze wall (the gate that actually protects HR-1's patch loop; `split-oversized-skill.py` line 296 uses `>= 100_000` as the block threshold; line 359 uses `< 95_000` only as the post-split "ok" cosmetic check). office-hours already had its 3 archival-eligible sections moved (Prior Learnings, Spec Review Loop, Capture Learnings); its remaining body is irreducible core operational workflow (Phase 2A YC Product Diagnostic, Phases 2B-6, AskUserQuestion format). Forcing it under 95k requires extracting a functional phase the agent needs at invocation time, trading a real runtime regression for a cosmetic threshold. Judgment call: keep office-hours at 96444. The card's load-bearing requirement (AC3) is fully met.

### AC3: full regen does NOT re-freeze any skill (find skills >=100k returns 0) — PASS
After `bun run gen:skill-docs`, zero of the 6 target skills are >=100k. Repo-wide, the only tracked SKILL.md >=100k are UNRELATED skills outside this card's scope (`plan-eng-review`, `spec`) and intentionally-large test golden fixtures (`test/fixtures/golden/*`). None of the 6 targets appear.

### AC4: no content lost, validation logs readable via references/ — PASS
All 6 `references/validation-log.md` present and non-empty: ship 7521, plan-ceo-review 8156, office-hours 2709, plan-design-review 17158, plan-devex-review 16178, design-review 1588 bytes. SKILL.md bodies carry working pointers to them.

## Reproducibility proof

`bun run gen:skill-docs` run in the consolidated worktree produced a CLEAN no-op on all tracked SKILL.md (`git status --short` empty after regen). This proves the `.tmpl` templates ARE the source of the under-100k canonical output, so a routine regen cannot re-freeze the 6. The reference files are not gen inputs, so regen leaves them intact.

## Commands run

- `git worktree add -b reid/consolidate-tmpl-split-kn79swtr /tmp/gstack-consolidate-kn79swtr lexclaw/main`
- `git cherry-pick 789d4caa 80d14cb2`
- `bun run gen:skill-docs` (canonical; clean no-op confirmed)
- per-skill `wc -c` on SKILL.md + references/validation-log.md
- `git ls-files '*SKILL.md'` + size check for the repo-wide >=100k sweep

## Files modified

20 files: 6 `SKILL.md` + 6 `SKILL.md.tmpl` + 6 `references/validation-log.md` + `gstack-upgrade/SKILL.md(.tmpl)` (fork-source patch) + this report.

## Learnings

- gstack has TWO surfaces: source repo `/Users/TJ/gstack` (`.tmpl` + canonical generated `SKILL.md`) and deployed `~/.hermes/skills/gstack-*`. The `split-oversized-skill.py` sweep edits the DEPLOYED copy; the durable fix must mirror into the source `.tmpl` or the next `gen:skill-docs` clobbers it.
- The split has two distinct gates: 100k HARD (`skill_manage` block) and 95k SOFT (post-split "ok" check). When core content makes 95k unreachable without a runtime regression, meeting the 100k wall is the correct stopping point — flag the soft-target miss with reasoning instead of degrading the skill.
- gstack edits route through `lexclaw` remote, never `origin` (garrytan upstream, read-only to us). LexClaw is a GitHub USER account, not an org.
- This card's real work already existed across three stranded branches on lexclaw/main; the deliverable was consolidation + verification, not net-new authoring. Always fetch the fork and check for existing card-named branches before re-doing work.
