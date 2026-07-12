# Build output

Command: bun run build

$ bash scripts/build.sh
$ mkdir -p extension/lib && cp node_modules/xterm/lib/xterm.js extension/lib/xterm.js && cp node_modules/xterm/css/xterm.css extension/lib/xterm.css && cp node_modules/xterm-addon-fit/lib/xterm-addon-fit.js extension/lib/xterm-addon-fit.js
$ bun run scripts/gen-skill-docs.ts --host all
GENERATED: SKILL.md
GENERATED: pair-agent/SKILL.md
GENERATED: benchmark/SKILL.md
GENERATED: design-html/SKILL.md
GENERATED: plan-tune/SKILL.md
GENERATED: design-shotgun/SKILL.md
GENERATED: plan-design-review/SKILL.md
GENERATED: autoplan/SKILL.md
GENERATED: design-consultation/SKILL.md
GENERATED: learn/SKILL.md
GENERATED: freeze/SKILL.md
GENERATED: ios-qa/SKILL.md
GENERATED: careful/SKILL.md
GENERATED: cso/SKILL.md
GENERATED: canary/SKILL.md
GENERATED: open-gstack-browser/SKILL.md
GENERATED: investigate/SKILL.md
GENERATED: context-restore/SKILL.md
GENERATED: document-release/SKILL.md
GENERATED: health/SKILL.md
GENERATED: gstack-upgrade/SKILL.md
GENERATED: land-and-deploy/SKILL.md
GENERATED: codex/SKILL.md
GENERATED: spec/SKILL.md
GENERATED: qa/SKILL.md
GENERATED: scrape/SKILL.md
GENERATED: qa-only/SKILL.md
GENERATED: skillify/SKILL.md
GENERATED: sync-gbrain/SKILL.md
GENERATED: setup-browser-cookies/SKILL.md
GENERATED: ios-fix/SKILL.md
GENERATED: ios-clean/SKILL.md
GENERATED: setup-gbrain/SKILL.md
GENERATED: document-generate/SKILL.md
GENERATED: review/SKILL.md
GENERATED: plan-ceo-review/SKILL.md
GENERATED: office-hours/SKILL.md
GENERATED: landing-report/SKILL.md
GENERATED: retro/SKILL.md
GENERATED: ios-design-review/SKILL.md
GENERATED: devex-review/SKILL.md
GENERATED: benchmark-models/SKILL.md
GENERATED: plan-devex-review/SKILL.md
GENERATED: ios-sync/SKILL.md
GENERATED: browse/SKILL.md
GENERATED: design-review/SKILL.md
GENERATED: ship/SKILL.md
GENERATED: plan-eng-review/SKILL.md
GENERATED: guard/SKILL.md
GENERATED: make-pdf/SKILL.md
GENERATED: unfreeze/SKILL.md
GENERATED: context-save/SKILL.md
GENERATED: setup-deploy/SKILL.md
GENERATED: ship/sections/adversarial.md
GENERATED: ship/sections/changelog.md
GENERATED: ship/sections/greptile.md
GENERATED: ship/sections/plan-completion.md
GENERATED: ship/sections/pr-body.md
GENERATED: ship/sections/review-army.md
GENERATED: ship/sections/test-coverage.md
GENERATED: ship/sections/tests.md

Token Budget (claude host)
════════════════════════════════════════════════════════════
  spec                            2239 lines  ~ 27316 tokens
  design-review                   1884 lines  ~ 23437 tokens
  land-and-deploy                 1860 lines  ~ 22864 tokens
  plan-devex-review               1858 lines  ~ 22494 tokens
  plan-eng-review                 1849 lines  ~ 26701 tokens
  ship                            1848 lines  ~ 22819 tokens
  autoplan                        1788 lines  ~ 22553 tokens
  office-hours                    1780 lines  ~ 23142 tokens
  setup-gbrain                    1777 lines  ~ 20411 tokens
  review                          1766 lines  ~ 23552 tokens
  retro                           1754 lines  ~ 20709 tokens
  plan-design-review              1651 lines  ~ 22600 tokens
  qa                              1626 lines  ~ 18608 tokens
  design-consultation             1565 lines  ~ 19976 tokens
  plan-ceo-review                 1537 lines  ~ 22853 tokens
  codex                           1523 lines  ~ 19905 tokens
  cso                             1462 lines  ~ 19590 tokens
  design-html                     1453 lines  ~ 16839 tokens
  plan-tune                       1355 lines  ~ 15946 tokens
  design-shotgun                  1315 lines  ~ 15911 tokens
  document-release                1248 lines  ~ 14890 tokens
  devex-review                    1237 lines  ~ 16277 tokens
  qa-only                         1198 lines  ~ 14283 tokens
  document-generate               1194 lines  ~ 13645 tokens
  skillify                        1172 lines  ~ 13577 tokens
  sync-gbrain                     1076 lines  ~ 13355 tokens
  health                          1018 lines  ~ 12194 tokens
  investigate                     1016 lines  ~ 12771 tokens
  pair-agent                      1014 lines  ~ 11943 tokens
  canary                           994 lines  ~ 11934 tokens
  SKILL.md                         983 lines  ~ 12178 tokens
  context-save                     970 lines  ~ 11459 tokens
  open-gstack-browser              958 lines  ~ 11738 tokens
  ios-qa                           935 lines  ~ 11930 tokens
  browse                           930 lines  ~ 12033 tokens
  setup-deploy                     923 lines  ~ 11179 tokens
  learn                            895 lines  ~ 10646 tokens
  scrape                           891 lines  ~ 11116 tokens
  landing-report                   878 lines  ~ 10949 tokens
  context-restore                  852 lines  ~ 10548 tokens
  ios-design-review                819 lines  ~ 10621 tokens
  ios-clean                        817 lines  ~ 10475 tokens
  ios-fix                          815 lines  ~ 10402 tokens
  ios-sync                         808 lines  ~ 10399 tokens
  benchmark                        747 lines  ~  8204 tokens
  make-pdf                         670 lines  ~  7472 tokens
  benchmark-models                 622 lines  ~  7333 tokens
  setup-browser-cookies            594 lines  ~  6662 tokens
  ship/sections/review-army.md     406 lines  ~  5373 tokens
  ship/sections/tests.md           350 lines  ~  3890 tokens
  ship/sections/plan-completion.md   323 lines  ~  5092 tokens
  gstack-upgrade                   297 lines  ~  2935 tokens
  ship/sections/test-coverage.md   260 lines  ~  3458 tokens
  ship/sections/pr-body.md         208 lines  ~  2811 tokens
  ship/sections/adversarial.md     169 lines  ~  2738 tokens
  freeze                            92 lines  ~   786 tokens
  guard                             91 lines  ~   822 tokens
  careful                           68 lines  ~   637 tokens
  ship/sections/greptile.md         52 lines  ~   858 tokens
  unfreeze                          49 lines  ~   375 tokens
  ship/sections/changelog.md        46 lines  ~   465 tokens
────────────────────────────────────────────────────────────
  TOTAL                          62575 lines  ~778679 tokens

GENERATED: .agents/skills/gstack/SKILL.md
GENERATED: .agents/skills/gstack-pair-agent/SKILL.md
GENERATED: .agents/skills/gstack-benchmark/SKILL.md
GENERATED: .agents/skills/gstack-design-html/SKILL.md
GENERATED: .agents/skills/gstack-plan-tune/SKILL.md
GENERATED: .agents/skills/gstack-design-shotgun/SKILL.md
GENERATED: .agents/skills/gstack-plan-design-review/SKILL.md
GENERATED: .agents/skills/gstack-autoplan/SKILL.md
GENERATED: .agents/skills/gstack-design-consultation/SKILL.md
GENERATED: .agents/skills/gstack-learn/SKILL.md
GENERATED: .agents/skills/gstack-freeze/SKILL.md
GENERATED: .agents/skills/gstack-ios-qa/SKILL.md
GENERATED: .agents/skills/gstack-careful/SKILL.md
GENERATED: .agents/skills/gstack-cso/SKILL.md
GENERATED: .agents/skills/gstack-canary/SKILL.md
GENERATED: .agents/skills/gstack-open-gstack-browser/SKILL.md
GENERATED: .agents/skills/gstack-investigate/SKILL.md
GENERATED: .agents/skills/gstack-context-restore/SKILL.md
GENERATED: .agents/skills/gstack-claude/SKILL.md
GENERATED: .agents/skills/gstack-document-release/SKILL.md
GENERATED: .agents/skills/gstack-health/SKILL.md
GENERATED: .agents/skills/gstack-upgrade/SKILL.md
GENERATED: .agents/skills/gstack-land-and-deploy/SKILL.md
GENERATED: .agents/skills/gstack-spec/SKILL.md
GENERATED: .agents/skills/gstack-qa/SKILL.md
GENERATED: .agents/skills/gstack-scrape/SKILL.md
GENERATED: .agents/skills/gstack-qa-only/SKILL.md
GENERATED: .agents/skills/gstack-skillify/SKILL.md
GENERATED: .agents/skills/gstack-sync-gbrain/SKILL.md
GENERATED: .agents/skills/gstack-setup-browser-cookies/SKILL.md
GENERATED: .agents/skills/gstack-ios-fix/SKILL.md
GENERATED: .agents/skills/gstack-ios-clean/SKILL.md
GENERATED: .agents/skills/gstack-setup-gbrain/SKILL.md
GENERATED: .agents/skills/gstack-document-generate/SKILL.md
GENERATED: .agents/skills/gstack-review/SKILL.md
GENERATED: .agents/skills/gstack-plan-ceo-review/SKILL.md
GENERATED: .agents/skills/gstack-office-hours/SKILL.md
GENERATED: .agents/skills/gstack-landing-report/SKILL.md
GENERATED: .agents/skills/gstack-retro/SKILL.md
GENERATED: .agents/skills/gstack-ios-design-review/SKILL.md
GENERATED: .agents/skills/gstack-devex-review/SKILL.md
GENERATED: .agents/skills/gstack-benchmark-models/SKILL.md
GENERATED: .agents/skills/gstack-plan-devex-review/SKILL.md
GENERATED: .agents/skills/gstack-ios-sync/SKILL.md
GENERATED: .agents/skills/gstack-browse/SKILL.md
GENERATED: .agents/skills/gstack-design-review/SKILL.md
GENERATED: .agents/skills/gstack-ship/SKILL.md
GENERATED: .agents/skills/gstack-plan-eng-review/SKILL.md
⚠️  SIZE WARN: .agents/skills/gstack-plan-eng-review/SKILL.md is 98887 bytes (>= 95000, under 100000 freeze wall)
GENERATED: .agents/skills/gstack-guard/SKILL.md
GENERATED: .agents/skills/gstack-make-pdf/SKILL.md
GENERATED: .agents/skills/gstack-unfreeze/SKILL.md
GENERATED: .agents/skills/gstack-context-save/SKILL.md
GENERATED: .agents/skills/gstack-setup-deploy/SKILL.md

Token Budget (codex host)
════════════════════════════════════════════════════════════
  .agents/skills/gstack-spec      2234 lines  ~ 27053 tokens
  .agents/skills/gstack-land-and-deploy  1850 lines  ~ 22704 tokens
  .agents/skills/gstack-design-review  1792 lines  ~ 22269 tokens
  .agents/skills/gstack-autoplan  1774 lines  ~ 22351 tokens
  .agents/skills/gstack-setup-gbrain  1765 lines  ~ 20183 tokens
  .agents/skills/gstack-ship      1710 lines  ~ 20560 tokens
  .agents/skills/gstack-plan-devex-review  1709 lines  ~ 20794 tokens
  .agents/skills/gstack-retro     1698 lines  ~ 20145 tokens
  .agents/skills/gstack-plan-eng-review  1673 lines  ~ 24722 tokens
  .agents/skills/gstack-office-hours  1639 lines  ~ 21359 tokens
  .agents/skills/gstack-qa        1585 lines  ~ 18159 tokens
  .agents/skills/gstack-plan-design-review  1534 lines  ~ 21048 tokens
  .agents/skills/gstack-design-html  1440 lines  ~ 16677 tokens
  .agents/skills/gstack-design-consultation  1440 lines  ~ 18491 tokens
  .agents/skills/gstack-cso       1421 lines  ~ 19169 tokens
  .agents/skills/gstack-review    1398 lines  ~ 18584 tokens
  .agents/skills/gstack-plan-ceo-review  1365 lines  ~ 21022 tokens
  .agents/skills/gstack-plan-tune  1340 lines  ~ 15711 tokens
  .agents/skills/gstack-design-shotgun  1285 lines  ~ 15592 tokens
  .agents/skills/gstack-document-release  1236 lines  ~ 14741 tokens
  .agents/skills/gstack-devex-review  1224 lines  ~ 16111 tokens
  .agents/skills/gstack-document-generate  1179 lines  ~ 13474 tokens
  .agents/skills/gstack-skillify  1164 lines  ~ 13437 tokens
  .agents/skills/gstack-qa-only   1160 lines  ~ 13853 tokens
  .agents/skills/gstack-claude    1086 lines  ~ 12027 tokens
  .agents/skills/gstack-sync-gbrain  1065 lines  ~ 13198 tokens
  .agents/skills/gstack-health    1006 lines  ~ 12046 tokens
  .agents/skills/gstack-pair-agent  1005 lines  ~ 11811 tokens
  .agents/skills/gstack-canary     984 lines  ~ 11786 tokens
  .agents/skills/gstack            973 lines  ~ 12055 tokens
  .agents/skills/gstack-context-save   959 lines  ~ 11306 tokens
  .agents/skills/gstack-open-gstack-browser   950 lines  ~ 11605 tokens
  .agents/skills/gstack-investigate   942 lines  ~ 12087 tokens
  .agents/skills/gstack-browse     921 lines  ~ 11915 tokens
  .agents/skills/gstack-ios-qa     920 lines  ~ 11782 tokens
  .agents/skills/gstack-setup-deploy   911 lines  ~ 11041 tokens
  .agents/skills/gstack-learn      883 lines  ~ 10476 tokens
  .agents/skills/gstack-scrape     882 lines  ~ 10980 tokens
  .agents/skills/gstack-landing-report   870 lines  ~ 10816 tokens
  .agents/skills/gstack-context-restore   840 lines  ~ 10397 tokens
  .agents/skills/gstack-ios-design-review   808 lines  ~ 10482 tokens
  .agents/skills/gstack-ios-clean   806 lines  ~ 10330 tokens
  .agents/skills/gstack-ios-fix    802 lines  ~ 10260 tokens
  .agents/skills/gstack-ios-sync   796 lines  ~ 10247 tokens
  .agents/skills/gstack-benchmark   736 lines  ~  8077 tokens
  .agents/skills/gstack-make-pdf   660 lines  ~  7357 tokens
  .agents/skills/gstack-benchmark-models   612 lines  ~  7210 tokens
  .agents/skills/gstack-setup-browser-cookies   587 lines  ~  6542 tokens
  .agents/skills/gstack-upgrade    282 lines  ~  2874 tokens
  .agents/skills/gstack-freeze      69 lines  ~   744 tokens
  .agents/skills/gstack-guard       64 lines  ~   759 tokens
  .agents/skills/gstack-careful     51 lines  ~   643 tokens
  .agents/skills/gstack-unfreeze    38 lines  ~   333 tokens
────────────────────────────────────────────────────────────
  TOTAL                          58123 lines  ~719395 tokens

GENERATED: .factory/skills/gstack/SKILL.md
GENERATED: .factory/skills/gstack-pair-agent/SKILL.md
GENERATED: .factory/skills/gstack-benchmark/SKILL.md
GENERATED: .factory/skills/gstack-design-html/SKILL.md
GENERATED: .factory/skills/gstack-plan-tune/SKILL.md
GENERATED: .factory/skills/gstack-design-shotgun/SKILL.md
GENERATED: .factory/skills/gstack-plan-design-review/SKILL.md
GENERATED: .factory/skills/gstack-autoplan/SKILL.md
GENERATED: .factory/skills/gstack-design-consultation/SKILL.md
GENERATED: .factory/skills/gstack-learn/SKILL.md
GENERATED: .factory/skills/gstack-freeze/SKILL.md
GENERATED: .factory/skills/gstack-ios-qa/SKILL.md
GENERATED: .factory/skills/gstack-careful/SKILL.md
GENERATED: .factory/skills/gstack-cso/SKILL.md
GENERATED: .factory/skills/gstack-canary/SKILL.md
GENERATED: .factory/skills/gstack-open-gstack-browser/SKILL.md
GENERATED: .factory/skills/gstack-investigate/SKILL.md
GENERATED: .factory/skills/gstack-context-restore/SKILL.md
GENERATED: .factory/skills/gstack-claude/SKILL.md
GENERATED: .factory/skills/gstack-document-release/SKILL.md
GENERATED: .factory/skills/gstack-health/SKILL.md
GENERATED: .factory/skills/gstack-upgrade/SKILL.md
GENERATED: .factory/skills/gstack-land-and-deploy/SKILL.md
GENERATED: .factory/skills/gstack-spec/SKILL.md
GENERATED: .factory/skills/gstack-qa/SKILL.md
GENERATED: .factory/skills/gstack-scrape/SKILL.md
GENERATED: .factory/skills/gstack-qa-only/SKILL.md
GENERATED: .factory/skills/gstack-skillify/SKILL.md
GENERATED: .factory/skills/gstack-sync-gbrain/SKILL.md
GENERATED: .factory/skills/gstack-setup-browser-cookies/SKILL.md
GENERATED: .factory/skills/gstack-ios-fix/SKILL.md
GENERATED: .factory/skills/gstack-ios-clean/SKILL.md
GENERATED: .factory/skills/gstack-setup-gbrain/SKILL.md
GENERATED: .factory/skills/gstack-document-generate/SKILL.md
GENERATED: .factory/skills/gstack-review/SKILL.md
GENERATED: .factory/skills/gstack-plan-ceo-review/SKILL.md
GENERATED: .factory/skills/gstack-office-hours/SKILL.md
GENERATED: .factory/skills/gstack-landing-report/SKILL.md
GENERATED: .factory/skills/gstack-retro/SKILL.md
GENERATED: .factory/skills/gstack-ios-design-review/SKILL.md
GENERATED: .factory/skills/gstack-devex-review/SKILL.md
GENERATED: .factory/skills/gstack-benchmark-models/SKILL.md
GENERATED: .factory/skills/gstack-plan-devex-review/SKILL.md
GENERATED: .factory/skills/gstack-ios-sync/SKILL.md
GENERATED: .factory/skills/gstack-browse/SKILL.md
GENERATED: .factory/skills/gstack-design-review/SKILL.md
GENERATED: .factory/skills/gstack-ship/SKILL.md
GENERATED: .factory/skills/gstack-plan-eng-review/SKILL.md
GENERATED: .factory/skills/gstack-guard/SKILL.md
GENERATED: .factory/skills/gstack-make-pdf/SKILL.md
GENERATED: .factory/skills/gstack-unfreeze/SKILL.md
GENERATED: .factory/skills/gstack-context-save/SKILL.md
GENERATED: .factory/skills/gstack-setup-deploy/SKILL.md

Token Budget (factory host)
════════════════════════════════════════════════════════════
  .factory/skills/gstack-spec     2235 lines  ~ 27064 tokens
  .factory/skills/gstack-design-review  1873 lines  ~ 23275 tokens
  .factory/skills/gstack-land-and-deploy  1852 lines  ~ 22721 tokens
  .factory/skills/gstack-plan-devex-review  1844 lines  ~ 22297 tokens
  .factory/skills/gstack-ship     1836 lines  ~ 22675 tokens
  .factory/skills/gstack-plan-eng-review  1835 lines  ~ 26481 tokens
  .factory/skills/gstack-autoplan  1775 lines  ~ 22359 tokens
  .factory/skills/gstack-setup-gbrain  1766 lines  ~ 20191 tokens
  .factory/skills/gstack-review   1752 lines  ~ 23342 tokens
  .factory/skills/gstack-office-hours  1740 lines  ~ 22778 tokens
  .factory/skills/gstack-retro    1726 lines  ~ 20410 tokens
  .factory/skills/gstack-plan-design-review  1641 lines  ~ 22447 tokens
  .factory/skills/gstack-qa       1613 lines  ~ 18436 tokens
  .factory/skills/gstack-design-consultation  1532 lines  ~ 19627 tokens
  .factory/skills/gstack-plan-ceo-review  1500 lines  ~ 22525 tokens
  .factory/skills/gstack-cso      1449 lines  ~ 19433 tokens
  .factory/skills/gstack-design-html  1441 lines  ~ 16688 tokens
  .factory/skills/gstack-plan-tune  1341 lines  ~ 15719 tokens
  .factory/skills/gstack-design-shotgun  1286 lines  ~ 15602 tokens
  .factory/skills/gstack-document-release  1237 lines  ~ 14753 tokens
  .factory/skills/gstack-devex-review  1225 lines  ~ 16120 tokens
  .factory/skills/gstack-qa-only  1188 lines  ~ 14117 tokens
  .factory/skills/gstack-document-generate  1180 lines  ~ 13486 tokens
  .factory/skills/gstack-skillify  1165 lines  ~ 13446 tokens
  .factory/skills/gstack-claude   1087 lines  ~ 12035 tokens
  .factory/skills/gstack-sync-gbrain  1066 lines  ~ 13207 tokens
  .factory/skills/gstack-health   1007 lines  ~ 12054 tokens
  .factory/skills/gstack-pair-agent  1006 lines  ~ 11819 tokens
  .factory/skills/gstack-canary    985 lines  ~ 11795 tokens
  .factory/skills/gstack           974 lines  ~ 12063 tokens
  .factory/skills/gstack-investigate   970 lines  ~ 12366 tokens
  .factory/skills/gstack-context-save   960 lines  ~ 11314 tokens
  .factory/skills/gstack-open-gstack-browser   951 lines  ~ 11614 tokens
  .factory/skills/gstack-browse    922 lines  ~ 11923 tokens
  .factory/skills/gstack-ios-qa    921 lines  ~ 11790 tokens
  .factory/skills/gstack-setup-deploy   912 lines  ~ 11050 tokens
  .factory/skills/gstack-learn     884 lines  ~ 10484 tokens
  .factory/skills/gstack-scrape    883 lines  ~ 10988 tokens
  .factory/skills/gstack-landing-report   871 lines  ~ 10824 tokens
  .factory/skills/gstack-context-restore   841 lines  ~ 10405 tokens
  .factory/skills/gstack-ios-design-review   809 lines  ~ 10491 tokens
  .factory/skills/gstack-ios-clean   807 lines  ~ 10338 tokens
  .factory/skills/gstack-ios-fix   803 lines  ~ 10269 tokens
  .factory/skills/gstack-ios-sync   797 lines  ~ 10255 tokens
  .factory/skills/gstack-benchmark   737 lines  ~  8086 tokens
  .factory/skills/gstack-make-pdf   661 lines  ~  7365 tokens
  .factory/skills/gstack-benchmark-models   613 lines  ~  7219 tokens
  .factory/skills/gstack-setup-browser-cookies   588 lines  ~  6551 tokens
  .factory/skills/gstack-upgrade   283 lines  ~  2884 tokens
  .factory/skills/gstack-freeze     71 lines  ~   757 tokens
  .factory/skills/gstack-guard      66 lines  ~   772 tokens
  .factory/skills/gstack-careful    53 lines  ~   656 tokens
  .factory/skills/gstack-unfreeze    40 lines  ~   346 tokens
────────────────────────────────────────────────────────────
  TOTAL                          59600 lines  ~737712 tokens

GENERATED: .kiro/skills/gstack/SKILL.md
GENERATED: .kiro/skills/gstack-pair-agent/SKILL.md
GENERATED: .kiro/skills/gstack-benchmark/SKILL.md
GENERATED: .kiro/skills/gstack-design-html/SKILL.md
GENERATED: .kiro/skills/gstack-plan-tune/SKILL.md
GENERATED: .kiro/skills/gstack-design-shotgun/SKILL.md
GENERATED: .kiro/skills/gstack-plan-design-review/SKILL.md
GENERATED: .kiro/skills/gstack-autoplan/SKILL.md
GENERATED: .kiro/skills/gstack-design-consultation/SKILL.md
GENERATED: .kiro/skills/gstack-learn/SKILL.md
GENERATED: .kiro/skills/gstack-freeze/SKILL.md
GENERATED: .kiro/skills/gstack-ios-qa/SKILL.md
GENERATED: .kiro/skills/gstack-careful/SKILL.md
GENERATED: .kiro/skills/gstack-cso/SKILL.md
GENERATED: .kiro/skills/gstack-canary/SKILL.md
GENERATED: .kiro/skills/gstack-open-gstack-browser/SKILL.md
GENERATED: .kiro/skills/gstack-investigate/SKILL.md
GENERATED: .kiro/skills/gstack-context-restore/SKILL.md
GENERATED: .kiro/skills/gstack-claude/SKILL.md
GENERATED: .kiro/skills/gstack-document-release/SKILL.md
GENERATED: .kiro/skills/gstack-health/SKILL.md
GENERATED: .kiro/skills/gstack-upgrade/SKILL.md
GENERATED: .kiro/skills/gstack-land-and-deploy/SKILL.md
GENERATED: .kiro/skills/gstack-spec/SKILL.md
GENERATED: .kiro/skills/gstack-qa/SKILL.md
GENERATED: .kiro/skills/gstack-scrape/SKILL.md
GENERATED: .kiro/skills/gstack-qa-only/SKILL.md
GENERATED: .kiro/skills/gstack-skillify/SKILL.md
GENERATED: .kiro/skills/gstack-sync-gbrain/SKILL.md
GENERATED: .kiro/skills/gstack-setup-browser-cookies/SKILL.md
GENERATED: .kiro/skills/gstack-ios-fix/SKILL.md
GENERATED: .kiro/skills/gstack-ios-clean/SKILL.md
GENERATED: .kiro/skills/gstack-setup-gbrain/SKILL.md
GENERATED: .kiro/skills/gstack-document-generate/SKILL.md
GENERATED: .kiro/skills/gstack-review/SKILL.md
GENERATED: .kiro/skills/gstack-plan-ceo-review/SKILL.md
GENERATED: .kiro/skills/gstack-office-hours/SKILL.md
GENERATED: .kiro/skills/gstack-landing-report/SKILL.md
GENERATED: .kiro/skills/gstack-retro/SKILL.md
GENERATED: .kiro/skills/gstack-ios-design-review/SKILL.md
GENERATED: .kiro/skills/gstack-devex-review/SKILL.md
GENERATED: .kiro/skills/gstack-benchmark-models/SKILL.md
GENERATED: .kiro/skills/gstack-plan-devex-review/SKILL.md
GENERATED: .kiro/skills/gstack-ios-sync/SKILL.md
GENERATED: .kiro/skills/gstack-browse/SKILL.md
GENERATED: .kiro/skills/gstack-design-review/SKILL.md
GENERATED: .kiro/skills/gstack-ship/SKILL.md
GENERATED: .kiro/skills/gstack-plan-eng-review/SKILL.md
GENERATED: .kiro/skills/gstack-guard/SKILL.md
GENERATED: .kiro/skills/gstack-make-pdf/SKILL.md
GENERATED: .kiro/skills/gstack-unfreeze/SKILL.md
GENERATED: .kiro/skills/gstack-context-save/SKILL.md
GENERATED: .kiro/skills/gstack-setup-deploy/SKILL.md

Token Budget (kiro host)
════════════════════════════════════════════════════════════
  .kiro/skills/gstack-spec        2234 lines  ~ 27069 tokens
  .kiro/skills/gstack-design-review  1872 lines  ~ 23271 tokens
  .kiro/skills/gstack-land-and-deploy  1850 lines  ~ 22716 tokens
  .kiro/skills/gstack-plan-devex-review  1843 lines  ~ 22327 tokens
  .kiro/skills/gstack-ship        1834 lines  ~ 22668 tokens
  .kiro/skills/gstack-plan-eng-review  1834 lines  ~ 26489 tokens
  .kiro/skills/gstack-autoplan    1774 lines  ~ 22390 tokens
  .kiro/skills/gstack-setup-gbrain  1765 lines  ~ 20254 tokens
  .kiro/skills/gstack-review      1751 lines  ~ 23343 tokens
  .kiro/skills/gstack-office-hours  1739 lines  ~ 22779 tokens
  .kiro/skills/gstack-retro       1725 lines  ~ 20411 tokens
  .kiro/skills/gstack-plan-design-review  1640 lines  ~ 22444 tokens
  .kiro/skills/gstack-qa          1612 lines  ~ 18433 tokens
  .kiro/skills/gstack-design-consultation  1531 lines  ~ 19621 tokens
  .kiro/skills/gstack-plan-ceo-review  1499 lines  ~ 22522 tokens
  .kiro/skills/gstack-cso         1448 lines  ~ 19428 tokens
  .kiro/skills/gstack-design-html  1440 lines  ~ 16684 tokens
  .kiro/skills/gstack-plan-tune   1340 lines  ~ 15778 tokens
  .kiro/skills/gstack-design-shotgun  1285 lines  ~ 15599 tokens
  .kiro/skills/gstack-document-release  1236 lines  ~ 14753 tokens
  .kiro/skills/gstack-devex-review  1224 lines  ~ 16123 tokens
  .kiro/skills/gstack-qa-only     1187 lines  ~ 14112 tokens
  .kiro/skills/gstack-document-generate  1179 lines  ~ 13484 tokens
  .kiro/skills/gstack-skillify    1164 lines  ~ 13443 tokens
  .kiro/skills/gstack-claude      1086 lines  ~ 12031 tokens
  .kiro/skills/gstack-sync-gbrain  1065 lines  ~ 13213 tokens
  .kiro/skills/gstack-health      1006 lines  ~ 12049 tokens
  .kiro/skills/gstack-pair-agent  1005 lines  ~ 11813 tokens
  .kiro/skills/gstack-canary       984 lines  ~ 11791 tokens
  .kiro/skills/gstack              973 lines  ~ 12059 tokens
  .kiro/skills/gstack-investigate   969 lines  ~ 12368 tokens
  .kiro/skills/gstack-context-save   959 lines  ~ 11314 tokens
  .kiro/skills/gstack-open-gstack-browser   950 lines  ~ 11605 tokens
  .kiro/skills/gstack-browse       921 lines  ~ 11920 tokens
  .kiro/skills/gstack-ios-qa       920 lines  ~ 11786 tokens
  .kiro/skills/gstack-setup-deploy   911 lines  ~ 11045 tokens
  .kiro/skills/gstack-learn        883 lines  ~ 10504 tokens
  .kiro/skills/gstack-scrape       882 lines  ~ 10984 tokens
  .kiro/skills/gstack-landing-report   870 lines  ~ 10820 tokens
  .kiro/skills/gstack-context-restore   840 lines  ~ 10403 tokens
  .kiro/skills/gstack-ios-design-review   808 lines  ~ 10486 tokens
  .kiro/skills/gstack-ios-clean    806 lines  ~ 10333 tokens
  .kiro/skills/gstack-ios-fix      802 lines  ~ 10264 tokens
  .kiro/skills/gstack-ios-sync     796 lines  ~ 10253 tokens
  .kiro/skills/gstack-benchmark    736 lines  ~  8082 tokens
  .kiro/skills/gstack-make-pdf     660 lines  ~  7359 tokens
  .kiro/skills/gstack-benchmark-models   612 lines  ~  7213 tokens
  .kiro/skills/gstack-setup-browser-cookies   587 lines  ~  6545 tokens
  .kiro/skills/gstack-upgrade      282 lines  ~  2879 tokens
  .kiro/skills/gstack-freeze        69 lines  ~   746 tokens
  .kiro/skills/gstack-guard         64 lines  ~   761 tokens
  .kiro/skills/gstack-careful       51 lines  ~   643 tokens
  .kiro/skills/gstack-unfreeze      38 lines  ~   335 tokens
────────────────────────────────────────────────────────────
  TOTAL                          59541 lines  ~737745 tokens

GENERATED: .opencode/skills/gstack/SKILL.md
GENERATED: .opencode/skills/gstack-pair-agent/SKILL.md
GENERATED: .opencode/skills/gstack-benchmark/SKILL.md
GENERATED: .opencode/skills/gstack-design-html/SKILL.md
GENERATED: .opencode/skills/gstack-plan-tune/SKILL.md
GENERATED: .opencode/skills/gstack-design-shotgun/SKILL.md
GENERATED: .opencode/skills/gstack-plan-design-review/SKILL.md
GENERATED: .opencode/skills/gstack-autoplan/SKILL.md
GENERATED: .opencode/skills/gstack-design-consultation/SKILL.md
GENERATED: .opencode/skills/gstack-learn/SKILL.md
GENERATED: .opencode/skills/gstack-freeze/SKILL.md
GENERATED: .opencode/skills/gstack-ios-qa/SKILL.md
GENERATED: .opencode/skills/gstack-careful/SKILL.md
GENERATED: .opencode/skills/gstack-cso/SKILL.md
GENERATED: .opencode/skills/gstack-canary/SKILL.md
GENERATED: .opencode/skills/gstack-open-gstack-browser/SKILL.md
GENERATED: .opencode/skills/gstack-investigate/SKILL.md
GENERATED: .opencode/skills/gstack-context-restore/SKILL.md
GENERATED: .opencode/skills/gstack-claude/SKILL.md
GENERATED: .opencode/skills/gstack-document-release/SKILL.md
GENERATED: .opencode/skills/gstack-health/SKILL.md
GENERATED: .opencode/skills/gstack-upgrade/SKILL.md
GENERATED: .opencode/skills/gstack-land-and-deploy/SKILL.md
GENERATED: .opencode/skills/gstack-spec/SKILL.md
GENERATED: .opencode/skills/gstack-qa/SKILL.md
GENERATED: .opencode/skills/gstack-scrape/SKILL.md
GENERATED: .opencode/skills/gstack-qa-only/SKILL.md
GENERATED: .opencode/skills/gstack-skillify/SKILL.md
GENERATED: .opencode/skills/gstack-sync-gbrain/SKILL.md
GENERATED: .opencode/skills/gstack-setup-browser-cookies/SKILL.md
GENERATED: .opencode/skills/gstack-ios-fix/SKILL.md
GENERATED: .opencode/skills/gstack-ios-clean/SKILL.md
GENERATED: .opencode/skills/gstack-setup-gbrain/SKILL.md
GENERATED: .opencode/skills/gstack-document-generate/SKILL.md
GENERATED: .opencode/skills/gstack-review/SKILL.md
GENERATED: .opencode/skills/gstack-plan-ceo-review/SKILL.md
GENERATED: .opencode/skills/gstack-office-hours/SKILL.md
GENERATED: .opencode/skills/gstack-landing-report/SKILL.md
GENERATED: .opencode/skills/gstack-retro/SKILL.md
GENERATED: .opencode/skills/gstack-ios-design-review/SKILL.md
GENERATED: .opencode/skills/gstack-devex-review/SKILL.md
GENERATED: .opencode/skills/gstack-benchmark-models/SKILL.md
GENERATED: .opencode/skills/gstack-plan-devex-review/SKILL.md
GENERATED: .opencode/skills/gstack-ios-sync/SKILL.md
GENERATED: .opencode/skills/gstack-browse/SKILL.md
GENERATED: .opencode/skills/gstack-design-review/SKILL.md
GENERATED: .opencode/skills/gstack-ship/SKILL.md
GENERATED: .opencode/skills/gstack-plan-eng-review/SKILL.md
GENERATED: .opencode/skills/gstack-guard/SKILL.md
GENERATED: .opencode/skills/gstack-make-pdf/SKILL.md
GENERATED: .opencode/skills/gstack-unfreeze/SKILL.md
GENERATED: .opencode/skills/gstack-context-save/SKILL.md
GENERATED: .opencode/skills/gstack-setup-deploy/SKILL.md

Token Budget (opencode host)
════════════════════════════════════════════════════════════
  .opencode/skills/gstack-spec    2234 lines  ~ 27128 tokens
  .opencode/skills/gstack-design-review  1872 lines  ~ 23306 tokens
  .opencode/skills/gstack-land-and-deploy  1850 lines  ~ 22753 tokens
  .opencode/skills/gstack-plan-devex-review  1843 lines  ~ 22396 tokens
  .opencode/skills/gstack-ship    1834 lines  ~ 22709 tokens
  .opencode/skills/gstack-plan-eng-review  1834 lines  ~ 26534 tokens
  .opencode/skills/gstack-autoplan  1774 lines  ~ 22458 tokens
  .opencode/skills/gstack-setup-gbrain  1765 lines  ~ 20360 tokens
  .opencode/skills/gstack-review  1751 lines  ~ 23384 tokens
  .opencode/skills/gstack-office-hours  1739 lines  ~ 22819 tokens
  .opencode/skills/gstack-retro   1725 lines  ~ 20445 tokens
  .opencode/skills/gstack-plan-design-review  1640 lines  ~ 22477 tokens
  .opencode/skills/gstack-qa      1612 lines  ~ 18461 tokens
  .opencode/skills/gstack-design-consultation  1531 lines  ~ 19653 tokens
  .opencode/skills/gstack-plan-ceo-review  1499 lines  ~ 22553 tokens
  .opencode/skills/gstack-cso     1448 lines  ~ 19453 tokens
  .opencode/skills/gstack-design-html  1440 lines  ~ 16724 tokens
  .opencode/skills/gstack-plan-tune  1340 lines  ~ 15878 tokens
  .opencode/skills/gstack-design-shotgun  1285 lines  ~ 15632 tokens
  .opencode/skills/gstack-document-release  1236 lines  ~ 14785 tokens
  .opencode/skills/gstack-devex-review  1224 lines  ~ 16160 tokens
  .opencode/skills/gstack-qa-only  1187 lines  ~ 14138 tokens
  .opencode/skills/gstack-document-generate  1179 lines  ~ 13513 tokens
  .opencode/skills/gstack-skillify  1164 lines  ~ 13470 tokens
  .opencode/skills/gstack-claude  1086 lines  ~ 12055 tokens
  .opencode/skills/gstack-sync-gbrain  1065 lines  ~ 13251 tokens
  .opencode/skills/gstack-health  1006 lines  ~ 12073 tokens
  .opencode/skills/gstack-pair-agent  1005 lines  ~ 11839 tokens
  .opencode/skills/gstack-canary   984 lines  ~ 11820 tokens
  .opencode/skills/gstack          973 lines  ~ 12089 tokens
  .opencode/skills/gstack-investigate   969 lines  ~ 12400 tokens
  .opencode/skills/gstack-context-save   959 lines  ~ 11344 tokens
  .opencode/skills/gstack-open-gstack-browser   950 lines  ~ 11635 tokens
  .opencode/skills/gstack-browse   921 lines  ~ 11949 tokens
  .opencode/skills/gstack-ios-qa   920 lines  ~ 11809 tokens
  .opencode/skills/gstack-setup-deploy   911 lines  ~ 11069 tokens
  .opencode/skills/gstack-learn    883 lines  ~ 10558 tokens
  .opencode/skills/gstack-scrape   882 lines  ~ 11007 tokens
  .opencode/skills/gstack-landing-report   870 lines  ~ 10844 tokens
  .opencode/skills/gstack-context-restore   840 lines  ~ 10429 tokens
  .opencode/skills/gstack-ios-design-review   808 lines  ~ 10510 tokens
  .opencode/skills/gstack-ios-clean   806 lines  ~ 10357 tokens
  .opencode/skills/gstack-ios-fix   802 lines  ~ 10288 tokens
  .opencode/skills/gstack-ios-sync   796 lines  ~ 10279 tokens
  .opencode/skills/gstack-benchmark   736 lines  ~  8111 tokens
  .opencode/skills/gstack-make-pdf   660 lines  ~  7385 tokens
  .opencode/skills/gstack-benchmark-models   612 lines  ~  7238 tokens
  .opencode/skills/gstack-setup-browser-cookies   587 lines  ~  6571 tokens
  .opencode/skills/gstack-upgrade   282 lines  ~  2913 tokens
  .opencode/skills/gstack-freeze    69 lines  ~   749 tokens
  .opencode/skills/gstack-guard     64 lines  ~   764 tokens
  .opencode/skills/gstack-careful    51 lines  ~   643 tokens
  .opencode/skills/gstack-unfreeze    38 lines  ~   338 tokens
────────────────────────────────────────────────────────────
  TOTAL                          59541 lines  ~739506 tokens

GENERATED: .slate/skills/gstack/SKILL.md
GENERATED: .slate/skills/gstack-pair-agent/SKILL.md
GENERATED: .slate/skills/gstack-benchmark/SKILL.md
GENERATED: .slate/skills/gstack-design-html/SKILL.md
GENERATED: .slate/skills/gstack-plan-tune/SKILL.md
GENERATED: .slate/skills/gstack-design-shotgun/SKILL.md
GENERATED: .slate/skills/gstack-plan-design-review/SKILL.md
GENERATED: .slate/skills/gstack-autoplan/SKILL.md
GENERATED: .slate/skills/gstack-design-consultation/SKILL.md
GENERATED: .slate/skills/gstack-learn/SKILL.md
GENERATED: .slate/skills/gstack-freeze/SKILL.md
GENERATED: .slate/skills/gstack-ios-qa/SKILL.md
GENERATED: .slate/skills/gstack-careful/SKILL.md
GENERATED: .slate/skills/gstack-cso/SKILL.md
GENERATED: .slate/skills/gstack-canary/SKILL.md
GENERATED: .slate/skills/gstack-open-gstack-browser/SKILL.md
GENERATED: .slate/skills/gstack-investigate/SKILL.md
GENERATED: .slate/skills/gstack-context-restore/SKILL.md
GENERATED: .slate/skills/gstack-claude/SKILL.md
GENERATED: .slate/skills/gstack-document-release/SKILL.md
GENERATED: .slate/skills/gstack-health/SKILL.md
GENERATED: .slate/skills/gstack-upgrade/SKILL.md
GENERATED: .slate/skills/gstack-land-and-deploy/SKILL.md
GENERATED: .slate/skills/gstack-spec/SKILL.md
GENERATED: .slate/skills/gstack-qa/SKILL.md
GENERATED: .slate/skills/gstack-scrape/SKILL.md
GENERATED: .slate/skills/gstack-qa-only/SKILL.md
GENERATED: .slate/skills/gstack-skillify/SKILL.md
GENERATED: .slate/skills/gstack-sync-gbrain/SKILL.md
GENERATED: .slate/skills/gstack-setup-browser-cookies/SKILL.md
GENERATED: .slate/skills/gstack-ios-fix/SKILL.md
GENERATED: .slate/skills/gstack-ios-clean/SKILL.md
GENERATED: .slate/skills/gstack-setup-gbrain/SKILL.md
GENERATED: .slate/skills/gstack-document-generate/SKILL.md
GENERATED: .slate/skills/gstack-review/SKILL.md
GENERATED: .slate/skills/gstack-plan-ceo-review/SKILL.md
GENERATED: .slate/skills/gstack-office-hours/SKILL.md
GENERATED: .slate/skills/gstack-landing-report/SKILL.md
GENERATED: .slate/skills/gstack-retro/SKILL.md
GENERATED: .slate/skills/gstack-ios-design-review/SKILL.md
GENERATED: .slate/skills/gstack-devex-review/SKILL.md
GENERATED: .slate/skills/gstack-benchmark-models/SKILL.md
GENERATED: .slate/skills/gstack-plan-devex-review/SKILL.md
GENERATED: .slate/skills/gstack-ios-sync/SKILL.md
GENERATED: .slate/skills/gstack-browse/SKILL.md
GENERATED: .slate/skills/gstack-design-review/SKILL.md
GENERATED: .slate/skills/gstack-ship/SKILL.md
GENERATED: .slate/skills/gstack-plan-eng-review/SKILL.md
GENERATED: .slate/skills/gstack-guard/SKILL.md
GENERATED: .slate/skills/gstack-make-pdf/SKILL.md
GENERATED: .slate/skills/gstack-unfreeze/SKILL.md
GENERATED: .slate/skills/gstack-context-save/SKILL.md
GENERATED: .slate/skills/gstack-setup-deploy/SKILL.md

Token Budget (slate host)
════════════════════════════════════════════════════════════
  .slate/skills/gstack-spec       2234 lines  ~ 27078 tokens
  .slate/skills/gstack-design-review  1872 lines  ~ 23277 tokens
  .slate/skills/gstack-land-and-deploy  1850 lines  ~ 22721 tokens
  .slate/skills/gstack-plan-devex-review  1843 lines  ~ 22335 tokens
  .slate/skills/gstack-ship       1834 lines  ~ 22674 tokens
  .slate/skills/gstack-plan-eng-review  1834 lines  ~ 26495 tokens
  .slate/skills/gstack-autoplan   1774 lines  ~ 22398 tokens
  .slate/skills/gstack-setup-gbrain  1765 lines  ~ 20265 tokens
  .slate/skills/gstack-review     1751 lines  ~ 23349 tokens
  .slate/skills/gstack-office-hours  1739 lines  ~ 22785 tokens
  .slate/skills/gstack-retro      1725 lines  ~ 20416 tokens
  .slate/skills/gstack-plan-design-review  1640 lines  ~ 22449 tokens
  .slate/skills/gstack-qa         1612 lines  ~ 18437 tokens
  .slate/skills/gstack-design-consultation  1531 lines  ~ 19626 tokens
  .slate/skills/gstack-plan-ceo-review  1499 lines  ~ 22526 tokens
  .slate/skills/gstack-cso        1448 lines  ~ 19432 tokens
  .slate/skills/gstack-design-html  1440 lines  ~ 16690 tokens
  .slate/skills/gstack-plan-tune  1340 lines  ~ 15788 tokens
  .slate/skills/gstack-design-shotgun  1285 lines  ~ 15604 tokens
  .slate/skills/gstack-document-release  1236 lines  ~ 14758 tokens
  .slate/skills/gstack-devex-review  1224 lines  ~ 16128 tokens
  .slate/skills/gstack-qa-only    1187 lines  ~ 14117 tokens
  .slate/skills/gstack-document-generate  1179 lines  ~ 13488 tokens
  .slate/skills/gstack-skillify   1164 lines  ~ 13447 tokens
  .slate/skills/gstack-claude     1086 lines  ~ 12035 tokens
  .slate/skills/gstack-sync-gbrain  1065 lines  ~ 13218 tokens
  .slate/skills/gstack-health     1006 lines  ~ 12053 tokens
  .slate/skills/gstack-pair-agent  1005 lines  ~ 11818 tokens
  .slate/skills/gstack-canary      984 lines  ~ 11796 tokens
  .slate/skills/gstack             973 lines  ~ 12064 tokens
  .slate/skills/gstack-investigate   969 lines  ~ 12373 tokens
  .slate/skills/gstack-context-save   959 lines  ~ 11319 tokens
  .slate/skills/gstack-open-gstack-browser   950 lines  ~ 11611 tokens
  .slate/skills/gstack-browse      921 lines  ~ 11925 tokens
  .slate/skills/gstack-ios-qa      920 lines  ~ 11789 tokens
  .slate/skills/gstack-setup-deploy   911 lines  ~ 11049 tokens
  .slate/skills/gstack-learn       883 lines  ~ 10511 tokens
  .slate/skills/gstack-scrape      882 lines  ~ 10987 tokens
  .slate/skills/gstack-landing-report   870 lines  ~ 10824 tokens
  .slate/skills/gstack-context-restore   840 lines  ~ 10407 tokens
  .slate/skills/gstack-ios-design-review   808 lines  ~ 10490 tokens
  .slate/skills/gstack-ios-clean   806 lines  ~ 10337 tokens
  .slate/skills/gstack-ios-fix     802 lines  ~ 10268 tokens
  .slate/skills/gstack-ios-sync    796 lines  ~ 10257 tokens
  .slate/skills/gstack-benchmark   736 lines  ~  8087 tokens
  .slate/skills/gstack-make-pdf    660 lines  ~  7364 tokens
  .slate/skills/gstack-benchmark-models   612 lines  ~  7217 tokens
  .slate/skills/gstack-setup-browser-cookies   587 lines  ~  6549 tokens
  .slate/skills/gstack-upgrade     282 lines  ~  2885 tokens
  .slate/skills/gstack-freeze       69 lines  ~   747 tokens
  .slate/skills/gstack-guard        64 lines  ~   762 tokens
  .slate/skills/gstack-careful      51 lines  ~   643 tokens
  .slate/skills/gstack-unfreeze     38 lines  ~   336 tokens
────────────────────────────────────────────────────────────
  TOTAL                          59541 lines  ~738004 tokens

GENERATED: .cursor/skills/gstack/SKILL.md
GENERATED: .cursor/skills/gstack-pair-agent/SKILL.md
GENERATED: .cursor/skills/gstack-benchmark/SKILL.md
GENERATED: .cursor/skills/gstack-design-html/SKILL.md
GENERATED: .cursor/skills/gstack-plan-tune/SKILL.md
GENERATED: .cursor/skills/gstack-design-shotgun/SKILL.md
GENERATED: .cursor/skills/gstack-plan-design-review/SKILL.md
GENERATED: .cursor/skills/gstack-autoplan/SKILL.md
GENERATED: .cursor/skills/gstack-design-consultation/SKILL.md
GENERATED: .cursor/skills/gstack-learn/SKILL.md
GENERATED: .cursor/skills/gstack-freeze/SKILL.md
GENERATED: .cursor/skills/gstack-ios-qa/SKILL.md
GENERATED: .cursor/skills/gstack-careful/SKILL.md
GENERATED: .cursor/skills/gstack-cso/SKILL.md
GENERATED: .cursor/skills/gstack-canary/SKILL.md
GENERATED: .cursor/skills/gstack-open-gstack-browser/SKILL.md
GENERATED: .cursor/skills/gstack-investigate/SKILL.md
GENERATED: .cursor/skills/gstack-context-restore/SKILL.md
GENERATED: .cursor/skills/gstack-claude/SKILL.md
GENERATED: .cursor/skills/gstack-document-release/SKILL.md
GENERATED: .cursor/skills/gstack-health/SKILL.md
GENERATED: .cursor/skills/gstack-upgrade/SKILL.md
GENERATED: .cursor/skills/gstack-land-and-deploy/SKILL.md
GENERATED: .cursor/skills/gstack-spec/SKILL.md
GENERATED: .cursor/skills/gstack-qa/SKILL.md
GENERATED: .cursor/skills/gstack-scrape/SKILL.md
GENERATED: .cursor/skills/gstack-qa-only/SKILL.md
GENERATED: .cursor/skills/gstack-skillify/SKILL.md
GENERATED: .cursor/skills/gstack-sync-gbrain/SKILL.md
GENERATED: .cursor/skills/gstack-setup-browser-cookies/SKILL.md
GENERATED: .cursor/skills/gstack-ios-fix/SKILL.md
GENERATED: .cursor/skills/gstack-ios-clean/SKILL.md
GENERATED: .cursor/skills/gstack-setup-gbrain/SKILL.md
GENERATED: .cursor/skills/gstack-document-generate/SKILL.md
GENERATED: .cursor/skills/gstack-review/SKILL.md
GENERATED: .cursor/skills/gstack-plan-ceo-review/SKILL.md
GENERATED: .cursor/skills/gstack-office-hours/SKILL.md
GENERATED: .cursor/skills/gstack-landing-report/SKILL.md
GENERATED: .cursor/skills/gstack-retro/SKILL.md
GENERATED: .cursor/skills/gstack-ios-design-review/SKILL.md
GENERATED: .cursor/skills/gstack-devex-review/SKILL.md
GENERATED: .cursor/skills/gstack-benchmark-models/SKILL.md
GENERATED: .cursor/skills/gstack-plan-devex-review/SKILL.md
GENERATED: .cursor/skills/gstack-ios-sync/SKILL.md
GENERATED: .cursor/skills/gstack-browse/SKILL.md
GENERATED: .cursor/skills/gstack-design-review/SKILL.md
GENERATED: .cursor/skills/gstack-ship/SKILL.md
GENERATED: .cursor/skills/gstack-plan-eng-review/SKILL.md
GENERATED: .cursor/skills/gstack-guard/SKILL.md
GENERATED: .cursor/skills/gstack-make-pdf/SKILL.md
GENERATED: .cursor/skills/gstack-unfreeze/SKILL.md
GENERATED: .cursor/skills/gstack-context-save/SKILL.md
GENERATED: .cursor/skills/gstack-setup-deploy/SKILL.md

Token Budget (cursor host)
════════════════════════════════════════════════════════════
  .cursor/skills/gstack-spec      2234 lines  ~ 27086 tokens
  .cursor/skills/gstack-design-review  1872 lines  ~ 23283 tokens
  .cursor/skills/gstack-land-and-deploy  1850 lines  ~ 22727 tokens
  .cursor/skills/gstack-plan-devex-review  1843 lines  ~ 22343 tokens
  .cursor/skills/gstack-ship      1834 lines  ~ 22680 tokens
  .cursor/skills/gstack-plan-eng-review  1834 lines  ~ 26501 tokens
  .cursor/skills/gstack-autoplan  1774 lines  ~ 22406 tokens
  .cursor/skills/gstack-setup-gbrain  1765 lines  ~ 20277 tokens
  .cursor/skills/gstack-review    1751 lines  ~ 23355 tokens
  .cursor/skills/gstack-office-hours  1739 lines  ~ 22791 tokens
  .cursor/skills/gstack-retro     1725 lines  ~ 20421 tokens
  .cursor/skills/gstack-plan-design-review  1640 lines  ~ 22455 tokens
  .cursor/skills/gstack-qa        1612 lines  ~ 18442 tokens
  .cursor/skills/gstack-design-consultation  1531 lines  ~ 19632 tokens
  .cursor/skills/gstack-plan-ceo-review  1499 lines  ~ 22531 tokens
  .cursor/skills/gstack-cso       1448 lines  ~ 19436 tokens
  .cursor/skills/gstack-design-html  1440 lines  ~ 16697 tokens
  .cursor/skills/gstack-plan-tune  1340 lines  ~ 15799 tokens
  .cursor/skills/gstack-design-shotgun  1285 lines  ~ 15609 tokens
  .cursor/skills/gstack-document-release  1236 lines  ~ 14762 tokens
  .cursor/skills/gstack-devex-review  1224 lines  ~ 16133 tokens
  .cursor/skills/gstack-qa-only   1187 lines  ~ 14121 tokens
  .cursor/skills/gstack-document-generate  1179 lines  ~ 13493 tokens
  .cursor/skills/gstack-skillify  1164 lines  ~ 13451 tokens
  .cursor/skills/gstack-claude    1086 lines  ~ 12038 tokens
  .cursor/skills/gstack-sync-gbrain  1065 lines  ~ 13223 tokens
  .cursor/skills/gstack-health    1006 lines  ~ 12057 tokens
  .cursor/skills/gstack-pair-agent  1005 lines  ~ 11822 tokens
  .cursor/skills/gstack-canary     984 lines  ~ 11800 tokens
  .cursor/skills/gstack            973 lines  ~ 12069 tokens
  .cursor/skills/gstack-investigate   969 lines  ~ 12377 tokens
  .cursor/skills/gstack-context-save   959 lines  ~ 11323 tokens
  .cursor/skills/gstack-open-gstack-browser   950 lines  ~ 11616 tokens
  .cursor/skills/gstack-browse     921 lines  ~ 11929 tokens
  .cursor/skills/gstack-ios-qa     920 lines  ~ 11793 tokens
  .cursor/skills/gstack-setup-deploy   911 lines  ~ 11053 tokens
  .cursor/skills/gstack-learn      883 lines  ~ 10517 tokens
  .cursor/skills/gstack-scrape     882 lines  ~ 10991 tokens
  .cursor/skills/gstack-landing-report   870 lines  ~ 10827 tokens
  .cursor/skills/gstack-context-restore   840 lines  ~ 10411 tokens
  .cursor/skills/gstack-ios-design-review   808 lines  ~ 10494 tokens
  .cursor/skills/gstack-ios-clean   806 lines  ~ 10341 tokens
  .cursor/skills/gstack-ios-fix    802 lines  ~ 10272 tokens
  .cursor/skills/gstack-ios-sync   796 lines  ~ 10261 tokens
  .cursor/skills/gstack-benchmark   736 lines  ~  8091 tokens
  .cursor/skills/gstack-make-pdf   660 lines  ~  7368 tokens
  .cursor/skills/gstack-benchmark-models   612 lines  ~  7221 tokens
  .cursor/skills/gstack-setup-browser-cookies   587 lines  ~  6553 tokens
  .cursor/skills/gstack-upgrade    282 lines  ~  2891 tokens
  .cursor/skills/gstack-freeze      69 lines  ~   747 tokens
  .cursor/skills/gstack-guard       64 lines  ~   762 tokens
  .cursor/skills/gstack-careful     51 lines  ~   643 tokens
  .cursor/skills/gstack-unfreeze    38 lines  ~   336 tokens
────────────────────────────────────────────────────────────
  TOTAL                          59541 lines  ~738257 tokens

GENERATED: .openclaw/skills/gstack/SKILL.md
GENERATED: .openclaw/skills/gstack-pair-agent/SKILL.md
GENERATED: .openclaw/skills/gstack-benchmark/SKILL.md
GENERATED: .openclaw/skills/gstack-design-html/SKILL.md
GENERATED: .openclaw/skills/gstack-plan-tune/SKILL.md
GENERATED: .openclaw/skills/gstack-design-shotgun/SKILL.md
GENERATED: .openclaw/skills/gstack-plan-design-review/SKILL.md
GENERATED: .openclaw/skills/gstack-autoplan/SKILL.md
GENERATED: .openclaw/skills/gstack-design-consultation/SKILL.md
GENERATED: .openclaw/skills/gstack-learn/SKILL.md
GENERATED: .openclaw/skills/gstack-freeze/SKILL.md
GENERATED: .openclaw/skills/gstack-ios-qa/SKILL.md
GENERATED: .openclaw/skills/gstack-careful/SKILL.md
GENERATED: .openclaw/skills/gstack-cso/SKILL.md
GENERATED: .openclaw/skills/gstack-canary/SKILL.md
GENERATED: .openclaw/skills/gstack-open-gstack-browser/SKILL.md
GENERATED: .openclaw/skills/gstack-investigate/SKILL.md
GENERATED: .openclaw/skills/gstack-context-restore/SKILL.md
GENERATED: .openclaw/skills/gstack-claude/SKILL.md
GENERATED: .openclaw/skills/gstack-document-release/SKILL.md
GENERATED: .openclaw/skills/gstack-health/SKILL.md
GENERATED: .openclaw/skills/gstack-upgrade/SKILL.md
GENERATED: .openclaw/skills/gstack-land-and-deploy/SKILL.md
GENERATED: .openclaw/skills/gstack-spec/SKILL.md
GENERATED: .openclaw/skills/gstack-qa/SKILL.md
GENERATED: .openclaw/skills/gstack-scrape/SKILL.md
GENERATED: .openclaw/skills/gstack-qa-only/SKILL.md
GENERATED: .openclaw/skills/gstack-skillify/SKILL.md
GENERATED: .openclaw/skills/gstack-sync-gbrain/SKILL.md
GENERATED: .openclaw/skills/gstack-setup-browser-cookies/SKILL.md
GENERATED: .openclaw/skills/gstack-ios-fix/SKILL.md
GENERATED: .openclaw/skills/gstack-ios-clean/SKILL.md
GENERATED: .openclaw/skills/gstack-setup-gbrain/SKILL.md
GENERATED: .openclaw/skills/gstack-document-generate/SKILL.md
GENERATED: .openclaw/skills/gstack-review/SKILL.md
GENERATED: .openclaw/skills/gstack-plan-ceo-review/SKILL.md
GENERATED: .openclaw/skills/gstack-office-hours/SKILL.md
GENERATED: .openclaw/skills/gstack-landing-report/SKILL.md
GENERATED: .openclaw/skills/gstack-retro/SKILL.md
GENERATED: .openclaw/skills/gstack-ios-design-review/SKILL.md
GENERATED: .openclaw/skills/gstack-devex-review/SKILL.md
GENERATED: .openclaw/skills/gstack-benchmark-models/SKILL.md
GENERATED: .openclaw/skills/gstack-plan-devex-review/SKILL.md
GENERATED: .openclaw/skills/gstack-ios-sync/SKILL.md
GENERATED: .openclaw/skills/gstack-browse/SKILL.md
GENERATED: .openclaw/skills/gstack-design-review/SKILL.md
GENERATED: .openclaw/skills/gstack-ship/SKILL.md
GENERATED: .openclaw/skills/gstack-plan-eng-review/SKILL.md
GENERATED: .openclaw/skills/gstack-guard/SKILL.md
GENERATED: .openclaw/skills/gstack-make-pdf/SKILL.md
GENERATED: .openclaw/skills/gstack-unfreeze/SKILL.md
GENERATED: .openclaw/skills/gstack-context-save/SKILL.md
GENERATED: .openclaw/skills/gstack-setup-deploy/SKILL.md
GENERATED: openclaw/gstack-lite-CLAUDE.md
GENERATED: openclaw/gstack-full-CLAUDE.md
GENERATED: openclaw/gstack-plan-CLAUDE.md

Token Budget (openclaw host)
════════════════════════════════════════════════════════════
  .openclaw/skills/gstack-spec    2235 lines  ~ 27108 tokens
  .openclaw/skills/gstack-land-and-deploy  1851 lines  ~ 22742 tokens
  .openclaw/skills/gstack-design-review  1793 lines  ~ 22302 tokens
  .openclaw/skills/gstack-autoplan  1775 lines  ~ 22426 tokens
  .openclaw/skills/gstack-setup-gbrain  1766 lines  ~ 20304 tokens
  .openclaw/skills/gstack-retro   1726 lines  ~ 20435 tokens
  .openclaw/skills/gstack-ship    1711 lines  ~ 20591 tokens
  .openclaw/skills/gstack-plan-devex-review  1710 lines  ~ 20866 tokens
  .openclaw/skills/gstack-plan-eng-review  1701 lines  ~ 25020 tokens
  .openclaw/skills/gstack-office-hours  1640 lines  ~ 21397 tokens
  .openclaw/skills/gstack-qa      1613 lines  ~ 18455 tokens
  .openclaw/skills/gstack-plan-design-review  1535 lines  ~ 21079 tokens
  .openclaw/skills/gstack-design-consultation  1468 lines  ~ 18777 tokens
  .openclaw/skills/gstack-cso     1449 lines  ~ 19449 tokens
  .openclaw/skills/gstack-design-html  1441 lines  ~ 16714 tokens
  .openclaw/skills/gstack-review  1426 lines  ~ 18870 tokens
  .openclaw/skills/gstack-plan-ceo-review  1366 lines  ~ 21048 tokens
  .openclaw/skills/gstack-plan-tune  1341 lines  ~ 15825 tokens
  .openclaw/skills/gstack-design-shotgun  1286 lines  ~ 15624 tokens
  .openclaw/skills/gstack-document-release  1237 lines  ~ 14774 tokens
  .openclaw/skills/gstack-devex-review  1225 lines  ~ 16148 tokens
  .openclaw/skills/gstack-qa-only  1188 lines  ~ 14134 tokens
  .openclaw/skills/gstack-document-generate  1180 lines  ~ 13504 tokens
  .openclaw/skills/gstack-skillify  1165 lines  ~ 13464 tokens
  .openclaw/skills/gstack-claude  1087 lines  ~ 12050 tokens
  .openclaw/skills/gstack-sync-gbrain  1066 lines  ~ 13238 tokens
  .openclaw/skills/gstack-health  1007 lines  ~ 12069 tokens
  .openclaw/skills/gstack-pair-agent  1006 lines  ~ 11835 tokens
  .openclaw/skills/gstack-canary   985 lines  ~ 11814 tokens
  .openclaw/skills/gstack          974 lines  ~ 12083 tokens
  .openclaw/skills/gstack-investigate   970 lines  ~ 12391 tokens
  .openclaw/skills/gstack-context-save   960 lines  ~ 11336 tokens
  .openclaw/skills/gstack-open-gstack-browser   951 lines  ~ 11631 tokens
  .openclaw/skills/gstack-browse   922 lines  ~ 11943 tokens
  .openclaw/skills/gstack-ios-qa   921 lines  ~ 11805 tokens
  .openclaw/skills/gstack-setup-deploy   912 lines  ~ 11065 tokens
  .openclaw/skills/gstack-learn    884 lines  ~ 10535 tokens
  .openclaw/skills/gstack-scrape   883 lines  ~ 11003 tokens
  .openclaw/skills/gstack-landing-report   871 lines  ~ 10839 tokens
  .openclaw/skills/gstack-context-restore   841 lines  ~ 10423 tokens
  .openclaw/skills/gstack-ios-design-review   809 lines  ~ 10506 tokens
  .openclaw/skills/gstack-ios-clean   807 lines  ~ 10353 tokens
  .openclaw/skills/gstack-ios-fix   803 lines  ~ 10284 tokens
  .openclaw/skills/gstack-ios-sync   797 lines  ~ 10273 tokens
  .openclaw/skills/gstack-benchmark   737 lines  ~  8105 tokens
  .openclaw/skills/gstack-make-pdf   661 lines  ~  7381 tokens
  .openclaw/skills/gstack-benchmark-models   613 lines  ~  7234 tokens
  .openclaw/skills/gstack-setup-browser-cookies   588 lines  ~  6566 tokens
  .openclaw/skills/gstack-upgrade   283 lines  ~  2907 tokens
  .openclaw/skills/gstack-freeze    70 lines  ~   752 tokens
  .openclaw/skills/gstack-guard     65 lines  ~   767 tokens
  .openclaw/skills/gstack-careful    52 lines  ~   648 tokens
  .openclaw/skills/gstack-unfreeze    39 lines  ~   341 tokens
────────────────────────────────────────────────────────────
  TOTAL                          58392 lines  ~723233 tokens

GENERATED: .hermes/skills/gstack/SKILL.md
GENERATED: .hermes/skills/gstack-pair-agent/SKILL.md
GENERATED: .hermes/skills/gstack-benchmark/SKILL.md
GENERATED: .hermes/skills/gstack-design-html/SKILL.md
GENERATED: .hermes/skills/gstack-plan-tune/SKILL.md
GENERATED: .hermes/skills/gstack-design-shotgun/SKILL.md
GENERATED: .hermes/skills/gstack-plan-design-review/SKILL.md
GENERATED: .hermes/skills/gstack-autoplan/SKILL.md
GENERATED: .hermes/skills/gstack-design-consultation/SKILL.md
GENERATED: .hermes/skills/gstack-learn/SKILL.md
GENERATED: .hermes/skills/gstack-freeze/SKILL.md
GENERATED: .hermes/skills/gstack-ios-qa/SKILL.md
GENERATED: .hermes/skills/gstack-careful/SKILL.md
GENERATED: .hermes/skills/gstack-cso/SKILL.md
GENERATED: .hermes/skills/gstack-canary/SKILL.md
GENERATED: .hermes/skills/gstack-open-gstack-browser/SKILL.md
GENERATED: .hermes/skills/gstack-investigate/SKILL.md
GENERATED: .hermes/skills/gstack-context-restore/SKILL.md
GENERATED: .hermes/skills/gstack-claude/SKILL.md
GENERATED: .hermes/skills/gstack-document-release/SKILL.md
GENERATED: .hermes/skills/gstack-health/SKILL.md
GENERATED: .hermes/skills/gstack-upgrade/SKILL.md
GENERATED: .hermes/skills/gstack-land-and-deploy/SKILL.md
GENERATED: .hermes/skills/gstack-spec/SKILL.md
GENERATED: .hermes/skills/gstack-qa/SKILL.md
GENERATED: .hermes/skills/gstack-scrape/SKILL.md
GENERATED: .hermes/skills/gstack-qa-only/SKILL.md
GENERATED: .hermes/skills/gstack-skillify/SKILL.md
GENERATED: .hermes/skills/gstack-sync-gbrain/SKILL.md
GENERATED: .hermes/skills/gstack-setup-browser-cookies/SKILL.md
GENERATED: .hermes/skills/gstack-ios-fix/SKILL.md
GENERATED: .hermes/skills/gstack-ios-clean/SKILL.md
GENERATED: .hermes/skills/gstack-setup-gbrain/SKILL.md
GENERATED: .hermes/skills/gstack-document-generate/SKILL.md
GENERATED: .hermes/skills/gstack-review/SKILL.md
GENERATED: .hermes/skills/gstack-plan-ceo-review/SKILL.md
GENERATED: .hermes/skills/gstack-office-hours/SKILL.md
GENERATED: .hermes/skills/gstack-landing-report/SKILL.md
GENERATED: .hermes/skills/gstack-retro/SKILL.md
GENERATED: .hermes/skills/gstack-ios-design-review/SKILL.md
GENERATED: .hermes/skills/gstack-devex-review/SKILL.md
GENERATED: .hermes/skills/gstack-benchmark-models/SKILL.md
GENERATED: .hermes/skills/gstack-plan-devex-review/SKILL.md
GENERATED: .hermes/skills/gstack-ios-sync/SKILL.md
GENERATED: .hermes/skills/gstack-browse/SKILL.md
GENERATED: .hermes/skills/gstack-design-review/SKILL.md
GENERATED: .hermes/skills/gstack-ship/SKILL.md
GENERATED: .hermes/skills/gstack-plan-eng-review/SKILL.md
GENERATED: .hermes/skills/gstack-guard/SKILL.md
GENERATED: .hermes/skills/gstack-make-pdf/SKILL.md
GENERATED: .hermes/skills/gstack-unfreeze/SKILL.md
GENERATED: .hermes/skills/gstack-context-save/SKILL.md
GENERATED: .hermes/skills/gstack-setup-deploy/SKILL.md

Token Budget (hermes host)
════════════════════════════════════════════════════════════
  .hermes/skills/gstack-spec      2264 lines  ~ 27620 tokens
  .hermes/skills/gstack-land-and-deploy  1865 lines  ~ 22994 tokens
  .hermes/skills/gstack-design-review  1824 lines  ~ 22753 tokens
  .hermes/skills/gstack-autoplan  1789 lines  ~ 22675 tokens
  .hermes/skills/gstack-setup-gbrain  1780 lines  ~ 20544 tokens
  .hermes/skills/gstack-retro     1771 lines  ~ 20959 tokens
  .hermes/skills/gstack-ship      1756 lines  ~ 21113 tokens
  .hermes/skills/gstack-plan-eng-review  1746 lines  ~ 25547 tokens
  .hermes/skills/gstack-plan-devex-review  1724 lines  ~ 21115 tokens
  .hermes/skills/gstack-office-hours  1685 lines  ~ 21921 tokens
  .hermes/skills/gstack-qa        1644 lines  ~ 18909 tokens
  .hermes/skills/gstack-plan-design-review  1549 lines  ~ 21335 tokens
  .hermes/skills/gstack-design-consultation  1513 lines  ~ 19304 tokens
  .hermes/skills/gstack-cso       1494 lines  ~ 19978 tokens
  .hermes/skills/gstack-design-html  1455 lines  ~ 16968 tokens
  .hermes/skills/gstack-review    1440 lines  ~ 19123 tokens
  .hermes/skills/gstack-plan-ceo-review  1401 lines  ~ 21459 tokens
  .hermes/skills/gstack-plan-tune  1355 lines  ~ 16066 tokens
  .hermes/skills/gstack-design-shotgun  1300 lines  ~ 15877 tokens
  .hermes/skills/gstack-document-release  1251 lines  ~ 15030 tokens
  .hermes/skills/gstack-devex-review  1239 lines  ~ 16402 tokens
  .hermes/skills/gstack-qa-only   1202 lines  ~ 14389 tokens
  .hermes/skills/gstack-document-generate  1194 lines  ~ 13759 tokens
  .hermes/skills/gstack-skillify  1179 lines  ~ 13718 tokens
  .hermes/skills/gstack-claude    1101 lines  ~ 12305 tokens
  .hermes/skills/gstack-sync-gbrain  1080 lines  ~ 13490 tokens
  .hermes/skills/gstack-health    1021 lines  ~ 12324 tokens
  .hermes/skills/gstack-pair-agent  1020 lines  ~ 12089 tokens
  .hermes/skills/gstack-investigate  1017 lines  ~ 12963 tokens
  .hermes/skills/gstack-canary     999 lines  ~ 12067 tokens
  .hermes/skills/gstack            988 lines  ~ 12337 tokens
  .hermes/skills/gstack-context-save   974 lines  ~ 11590 tokens
  .hermes/skills/gstack-open-gstack-browser   965 lines  ~ 11883 tokens
  .hermes/skills/gstack-browse     936 lines  ~ 12198 tokens
  .hermes/skills/gstack-ios-qa     935 lines  ~ 12060 tokens
  .hermes/skills/gstack-setup-deploy   926 lines  ~ 11320 tokens
  .hermes/skills/gstack-learn      898 lines  ~ 10784 tokens
  .hermes/skills/gstack-scrape     897 lines  ~ 11258 tokens
  .hermes/skills/gstack-landing-report   885 lines  ~ 11094 tokens
  .hermes/skills/gstack-context-restore   855 lines  ~ 10678 tokens
  .hermes/skills/gstack-ios-design-review   823 lines  ~ 10761 tokens
  .hermes/skills/gstack-ios-clean   821 lines  ~ 10608 tokens
  .hermes/skills/gstack-ios-fix    817 lines  ~ 10539 tokens
  .hermes/skills/gstack-ios-sync   811 lines  ~ 10528 tokens
  .hermes/skills/gstack-benchmark   751 lines  ~  8358 tokens
  .hermes/skills/gstack-make-pdf   675 lines  ~  7635 tokens
  .hermes/skills/gstack-benchmark-models   627 lines  ~  7488 tokens
  .hermes/skills/gstack-setup-browser-cookies   602 lines  ~  6820 tokens
  .hermes/skills/gstack-upgrade    282 lines  ~  2891 tokens
  .hermes/skills/gstack-freeze      69 lines  ~   747 tokens
  .hermes/skills/gstack-guard       64 lines  ~   762 tokens
  .hermes/skills/gstack-careful     51 lines  ~   643 tokens
  .hermes/skills/gstack-unfreeze    38 lines  ~   336 tokens
────────────────────────────────────────────────────────────
  TOTAL                          59348 lines  ~738114 tokens

GENERATED: .gbrain/skills/gstack/SKILL.md
GENERATED: .gbrain/skills/gstack-pair-agent/SKILL.md
GENERATED: .gbrain/skills/gstack-benchmark/SKILL.md
GENERATED: .gbrain/skills/gstack-design-html/SKILL.md
GENERATED: .gbrain/skills/gstack-plan-tune/SKILL.md
GENERATED: .gbrain/skills/gstack-design-shotgun/SKILL.md
GENERATED: .gbrain/skills/gstack-plan-design-review/SKILL.md
GENERATED: .gbrain/skills/gstack-autoplan/SKILL.md
GENERATED: .gbrain/skills/gstack-design-consultation/SKILL.md
GENERATED: .gbrain/skills/gstack-learn/SKILL.md
GENERATED: .gbrain/skills/gstack-freeze/SKILL.md
GENERATED: .gbrain/skills/gstack-ios-qa/SKILL.md
GENERATED: .gbrain/skills/gstack-careful/SKILL.md
GENERATED: .gbrain/skills/gstack-cso/SKILL.md
GENERATED: .gbrain/skills/gstack-canary/SKILL.md
GENERATED: .gbrain/skills/gstack-open-gstack-browser/SKILL.md
GENERATED: .gbrain/skills/gstack-investigate/SKILL.md
GENERATED: .gbrain/skills/gstack-context-restore/SKILL.md
GENERATED: .gbrain/skills/gstack-claude/SKILL.md
GENERATED: .gbrain/skills/gstack-document-release/SKILL.md
GENERATED: .gbrain/skills/gstack-health/SKILL.md
GENERATED: .gbrain/skills/gstack-upgrade/SKILL.md
GENERATED: .gbrain/skills/gstack-land-and-deploy/SKILL.md
GENERATED: .gbrain/skills/gstack-spec/SKILL.md
GENERATED: .gbrain/skills/gstack-qa/SKILL.md
GENERATED: .gbrain/skills/gstack-scrape/SKILL.md
GENERATED: .gbrain/skills/gstack-qa-only/SKILL.md
GENERATED: .gbrain/skills/gstack-skillify/SKILL.md
GENERATED: .gbrain/skills/gstack-sync-gbrain/SKILL.md
GENERATED: .gbrain/skills/gstack-setup-browser-cookies/SKILL.md
GENERATED: .gbrain/skills/gstack-ios-fix/SKILL.md
GENERATED: .gbrain/skills/gstack-ios-clean/SKILL.md
GENERATED: .gbrain/skills/gstack-setup-gbrain/SKILL.md
GENERATED: .gbrain/skills/gstack-document-generate/SKILL.md
GENERATED: .gbrain/skills/gstack-review/SKILL.md
GENERATED: .gbrain/skills/gstack-plan-ceo-review/SKILL.md
GENERATED: .gbrain/skills/gstack-office-hours/SKILL.md
GENERATED: .gbrain/skills/gstack-landing-report/SKILL.md
GENERATED: .gbrain/skills/gstack-retro/SKILL.md
GENERATED: .gbrain/skills/gstack-ios-design-review/SKILL.md
GENERATED: .gbrain/skills/gstack-devex-review/SKILL.md
GENERATED: .gbrain/skills/gstack-benchmark-models/SKILL.md
GENERATED: .gbrain/skills/gstack-plan-devex-review/SKILL.md
GENERATED: .gbrain/skills/gstack-ios-sync/SKILL.md
GENERATED: .gbrain/skills/gstack-browse/SKILL.md
GENERATED: .gbrain/skills/gstack-design-review/SKILL.md
GENERATED: .gbrain/skills/gstack-ship/SKILL.md
GENERATED: .gbrain/skills/gstack-plan-eng-review/SKILL.md
GENERATED: .gbrain/skills/gstack-guard/SKILL.md
GENERATED: .gbrain/skills/gstack-make-pdf/SKILL.md
GENERATED: .gbrain/skills/gstack-unfreeze/SKILL.md
GENERATED: .gbrain/skills/gstack-context-save/SKILL.md
GENERATED: .gbrain/skills/gstack-setup-deploy/SKILL.md

Token Budget (gbrain host)
════════════════════════════════════════════════════════════
  .gbrain/skills/gstack-spec      2271 lines  ~ 27660 tokens
  .gbrain/skills/gstack-land-and-deploy  1869 lines  ~ 23011 tokens
  .gbrain/skills/gstack-design-review  1828 lines  ~ 22769 tokens
  .gbrain/skills/gstack-autoplan  1793 lines  ~ 22693 tokens
  .gbrain/skills/gstack-setup-gbrain  1786 lines  ~ 20569 tokens
  .gbrain/skills/gstack-retro     1775 lines  ~ 20976 tokens
  .gbrain/skills/gstack-ship      1761 lines  ~ 21131 tokens
  .gbrain/skills/gstack-plan-eng-review  1750 lines  ~ 25565 tokens
  .gbrain/skills/gstack-plan-devex-review  1728 lines  ~ 21137 tokens
  .gbrain/skills/gstack-office-hours  1690 lines  ~ 21946 tokens
  .gbrain/skills/gstack-qa        1648 lines  ~ 18924 tokens
  .gbrain/skills/gstack-plan-design-review  1553 lines  ~ 21351 tokens
  .gbrain/skills/gstack-design-consultation  1517 lines  ~ 19320 tokens
  .gbrain/skills/gstack-cso       1498 lines  ~ 19997 tokens
  .gbrain/skills/gstack-design-html  1459 lines  ~ 16982 tokens
  .gbrain/skills/gstack-review    1445 lines  ~ 19144 tokens
  .gbrain/skills/gstack-plan-ceo-review  1406 lines  ~ 21481 tokens
  .gbrain/skills/gstack-plan-tune  1363 lines  ~ 16107 tokens
  .gbrain/skills/gstack-design-shotgun  1304 lines  ~ 15900 tokens
  .gbrain/skills/gstack-document-release  1255 lines  ~ 15048 tokens
  .gbrain/skills/gstack-devex-review  1243 lines  ~ 16422 tokens
  .gbrain/skills/gstack-qa-only   1206 lines  ~ 14406 tokens
  .gbrain/skills/gstack-document-generate  1202 lines  ~ 13802 tokens
  .gbrain/skills/gstack-skillify  1184 lines  ~ 13741 tokens
  .gbrain/skills/gstack-claude    1105 lines  ~ 12321 tokens
  .gbrain/skills/gstack-sync-gbrain  1085 lines  ~ 13510 tokens
  .gbrain/skills/gstack-health    1025 lines  ~ 12344 tokens
  .gbrain/skills/gstack-pair-agent  1024 lines  ~ 12108 tokens
  .gbrain/skills/gstack-investigate  1023 lines  ~ 12992 tokens
  .gbrain/skills/gstack-canary    1003 lines  ~ 12089 tokens
  .gbrain/skills/gstack            993 lines  ~ 12359 tokens
  .gbrain/skills/gstack-context-save   979 lines  ~ 11609 tokens
  .gbrain/skills/gstack-open-gstack-browser   969 lines  ~ 11902 tokens
  .gbrain/skills/gstack-ios-qa     941 lines  ~ 12088 tokens
  .gbrain/skills/gstack-browse     940 lines  ~ 12215 tokens
  .gbrain/skills/gstack-setup-deploy   930 lines  ~ 11339 tokens
  .gbrain/skills/gstack-scrape     903 lines  ~ 11282 tokens
  .gbrain/skills/gstack-learn      902 lines  ~ 10805 tokens
  .gbrain/skills/gstack-landing-report   891 lines  ~ 11123 tokens
  .gbrain/skills/gstack-context-restore   861 lines  ~ 10708 tokens
  .gbrain/skills/gstack-ios-design-review   827 lines  ~ 10784 tokens
  .gbrain/skills/gstack-ios-clean   825 lines  ~ 10634 tokens
  .gbrain/skills/gstack-ios-fix    821 lines  ~ 10559 tokens
  .gbrain/skills/gstack-ios-sync   815 lines  ~ 10556 tokens
  .gbrain/skills/gstack-benchmark   755 lines  ~  8381 tokens
  .gbrain/skills/gstack-make-pdf   680 lines  ~  7654 tokens
  .gbrain/skills/gstack-benchmark-models   632 lines  ~  7520 tokens
  .gbrain/skills/gstack-setup-browser-cookies   606 lines  ~  6843 tokens
  .gbrain/skills/gstack-upgrade    286 lines  ~  2910 tokens
  .gbrain/skills/gstack-freeze      73 lines  ~   769 tokens
  .gbrain/skills/gstack-guard       68 lines  ~   781 tokens
  .gbrain/skills/gstack-careful     55 lines  ~   660 tokens
  .gbrain/skills/gstack-unfreeze    42 lines  ~   357 tokens
────────────────────────────────────────────────────────────
  TOTAL                          59593 lines  ~739284 tokens


Note: skill_prefix is true. Run gstack-relink to re-apply name: patches.
[gen-llms-txt] gstack/llms.txt: 54 skills, 76 browse commands
   [6ms]  bundle  8 modules
 [102ms] compile  browse/dist/browse
   [3ms]  bundle  1 modules
  [81ms] compile  browse/dist/find-browse
   [5ms]  bundle  19 modules
  [82ms] compile  design/dist/design
   [6ms]  bundle  11 modules
  [80ms] compile  make-pdf/dist/pdf
   [7ms]  bundle  1 modules
  [81ms] compile  bin/gstack-global-discover
Building Node-compatible server bundle...
Bundled 110 modules in 64ms

  server-node.mjs  0.81 MB  (entry point)

Node server bundle ready: /Users/TJ/hermes-workspace/Lex-Workspace/.worktrees/gstack-sync-safety-v3/browse/dist/server-node.mjs
