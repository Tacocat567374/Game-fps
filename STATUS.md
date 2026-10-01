# Current Status

Primary branch: `main`

## Current architecture

KillShift runs as a Vite/Three.js project through `src/main.js`.

The original game was largely contained in one very large legacy engine:

`src/legacy/killshift-engine.js`

That file is still present, but it is now transitional.

Several systems have been moved into modules under `src/game/`, including:

- configuration and tuning
- weapons and rarity data
- abilities
- enemies
- maps
- waves
- progression data
- audio metadata
- raw input state
- player movement and stamina

The Movement module is the main example for future runtime modularization.

Movement owns player movement state and behavior while collision/world queries are still provided by the legacy engine as dependencies.

## Current validation

At this handoff point:

- `npm run build` passes
- `npm test` passes 13/13 tests
- basic gameplay smoke testing passed
- jumps, dashes, stamina, firing, weapon switching, and pause/resume were checked

## Next step

The clearest next system to study is collision/physics and the world-query helpers currently used by Movement.

Before moving code, identify:

1. which functions answer collision or world questions
2. which functions actually change player movement
3. which code belongs to Collision/Physics
4. which dependencies Movement should continue receiving from outside

Move one coherent section at a time. Do not rewrite the entire game.
