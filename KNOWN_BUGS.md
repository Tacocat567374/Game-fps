# KillShift Known Bugs and Work List

Last audit: 2026-10-01

This file tracks confirmed bugs, suspected problems, testing gaps, and important technical follow-ups.

Do not treat every item in this file as a confirmed gameplay bug.

Audit baseline: `main` at `1d621fd`; audit branch: `codex/known-bugs-audit`. References describe that baseline and will move after future edits. In this report, **engine** means `src/legacy/killshift-engine.js`. This pass changes documentation only and does not treat old findings from another checkout as current defects.

Evidence was collected through existing tests, source inspection, local Vite browser smoke tests, and temporary Node diagnostics invoking the actual movement module and extracted current tutorial functions with controlled dependencies. The diagnostics establish specific state failures; they are not full live tutorial traversal tests. No temporary diagnostics or new framework are committed.

## 1. Priority summary

Severity reflects demonstrated impact: High breaks a major system; Medium is noticeable but has a workaround; Low is minor. No Critical defect was established. Suspected severities estimate potential impact and do not establish a bug. Coverage and architecture items have no severity assigned.

| ID | Severity | Status | System | Short description |
|---|---|---|---|---|
| BUG-001 | High | CONFIRMED | Tutorial/wall-jump | Evidence start condition exceeds the actual cooldown |
| BUG-002 | High | CONFIRMED | Tutorial/grapple | Step captures idle endpoints instead of the fired grapple |
| BUG-003 | High | CONFIRMED | Tutorial/dash | Tutorial advances the burst but never recovers cooldown |
| BUG-004 | Medium | CONFIRMED | Save/menu | Loading from pause retains pause after arena entry |
| BUG-005 | Low | CONFIRMED | HUD/waves | Wave announcement displays an undefined difficulty label |
| SUS-001 | Medium | NEEDS REPRO | Save/ammo | Resume resets restored ammo; intended refill policy unclear |
| SUS-002 | Medium | SUSPECTED | Movement/restart | Reset omits some transient movement fields |
| SUS-003 | Medium | NEEDS REPRO | Combat/clock | Wall-clock action windows may expire during pause |
| TEST-001 | — | TESTING GAP | Tutorial | Full course and tutorial lifecycle |
| TEST-002 | — | TESTING GAP | Movement | Sustained locomotion, stamina and transitions |
| TEST-003 | — | TESTING GAP | Collision/world | Ceilings, thin walls, ledges and platform carry |
| TEST-004 | — | TESTING GAP | Input | Pointer lock, focus/held-state transitions and touch |
| TEST-005 | — | TESTING GAP | Combat | Representative live damage/projectile/special interactions |
| TEST-006 | — | TESTING GAP | Abilities/progression | Live stacking, rewards and save round trips |
| TEST-007 | — | TESTING GAP | Enemies/maps/waves | Later waves, map rotation and recovery |
| TEST-008 | — | TESTING GAP | Audio/deployment | Audible playback and production browser delivery |
| TEST-009 | — | TESTING GAP | Performance/resources | Long-session CPU/GPU and resource lifecycle |
| DEBT-001 | — | TECH DEBT | Collision/world | Movement depends on legacy world ownership |
| DEBT-002 | — | TECH DEBT | Runtime composition | Installer order and API metadata obscure active ownership |
| DEBT-003 | — | TECH DEBT | Tutorial/input | Multiple action/evidence paths lack a shared success contract |
| DEBT-004 | — | TECH DEBT | State/map initialization | Manual state resets and duplicate initial map preparation |
| DEBT-005 | — | TECH DEBT | Audio | External CodeHS asset dependency |
| DEBT-006 | — | TECH DEBT | Tests/build | Narrow integration coverage and large initial bundle |

## 2. Confirmed bugs

### BUG-001 — Wall-jump tutorial evidence never starts

**Severity:** High

**System:** Tutorial / movement

**Status:** CONFIRMED

**Confidence:** High

**What happens**

Step 9, Wall-jump, cannot recognize a successful normal wall jump because its evidence-start condition is unreachable under current movement tuning.

**How to reproduce**

1. Reach the tutorial's `wall` action with fresh step evidence.
2. Perform a valid wall jump and travel at least 0.7 units horizontally.
3. Check whether the mastery gate recorded the jump start. The collected diagnostic called the real `beginWallJump()`, ran current tutorial training, moved the camera one unit, and ran training again.

**Expected**

A genuine wall jump followed by the required travel completes the step. An unsuccessful Space press does not.

**Actual**

The diagnostic returned `jumped: true`, cooldown `0.18`, `wallJumpStarted: false`, and verification `false`. The tutorial requires cooldown greater than `0.3`; the successful action sets only `0.18`, and timers reduce it thereafter.

**Evidence**

- `src/game/config/tuning.js:71`: `WALL_JUMP_COOLDOWN = 0.18`.
- `src/game/movement/movement-controller.js:464`, `beginWallJump()`, sets that cooldown at line 495.
- `engine:24004`, `tutorialMasteryTraining()`, requires cooldown greater than `0.3` before setting `wallJumpStarted`.
- `engine:23903`, `verifyAction('wall')`, requires that flag plus 0.7 units of travel. The later legacy training callback still goes through the mastery gate; it does not bypass this requirement.

**Likely cause — analysis**

Tutorial mastery infers execution success from a cooldown threshold inconsistent with the movement constant.

**Suggested next step**

Record evidence from successful wall-jump execution, following the already-fixed normal-jump approach. Preserve the distance requirement and movement values.

**How to verify a future fix**

A real wall jump with sufficient travel completes Step 9; failed presses do not. Verify unchanged wall-jump velocity/cooldown and run existing normal-jump tests.

### BUG-002 — Grapple tutorial captures idle endpoints

**Severity:** High

**System:** Tutorial / grapple

**Status:** CONFIRMED

**Confidence:** High

**What happens**

Fresh grapple-step evidence clones idle zero vectors. Firing updates the actual grapple, but the evidence retains its previous vectors. The fresh-step observation condition cannot become true. Earlier grapple use can similarly leave stale evidence, but the deterministic proof here concerns the fresh idle case.

**How to reproduce**

1. Enter the `grapple` action before any grapple has fired and reset step evidence.
2. Fire at a valid anchor, then move toward it.
3. Compare captured evidence with the fired endpoint. The collected diagnostic used an actual origin `(0, 1.7, 0)`, target `(10, 1.7, 0)`, and camera position `(8, 1.7, 0)` after travel.

**Expected**

Evidence uses the successfully fired grapple's origin/target and recognizes the required traversal.

**Actual**

The actual target was `[10, 1.7, 0]`, but captured target remained `[0, 0, 0]`; observation and verification stayed false. With both captured vectors zero, initial distance falls back to 1. The observation requires a nonnegative current distance to be less than `1 - 2`, which is impossible.

**Evidence**

- `engine:16829`, `playerGrapple`, initializes idle `start` and `point` vectors.
- `engine:23845`, `resetEvidence()`, clones them before an action succeeds.
- `engine:24023`, `tutorialMasteryTraining()`, refreshes endpoint evidence only when its references are falsy. Cloned zero vectors are truthy. Lines 24030–24034 calculate progress/observation.
- `engine:17081` and `engine:17087`, `grappleFire()`, update the real target/start. The notification at line 17108 calls `tutorialRegisterGrapple()`, which goes through the mastery gate.
- `engine:23907`, `verifyAction('grapple')`, requires observation and progress of at least 0.30.

**Likely cause — analysis**

Vector existence is treated as evidence of an active grapple; cloning detaches step evidence from later endpoint updates.

**Suggested next step**

Capture the endpoints of a successful grapple for the current step and invalidate them on step reset. Do not accept raw G input or change grapple physics.

**How to verify a future fix**

Test first-ever grapple traversal, a failed shot, a grapple fired before the step, and back/re-entry. Only genuine traversal toward the current anchor should advance the step.

### BUG-003 — Tutorial dash cooldown never recovers

**Severity:** High

**System:** Tutorial / dash timer

**Status:** CONFIRMED

**Confidence:** High

**What happens**

After one tutorial dash, later dashes are rejected while tutorial mode remains active. A blocked or early attempt cannot be retried normally to meet Step 7's distance requirement.

**How to reproduce**

1. Start a grounded dash with tutorial mode active and adequate stamina.
2. Run ordinary tutorial simulation for two seconds.
3. Attempt another dash. For a live failure case, make the first attempt near an obstacle so it does not meet the required traversal distance.

**Expected**

Both burst and cooldown advance; another dash is possible after the configured cooldown and stamina recovery.

**Actual**

The diagnostic used actual `movement30ParkourTimers()` and module methods for 120 frames at 1/60 second: first dash succeeded, active time reached zero, cooldown remained `0.52`, and the second attempt returned false.

**Evidence**

- `src/game/movement/movement-controller.js:834`, `startDash()`, rejects positive cooldown and sets it at line 886.
- Same module at line 1187, `updateDashCooldown()`, owns decrement.
- `engine:17662`, `updateUltimate()`, calls that decrement. `ultimateLoop()` at line 17727 skips the update while the tutorial is active.
- `engine:22145`, `movement30ParkourTimers()`, supplies tutorial `updateDash(dt, true)` but does not supply cooldown progression.
- `engine:23899`, `verifyAction('dash')`, requires 2.5 units of travel.

**Likely cause — analysis**

The tutorial-specific continuation driver does not replace the cooldown driver suppressed by the Ultimate-loop guard.

**Suggested next step**

Give tutorial cooldown progression one explicit owner. Preserve burst distance, duration, stamina and collision behavior.

**How to verify a future fix**

Two spaced tutorial dashes succeed, and a blocked first attempt is retryable. Ordinary gameplay must not decrement cooldown twice or change its separate initial burst.

### BUG-004 — Loading from pause retains the pause overlay after arena entry

**Severity:** Medium

**System:** Save / menu state

**Status:** CONFIRMED

**Confidence:** High

**What happens**

Loading through pause opens the loadout without clearing pause. ENTER ARENA closes the loadout while retaining the previous pause state. The new run remains paused; pressing Resume provides a workaround. This is separate from the ambiguous ammunition refill in SUS-001.

**How to reproduce**

1. Enter gameplay, press Escape, and save through the pause menu.
2. Click LOAD GAME, then ENTER ARENA in the loaded game's loadout.
3. Observe the remaining PAUSED panel and active pause state.

**Expected**

Load/continue transitions establish a coherent overlay state. Arena entry should not retain a previous pause overlay underneath the loadout.

**Actual**

The collected browser smoke test showed pause across load/continue. A read-only DOM check after ENTER ARENA returned `pauseShown: true` and `loadoutShown: false`. The active pause class is an explicit simulation-pause condition.

**Evidence**

- `engine:762`, `loadGame()`, calls `applySaveData()`.
- `engine:741`, load application calls `showLoadout('start')`.
- `engine:16299`, `showLoadout()`, shows death/loadout and clears ability selection, but not pause.
- Continue at `engine:16313` and reset in `newGame()` at line 16408 do not clear pause.
- `engine:3604`, `isGameplaySimulationPaused()`, reads the pause class. Main `loop()` at line 17403 honors it.

**Likely cause — analysis**

These transitions update individual overlays without clearing the previous gameplay mode's pause state.

**Suggested next step**

Correct the specific load/continue transition without redesigning all menu handling.

**How to verify a future fix**

Load from pause and from start/death interfaces. Verify the correct panel, resumed simulation, normal pause/resume, settings behavior and input suppression while loadout is open.

### BUG-005 — Wave announcement displays undefined difficulty

**Severity:** Low

**System:** HUD / encounter director

**Status:** CONFIRMED

**Confidence:** High

**What happens**

Wave 1 displays `WAVE 1 — THREAT 9 | undefined`. This was directly observed in ordinary and QA gameplay.

**How to reproduce**

1. Enter non-tutorial Wave 1 with the default Operator difficulty.
2. Read the initial wave announcement in the killfeed.

**Expected**

Display the selected difficulty label or deliberately omit the label field.

**Actual**

The field contains the literal string `undefined`.

**Evidence**

- `engine:23393`, `DIFF_TUNING`, defines numeric tuning objects with no `name` member.
- `engine:23428`, `getDiffTuning()`, returns those objects.
- `engine:23680`, `difficultyDirectedStartWave()`, interpolates `getDiffTuning().name`.

**Likely cause — analysis**

Presentation expects a property absent from the tuning object's contract.

**Suggested next step**

Use existing difficulty display metadata or a label for the current difficulty ID; preserve numeric tuning.

**How to verify a future fix**

Check Recruit, Operator, Nightmare and fallback labels while retaining the same threat values.

## 3. Suspected issues / needs reproduction

### SUS-001 — Restored ammo is refilled on arena entry; intent unclear

- **System/status:** Save / ammunition; NEEDS REPRO.
- **Collected observation:** Browser save/load restored shotgun `5/48`; ENTER ARENA changed its slot to `6/48`.
- **Why this is not confirmed as a bug:** `newGame()` explicitly initializes weapon stats and resets ammo for arena entry. The same path is used for fresh/loadout continuation. Serializing/restoring ammo suggests a possible resume mismatch, but does not prove that the subsequent refill is unintended. Existing README/STATUS/MIGRATION documents do not establish a saved-ammo continuation contract.
- **Source:** `engine:493`, `createSaveData()`; `engine:643`, `applySaveData()`, with restoration after its reset at line 711; continue handler calls deferred `newGame()` at line 16333; `newGame()` calls `resetAmmo()` at line 16553; reset implementation at line 7044 initializes loadout entries from weapon defaults.
- **Needed next:** Establish whether ENTER ARENA starts a fresh combat attempt with an intentional refill or resumes exact ammunition. Compare fresh entry, death/loadout continuation and loaded-run continuation with that policy. Change classification only if a documented or agreed expected behavior is violated. Do not remove the refill solely because the observed numbers differ.

### SUS-002 — Some transient movement fields are not reset explicitly

- **System/status:** Movement / restart; SUSPECTED.
- **Observation:** `newGame()` resets many module-owned fields but omits dash active time/cooldown/speed/direction and some grace fields initialized by `createMovementState()`.
- **Why suspicious:** A transition during a burst could retain movement or temporarily reject an action. Dead-player cleanup in `updateDashCooldown()` can prevent some variants; omitted assignments alone do not establish unwanted behavior.
- **Source:** `engine:16408`, `newGame()`; `src/game/movement/movement-state.js`; controller lines 1187–1202.
- **Reproduction needed:** Controlled death/restart and load/continue at different dash offsets. Compare state and actual motion/action acceptance with a fresh run; repeat tutorial transitions before declaring a bug.

### SUS-003 — Wall-clock windows may expire while gameplay is paused

- **System/status:** Combat / timer policy; NEEDS REPRO.
- **Observation:** Simulation pauses explicitly, but parry expiry, pad launch deadlines and grapple takedown timing use `performance.now()`.
- **Why suspicious:** Windows can elapse during pause while the action itself is frozen. Some may intentionally use real time; no pause-at-impact fixture was completed.
- **Source:** `engine:11217`, `beginParrySwing()` and `tryParryBullet()`; `updateJumpPads()` at line 16725 with deadlines at lines 16748/16801; takedown timestamps near lines 19968/20078; main loop at line 17403.
- **Reproduction needed:** Pause midway through each action, wait beyond its window, resume and compare with a control. Define expected timing policy and distinguish gameplay deadlines from decorative animation before changing clocks.

## 4. Testing gaps

These are missing or insufficient checks, not assertions that behavior is broken.

### TEST-001 — Full live tutorial and lifecycle

`tests/tutorial-jump.test.js` covers Steps 1–3, normal/coyote Jump and invalid Jump actions. It does not cover the live course through Steps 5–21, back/skip/re-entry, death, pause during auto-advance or cleanup. Relevant source: tutorial definitions at `engine:15656`, mastery functions near line 23825. Live Step 1 appeared on a fresh origin; pointer lock prevented full traversal.

### TEST-002 — Sustained movement and transitions

The existing Jump tests and QA jump/dash smoke do not verify sustained sprint/exhaustion/recovery, slide/vault, climb/wall-run, mantle, air jump, ground pound, blocked movement or exit momentum across lifecycle/frame-rate changes. Relevant files: `src/game/movement/movement-controller.js`, `movement-state.js`; engine adapter near line 309 and locomotion call at line 17347. Older repair probes from another checkout are not part of this repository's `npm test`.

### TEST-003 — Collision and moving-world boundary

No current automated coverage establishes thin-wall high-speed behavior, ceiling ascent, corners/ledges, mantle occupancy, wall-run contact loss, landing transitions or platform carry into ceilings/walls. Relevant engine helpers: `canMoveTo()` at line 6298, `getWallContact()` at line 6345, penetration/movement at lines 6959/6970, final overrides near line 21740 and moving-platform carry near line 19659. Use controlled geometry before the planned collision extraction; safeguards in source do not prove full correctness or a present failure.

### TEST-004 — Real browser input transitions

`src/game/input/input-state.js` owns raw state; engine listeners/gates still execute actions. Test held keys/buttons and ADS across pause, settings, death, blur and lock transitions, plus actual touch cancellation and mobile sprint release. Reset paths include `engine:7395` and `engine:23027`. Real pointer-lock capture/recapture and mobile multi-touch were not exercised.

### TEST-005 — Representative live combat

Catalog/hook tests do not establish integrated hitscan/projectile damage, crit/headshot, piercing, melee/parry, rarity or special weapon interactions. This audit fired a shotgun and initiated reload before pause; reload completion and damage outcomes were not established. Source: `fire()` at `engine:11779`, `reload()` at line 7578, enemy model hits at line 13411, closest-hit records at line 13622 and `updateProjectiles()` at line 13727. Add focused enemy-before-wall/wall-before-enemy cases before claiming projectile regressions.

### TEST-006 — Ability/progression persistence and effects

`tests/ability-catalog.test.js` and `ability-runtime.test.js` verify authored hooks and representative purchase/selection behavior. They do not run every live stacked hook, temporary effects through pause, challenge/achievement rewards, or real enemy reward/save round trips. Source: `src/game/abilities/catalog.js`, live installer at `engine:24128`, Economy API near line 25602 and save application at line 643. The repaired enemy Gold Rush path explicitly passes its stack count at line 9886; the old scope crash is not reported as current.

### TEST-007 — Later encounters and all maps

Wave 1 spawned hostiles without an exception. Long wave completion, all 36 map spawn/hazard combinations, five-wave rotation, ranged orbit/retreat, climb/jump/descent, unreachable-enemy recovery, airdrop carry and modifier combinations were not exercised. Source: `enemyUpdate()` at `engine:9202`, final AI near line 22170, effective step at line 22865, encounter director near line 23393 and `prepareForRound()` at line 19484; static maps/enemy modules under `src/game/`.

### TEST-008 — Audio and production delivery

Audible playback, mute/music lifecycle, offline behavior, autoplay policy, production Pages network/console and cross-browser behavior were not established. Source: `src/game/audio/sound-files.js`, engine audio near lines 1319/1698, `vite.config.js`, `.github/workflows/deploy-pages.yml` and `src/main.js`. Local `/Game-fps/` startup and build work; this does not verify production delivery or remote workflow execution.

### TEST-009 — Resource lifecycle and performance

No CPU/GPU profiles, heap snapshots, repeated-map memory counts or effect-storm budgets were collected. Disposal exists at `engine:6667` and round resource ownership cleanup at line 18901; active explosion decoration is bounded in the implementation beginning at line 12764. Do not repeat the former blanket resource-leak claim. Profile shared resources, textures, delayed callbacks, retained scene roots and stable `renderer.info.memory` across transitions. Alleged leaks or hot-path bottlenecks remain **NEEDS PROFILING**.

## 5. Technical debt / architecture follow-ups

### DEBT-001 — Collision/world remain legacy-owned

The movement controller receives collision/query helpers, world/camera references and effects through the adapter near `engine:309`. Geometry, platforms, spawns and collision overrides still share the large engine closure. This limits isolated fixtures and ownership clarity. Extract the collision/query boundary in a behavior-preserving pass, without combining it with procedural-map or balance changes.

### DEBT-002 — Installer order and public metadata obscure active contracts

The engine retains overlapping movement/AI/ability/architecture/performance installers; later assignments determine active implementations. The outside-scope Performance 12.0 installer near line 25720 correctly declines installation when engine-local functions are inaccessible; dormancy alone is not a gameplay bug. Economy exports a wave reward helper with no caller, and several ledger fields/architecture flags describe broader integration than the observed record sites at lines 9897–9898. Establish and document those API contracts before assuming a player is owed missing rewards or activating an entire patch bundle.

### DEBT-003 — Tutorial success recognition has multiple owners

Base training/input near `engine:16125`, action handlers and mastery wrapping near line 23884 all participate in recognition. Normal Jump has a tested execution-success contract, whereas other steps infer success from timers/positions. Introduce consistent success evidence incrementally after the focused fixes; preserve public/QA hooks and avoid a wholesale tutorial rewrite.

### DEBT-004 — Initialization manually coordinates module state and maps

`newGame()` at `engine:16408` reaches into module-owned movement state field by field. A narrowly defined fresh-run/resume reset contract would reduce omissions without changing progression policy. Initial non-tutorial entry also prepares a round-1 map twice: deferred initialization at line 16575 and `startWave()` at line 8106 both call `prepareForRound()` at line 19484, which resets/builds on each round-1 call. The browser observed `MAP 1: MILL DISTRICT` then `MAP 1: SKYBRIDGE` on one loaded-run entry. This is established redundant setup/announcement, but no gameplay failure or measured frame-time impact was demonstrated; it is not counted as a confirmed gameplay bug. Review initialization ownership separately from collision or procedural-map extraction.

### DEBT-005 — External audio asset hosting

`src/game/audio/sound-files.js` references CodeHS upload URLs. Build success does not establish availability, cross-origin behavior or offline access. Record provenance and consider appropriately licensed bundled assets in a separate task. No failed sound asset was confirmed.

### DEBT-006 — Narrow integration tests and large initial bundle

Extracted-function/metadata tests provide useful focused assertions but cannot cover installer order, real listeners, scene ownership or deployment. `src/main.js` statically loads the legacy engine; Vite produces about 869 kB minified JavaScript and warns about chunk size. Add small runtime checks at actual module boundaries as extraction proceeds. Delivery splitting is a future optimization, not evidence of a frame-rate bug; this audit adds no infrastructure.

## 6. Suggested work order

1. **BUG-001:** fix wall-jump tutorial success evidence first. The deterministic blocker has a narrow repair boundary and does not require movement tuning changes. Run existing Jump tests alongside the focused check.
2. **BUG-003:** restore tutorial dash cooldown/retryability with one timer owner. Verify blocked attempts and unchanged ordinary dash timing.
3. **BUG-002:** bind grapple evidence to the successful action, then complete the live tutorial on a normal desktop browser. Keep these repairs independently reviewable.
4. **BUG-004:** correct pause/load overlay ownership with a small transition fix; test pause/start/death load paths. Resolve SUS-001's intended ammo policy before changing any refill behavior.
5. Reproduce movement-reset SUS-002 and cover TEST-002–004 before collision modularization. Fix only demonstrated failures.
6. **BUG-005:** correct difficulty presentation without changing threat or tuning. Review duplicate initial map preparation as a separate initialization follow-up.
7. Establish timing/API contracts and cover representative combat, abilities, saves, later enemies/waves and hazards (SUS-003; TEST-005–007).
8. Validate audio/deployment and gather performance/resource profiles (TEST-008–009). Keep architecture extraction, asset work, gameplay fixes and balance changes separate.

## 7. Testing limitations and validation

- `npm.cmd test`: **13/13 passed** during evidence collection and final validation. Covers static data, ability hooks/purchase/selection and the fixed normal/coyote Jump tutorial path; it does not contradict the independently demonstrated wall/grapple/dash failures.
- `npm.cmd run build`: **passed** during evidence collection and final validation, 20 modules transformed. Approximately 869 kB minified JavaScript; chunk-size warning only. No import/build failure.
- `git diff --check` and `git diff --cached --check`: passed for the completed report before commit. Working-tree and staged diff inspection confirmed that only `KNOWN_BUGS.md` changed.
- Browser smoke: startup/menu/loadout, fresh Step 1, Wave 1, QA jump/air dash, switching, shotgun firing, pause and save/load. The save fixture directly established pause-overlay retention. Ammo refill was observed but its intent remains unresolved.
- No initialization/import errors were observed. The fresh-origin tutorial generated a PointerLockControls error when the embedded browser denied lock and showed `MOUSE LOOK UNAVAILABLE`. **This is an environment limitation, not a KillShift bug.** QA mode allowed limited keyboard/action smoke testing, not realistic pointer-lock or touch verification.
- Full tutorial traversal, live wall/grapple training, sustained parkour/collision, representative damage, later-wave/map runs, audio audibility, production hosting, mobile/cross-browser behavior and long-session profiling remain untested or incompletely tested. Temporary diagnostics used controlled dependencies; only their explicitly listed state conclusions are confirmed.
- Final categories: **5 confirmed bugs, 3 suspected/needs-reproduction issues, 9 testing gaps, 6 technical-debt items.** Within the three uncertain issues, one is SUSPECTED and two are NEEDS REPRO.
