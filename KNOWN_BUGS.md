# KillShift Bugs and Things to Work On

Last checked: October 1, 2026

This file is a list of things we know are broken, things that might be broken, and things that still need testing.

## Status words

- **BROKEN** — we know this does not work correctly
- **CHECK** — something looks wrong, but we need to test it more
- **TEST** — we have not tested this enough yet
- **LATER** — code cleanup that can wait

---

# Bugs to fix

## BUG-001 — Wall-jump tutorial does not recognize the wall jump

**Status:** BROKEN  
**Priority:** High

The wall-jump tutorial asks the game to detect something that can never happen with the current wall-jump timer.

### What happens

You can perform a real wall jump, but the tutorial may not count it.

### Where to look

```text
src/game/movement/movement-controller.js
src/game/config/tuning.js
src/legacy/killshift-engine.js
```

### Goal

Make the tutorial recognize a successful wall jump without changing how wall jumping actually feels.

---

## BUG-002 — Grapple tutorial watches the wrong grapple position

**Status:** BROKEN  
**Priority:** High

The tutorial saves the grapple position before the grapple is actually fired.

### What happens

You can grapple correctly, but the tutorial may still think you did not do it.

### Where to look

```text
src/legacy/killshift-engine.js
```

Look for:

```text
playerGrapple
grappleFire
tutorialMasteryTraining
```

### Goal

Make the tutorial watch the grapple that was actually fired.

Do not change the grapple physics.

---

## BUG-003 — Dash gets stuck during the tutorial

**Status:** BROKEN  
**Priority:** High

The first tutorial dash starts its cooldown, but the cooldown does not count back down.

### What happens

After dashing once, the player may not be able to dash again during the tutorial.

This is especially bad if the first dash does not complete the tutorial step.

### Where to look

```text
src/game/movement/movement-controller.js
src/legacy/killshift-engine.js
```

Look for:

```text
startDash
updateDashCooldown
movement30ParkourTimers
```

### Goal

Let the dash cooldown recover normally during the tutorial.

Do not change dash speed, distance, stamina cost, or normal gameplay timing.

---

## BUG-004 — Loading while paused leaves the game paused

**Status:** BROKEN  
**Priority:** Medium

### What happens

1. Play the game.
2. Pause.
3. Load a saved game.
4. Enter the arena.

The old pause screen/state can still be active.

### Goal

Entering the arena after loading should put the game into the correct playing state.

Normal pause and resume should still work.

---

## BUG-005 — Wave message says `undefined`

**Status:** BROKEN  
**Priority:** Low

Sometimes the wave message looks like this:

```text
WAVE 1 — THREAT 9 | undefined
```

### Goal

Show the correct difficulty name instead of `undefined`.

Do not change the actual difficulty values.

---

# Things that might be bugs

These need more testing before changing code.

## CHECK-001 — Ammo after loading

A test did this:

```text
Saved shotgun ammo: 5/48
Loaded shotgun ammo: 5/48
Entered arena: 6/48
```

We do not know yet if this is wrong.

The game may intentionally refill the weapon when entering the arena.

### Before changing anything

Decide what loading a game is supposed to mean:

- continue with exactly the same ammo?
- or start the arena with a fresh weapon?

Do not fix this until the intended behavior is clear.

---

## CHECK-002 — Movement state after restarting

Some movement values may not be completely reset when starting again.

Possible examples:

- dash cooldown
- dash direction
- movement timers
- jump grace timers

### Test

Try dying or restarting:

- during a dash
- right after a dash
- during other parkour moves

Compare the new run with a completely fresh game.

---

## CHECK-003 — Pausing during timed actions

Some game actions use the computer's real clock.

That means their timers might keep counting while the game is paused.

Things to test:

- parry
- jump pads
- grapple takedowns

### Test

Start the action, pause for several seconds, then resume.

See if the action acts differently than it would without pausing.

---

# Things that need more testing

These are **not known bugs**.

They are areas we have not tested enough yet.

## Tutorial

Test the entire tutorial from beginning to end.

Also test:

- going backward
- skipping
- dying
- pausing
- restarting
- repeating steps

---

## Movement

Test:

- walking
- sprinting
- stamina
- jumping
- air jumping
- sliding
- dashing
- wall running
- wall climbing
- vaulting
- mantling
- ground pounds

Try combining moves too.

---

## Collision

Test:

- thin walls
- corners
- ceilings
- ledges
- moving platforms
- high-speed dashes into walls
- wall-running off an edge
- mantling near obstacles

Look for:

- getting stuck
- falling through things
- clipping through walls
- getting launched unexpectedly

---

## Controls

Test:

- keyboard
- mouse
- pointer lock
- pausing while holding keys
- switching browser windows
- mouse buttons
- aiming
- weapon switching
- mobile controls

The Codex embedded browser cannot properly test pointer lock.

Use a normal desktop browser for that.

---

## Weapons and combat

Test different kinds of weapons, not just one.

Try:

- normal bullets
- shotguns
- projectiles
- melee
- reloads
- headshots
- critical hits
- piercing
- special weapon effects
- rarity bonuses

---

## Abilities and progression

Test:

- buying abilities
- stacking abilities
- challenges
- achievements
- rewards
- saving and loading abilities

---

## Enemies, maps, and waves

Test:

- later waves
- different enemy types
- all maps
- enemy spawning
- enemies getting stuck
- enemies reaching the player
- wave completion
- map changes
- hazards

---

## Audio and GitHub Pages

Test:

- sound effects
- music
- mute
- pausing
- restarting
- GitHub Pages version
- Chrome
- Edge
- Firefox

Some sound files currently come from CodeHS.

---

## Performance

Play for a long time and watch for:

- slowdown
- bad frame rate
- memory problems
- effects that never disappear
- too many objects staying in the world

Do not call something a performance bug until it can actually be measured.

---

# Code cleanup for later

These are useful jobs, but they are not bugs.

## LATER-001 — Collision / World module

Movement still depends on collision and world code inside:

```text
src/legacy/killshift-engine.js
```

This is the next major system that could be moved into its own module.

---

## LATER-002 — Simplify old engine ownership

Some parts of the old engine have several versions or installers for the same systems.

Over time, make it easier to tell which version is actually being used.

---

## LATER-003 — Simplify tutorial detection

Different tutorial steps use different tricks to decide whether an action succeeded.

A future cleanup could give tutorial actions one consistent way to report:

```text
"I really succeeded."
```

---

## LATER-004 — Make restarting cleaner

Starting a new game currently resets lots of individual values by hand.

A cleaner reset system could make forgotten state less likely.

---

## LATER-005 — Move audio files

Some audio is loaded from CodeHS.

Eventually, the project should probably own its own properly licensed audio files instead of depending on another website.

---

## LATER-006 — Improve tests

The current automated tests cover some important systems, but not the whole game.

Add tests when they help protect code that is being changed.

Do not try to test the entire game at once.

---

# Suggested order

A good order to work through these is:

1. `BUG-001` — wall-jump tutorial
2. `BUG-003` — dash tutorial
3. `BUG-002` — grapple tutorial
4. Play the entire tutorial
5. `BUG-004` — loading while paused
6. `BUG-005` — undefined difficulty name
7. Test the three `CHECK` items
8. Test Movement and Collision
9. Continue modularizing Collision / World

---

# Important rule

Do not fix something just because it looks strange.

First prove what is wrong.

Then make the smallest change that fixes it.

After changing something:

```powershell
npm.cmd test
npm.cmd run build
```

Then play the part of the game you changed.

Keep KillShift playable.
