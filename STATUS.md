# Current Status

Integration branch: romel-dev
Working branch: codex/modularize-config-data

## Current architecture

Vite and Three.js load the legacy engine through src/main.js.
Configuration, weapon data, rarity data, and the ability catalog are ES modules.
Runtime gameplay, shop, save, and ability application still live in
src/legacy/killshift-engine.js.

## Current work

Modularization Pass 2 extracts all 39 static ability definitions into a
per-initialization factory. No ability balance or save format changed.

## Recently validated

- Node tests cover catalog order, pre-refactor metadata, all 23 hook sources,
  fresh mutable definitions, representative hooks, shop purchase and modifier
  consumers, and prior static-data/tutorial regressions.
- Vite build succeeds.
- Browser startup, save round-trip, imported save, active-ability selection,
  and Wave 2 resume were observed without console errors.
- Live shop purchase was not reached in the browser; the unchanged engine shop
  functions were exercised in a focused Node harness.

## Next planned work

Keep the next modularization pass small. Inspect a standalone static table such
as round modifiers before extracting any runtime-owned ability or shop logic.
