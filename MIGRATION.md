# Killshift modularization baseline

This branch migrates the working Killshift single-file build into a normal Vite/npm repository without intentionally changing gameplay.

## Source baseline

The migration is based on the latest user-authored working snapshot: `index(20260928-000833).html`.

## Current structure

- `index.html` — game markup only
- `src/main.js` — browser bootstrap and engine-start watchdog
- `src/styles.css` — stylesheet extracted from the monolith
- `src/legacy/killshift-engine.js` — existing game engine preserved as the behavioral baseline
- `package.json` — Vite development/build scripts and Three.js dependency

## Run locally

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite.

## Refactor sequence

The legacy engine stays intentionally large in this baseline. Extract one system at a time while preserving behavior:

1. configuration and tuning
2. weapon catalog and rarity data
3. input and player movement
4. collision and moving platforms
5. maps and world generation
6. enemies and wave director
7. weapons, projectiles, and effects
8. HUD, menus, shop, and save system
9. audio and rendering helpers
10. QA hooks and automated probes

Do not combine system extraction with gameplay balancing in the same change.
