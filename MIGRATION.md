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

## Modularization Pass 1

The engine still starts through `src/main.js` and keeps runtime state, QA hooks, and save handling in `src/legacy/killshift-engine.js`. Static definitions now live in:

- `src/game/config/tuning.js` — core, player, movement, and combat tuning values.
- `src/game/weapons/catalog.js` — weapon authoring defaults, 70 weapon definitions, and the default loadout.
- `src/game/weapons/rarity-data.js` — rarity tiers, affixes, duplicate values, and weapon-to-rarity mapping.

The weapon and rarity modules use factories so each engine initialization receives fresh mutable objects. Weapon stat initialization, rarity application, save restoration, and runtime behavior still execute in the legacy engine. `npm test` checks the original catalog/rarity data and representative tuning values with Node's built-in runner.

Ability definitions, round modifiers, map configuration, and other static tables remain in the legacy file because they are extended or consumed across runtime systems. A focused second pass can extract the base ability catalog and its later extension together, preserving the mutable catalog identity and save IDs, before touching input or movement behavior.
