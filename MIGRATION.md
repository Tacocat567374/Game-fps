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

At the end of Pass 1, ability definitions, round modifiers, map configuration, and other static tables still lived in the legacy file because they were extended or consumed across runtime systems. Pass 2 extracts the base ability catalog and its later extension together while preserving mutable catalog identity and save IDs.

## Modularization Pass 2

The 33 original ability definitions and six later additions now live together in
src/game/abilities/catalog.js. createAbilityCatalog() appends the six in their
original order and returns fresh mutable definitions for each engine initialization.
The engine still owns ability effects, shop and save behavior, and the existing
runtime corrections to several ability contracts.

tests/fixtures/ability-catalog-baseline.json records the pre-refactor IDs,
insertion order, metadata, and function-hook sources. Node tests compare the
factory to that baseline and exercise representative hooks and unchanged shop
consumers.
