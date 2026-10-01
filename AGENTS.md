# Game-fps Codex Instructions

## Repository

Browser FPS / Killshift.

Primary branch: `main`.

Treat `main` as the current known-good version of the game.

## Before making changes

Always:

1. Run `git status`.
2. Confirm the current branch.
3. Inspect `MIGRATION.md`.
4. Inspect `STATUS.md` if present.
5. Read the relevant source before editing.
6. Identify existing tests or QA probes covering the affected system.

For substantial or risky work, create a child branch from `main`.

## Development philosophy

Preserve behavior during refactors.

Do not combine:
- structural refactoring
- gameplay balancing
- unrelated cleanup

unless explicitly requested.

Prefer small, reviewable changes.

Do not remove unusual globals, compatibility code, debug hooks, or QA interfaces without determining whether they are externally depended upon.

## Current migration state

The original application was a monolithic ~33,000-line HTML game.

The current structure includes:

- `index.html`
- `src/main.js`
- `src/styles.css`
- `src/legacy/killshift-engine.js`

The legacy engine is intentionally preserved as the behavioral baseline while systems are extracted incrementally.

## Modularization objective

Progressively extract logical systems from `src/legacy/killshift-engine.js`.

Prefer approximately this sequence:

1. static configuration and data
2. input
3. player state
4. movement/parkour
5. collision/physics
6. maps/world
7. weapons/combat
8. enemies/waves
9. pickups/abilities/progression
10. UI/HUD/shop/save
11. effects/audio/render helpers
12. QA compatibility cleanup

Adjust the order when dependency analysis supports a safer sequence.

## Testing

At minimum after changes:

```powershell
npm.cmd run build
```

Run any relevant repository tests/probes.

For behavior-sensitive changes, test the affected gameplay path.

Do not claim success solely because code compiles.

## Git

Keep commits focused.

Before committing:

```powershell
git status
git diff
```

After validation, commit with a descriptive message.

Do not merge automatically.

## Completion report

For every substantial task, report:

- branch
- commit SHA
- files changed
- behavior affected
- validation performed
- validation results
- unresolved risks
- technical debt discovered
- recommended next step
