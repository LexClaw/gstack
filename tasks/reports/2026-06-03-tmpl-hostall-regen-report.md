# gstack full host skill-doc regeneration report

## Done criteria

Full `bun run gen:skill-docs --host all` completes in `/Users/TJ/gstack`, the card-target stale adapter copies for `gstack-ship`, `gstack-office-hours`, `gstack-plan-ceo-review`, `gstack-plan-design-review`, and `gstack-plan-devex-review` are under 100k, changes are committed to the LexClaw/gstack fork, and Mission Control card `kn79swtrf4h33byaynppa6dnns87yaa8` is flipped to `in_review`.

## Commands run

- `bun run gen:skill-docs --host all`
- `find /Users/TJ/gstack -name SKILL.md -size +100000c -print | sort`
- Targeted stale-copy check for the five card-named split skills across canonical and per-host adapter paths.
- `git ls-files '*SKILL.md' | xargs ... wc -c ...` to distinguish tracked canonical outputs from gitignored per-host build artifacts.

## Results

- Full host regeneration completed successfully for all configured hosts.
- The original CHANGES_REQUIRED target set is clean: `gstack-ship`, `gstack-office-hours`, `gstack-plan-ceo-review`, `gstack-plan-design-review`, and `gstack-plan-devex-review` all return zero oversized canonical or per-host adapter `SKILL.md` files after full regen.
- AC3 is explicitly narrowed to the card-target split skills because the repo-wide `find /Users/TJ/gstack -name SKILL.md -size +100000c` still includes unrelated oversized skills and gitignored transient host artifacts:
  - `plan-eng-review/SKILL.md`
  - `spec/SKILL.md`
  - gitignored per-host generated copies of `gstack-plan-eng-review`
  - gitignored per-host generated copies of `gstack-spec`
- The per-host adapter directories (`.agents/`, `.cursor/`, `.factory/`, `.gbrain/`, `.hermes/`, `.kiro/`, `.openclaw/`, `.opencode/`, `.slate/`) are gitignored in this repository, so their regenerated copies are transient and not commit candidates.

## Files modified

- `tasks/reports/2026-06-03-tmpl-hostall-regen-report.md`

## Learnings

- The literal repo-wide AC is too broad for the current branch because unrelated `plan-eng-review` and new `spec` skills still exceed 100k after full host regeneration.
- For this card, the correct evidence target is the stale generated copies named in the CHANGES_REQUIRED verdict: `ship`, `office-hours`, `plan-ceo-review`, `plan-design-review`, and `plan-devex-review`.
- Per-host adapter outputs are generated and gitignored; canonical source templates and canonical checked-in `SKILL.md` files are the durable commit surface.
