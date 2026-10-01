# KillShift

KillShift is a browser-based first-person shooter built with:

- JavaScript
- Three.js
- Vite

## Play KillShift

When GitHub Pages is enabled:

```text
https://tacocat567374.github.io/Game-fps/
```

---

# What you need installed

Install these programs before working on KillShift:

| Software | What it does |
|---|---|
| **Git** | Downloads the project and keeps code history |
| **Node.js 22 LTS** | Runs the development tools |
| **npm** | Installs project packages; comes with Node.js |
| **VS Code** | Recommended code editor |
| **Chrome, Edge, or Firefox** | Runs and tests the game |

## Check your setup

Open PowerShell.

```powershell
git --version
node --version
npm --version
```

Each command should print a version number.

### Windows note

If PowerShell blocks `npm`, use `npm.cmd` instead.

Example:

```powershell
npm.cmd install
npm.cmd run dev
```

---

# Get the project

Clone the repository:

```powershell
git clone https://github.com/Tacocat567374/Game-fps.git
cd Game-fps
```

Install the project packages:

```powershell
npm.cmd install
```

You do **not** need to install Three.js or Vite separately.

npm reads:

```text
package.json
package-lock.json
```

and downloads the correct packages automatically.

---

# Run the game

```powershell
npm.cmd run dev
```

Vite will show an address similar to:

```text
http://localhost:5173/
```

Open it in a normal desktop browser.

KillShift uses **pointer lock**, so some embedded browsers and preview windows may not control the mouse correctly.

---

# Useful commands

## Start the game

```powershell
npm.cmd run dev
```

## Run the tests

```powershell
npm.cmd test
```

## Build the game

```powershell
npm.cmd run build
```

## See recent Git history

```powershell
git log --oneline
```

## Check changed files

```powershell
git status
```

---

# Project layout

```text
Game-fps/
│
├── src/
│   ├── game/
│   │   ├── abilities/
│   │   ├── audio/
│   │   ├── config/
│   │   ├── enemies/
│   │   ├── input/
│   │   ├── maps/
│   │   ├── movement/
│   │   ├── progression/
│   │   ├── waves/
│   │   └── weapons/
│   │
│   ├── legacy/
│   │   └── killshift-engine.js
│   │
│   ├── main.js
│   └── styles.css
│
├── tests/
├── README.md
├── KNOWN_BUGS.md
├── STATUS.md
├── MIGRATION.md
├── AGENTS.md
└── package.json
```

---

# How the code is organized

KillShift used to have most of the game inside one giant file.

That file still exists:

```text
src/legacy/killshift-engine.js
```

The game is slowly being split into smaller modules.

A **module** is a part of the game with one clear job.

## Current modules

| Folder | Job |
|---|---|
| `input` | Keyboard and mouse state |
| `movement` | Jumping, sprinting, stamina, sliding, dashing, parkour |
| `weapons` | Weapon information |
| `abilities` | Ability information |
| `enemies` | Enemy definitions |
| `maps` | Map information |
| `waves` | Waves and round modifiers |
| `progression` | Challenges and achievements |
| `audio` | Sound information |
| `config` | Game tuning values |

---

# What has already been moved

These systems already have at least some code outside the giant legacy engine:

- game tuning
- weapons
- weapon rarity
- abilities
- enemies
- maps
- waves
- challenges
- achievements
- audio information
- raw keyboard and mouse input
- player movement
- stamina
- parkour state

The best examples to study are:

```text
src/game/input/
src/game/movement/
```

---

# How systems should connect

A good example is player movement:

```text
Input
  ↓
Movement
  ↓
Collision / World
```

## Input

Input knows things like:

```text
W is pressed
Space is pressed
Shift is held
Mouse button is down
```

## Movement

Movement decides things like:

```text
run
jump
sprint
slide
dash
wall-run
vault
mantle
```

## Collision / World

Collision answers questions like:

```text
Is there a floor here?
Is there a wall here?
Can the player move here?
Is there a ceiling above the player?
```

The important idea is:

> **Each system should have one clear job.**

---

# What should I work on?

Start here:

## `KNOWN_BUGS.md`

[Read the current bug and work list](KNOWN_BUGS.md).

It contains:

- bugs we know are broken
- things that need more testing
- areas of the game that have not been tested enough
- code cleanup that can happen later
- a suggested work order

The first known problems are currently in the tutorial:

```text
BUG-001  Wall-jump tutorial
BUG-003  Dash tutorial
BUG-002  Grapple tutorial
```

Do not try to fix all of them at once.

Pick one.

Understand it.

Fix it.

Test it.

Commit it.

---

# Next big code project

The next major system to study is:

## Collision / Physics

Open these two files side by side:

```text
src/game/movement/movement-controller.js

src/legacy/killshift-engine.js
```

Look for code that answers questions about:

- walls
- floors
- ceilings
- obstacles
- ledges
- whether the player can move somewhere

Before moving code, ask:

1. Does this code **move the player**?
2. Or does it **answer a question about the world**?

If it moves the player, it probably belongs to **Movement**.

If it answers questions about walls, floors, or obstacles, it probably belongs to **Collision / World**.

Do not move hundreds of lines just because they look related.

Understand the boundary first.

---

# Main coding rule

Keep asking:

> **What part of the game should own this code?**

Examples:

| Code | Likely owner |
|---|---|
| Jumping | Movement |
| Wall checks | Collision |
| Enemy decisions | Enemies / AI |
| Weapon stats | Weapons |
| Bullet damage | Combat |
| Map definitions | Maps |
| Save data | Saves |
| Health display | HUD / UI |

The goal is not just smaller files.

The goal is knowing **where code belongs**.

---

# When changing the game

Use this basic process:

1. Run the game.
2. Make sure the part you are changing works before you touch it.
3. Read the code.
4. Decide which system owns it.
5. Make one clear change.
6. Run the tests.
7. Run the build.
8. Play the part you changed.
9. Commit your work.

Use:

```powershell
npm.cmd test
npm.cmd run build
```

A passing build does not prove the game works.

Play the changed part too.

---

# Important rules

## Keep the game playable

Try not to leave `main` broken.

## Make small changes

Small changes are easier to understand and easier to fix.

## Do not change gameplay by accident

If you are moving code into a module, try to keep the game playing the same way.

Do not change speeds, damage, cooldowns, or other game values unless the task is specifically about changing them.

## Do not rewrite everything

The old engine is large, but it works.

Move one system at a time.

## Do not fix guesses

If something looks strange, test it first.

Prove that it is actually broken before changing it.

---

# Git basics

## Repository

A repository is the project plus its saved history.

## Commit

A commit is like a save point for the code.

Example:

```text
e99b597 docs: add known bugs and work backlog
```

## Commit hash

Every commit has an ID.

A full one looks like:

```text
54c22c703b4162531fc637a378bcce52e9dfb550
```

Usually the short version is enough:

```text
54c22c7
```

See recent commits:

```powershell
git log --oneline
```

## `main`

`main` is the current working version of KillShift.

## Branch

A branch is another path where you can work without changing `main` immediately.

Branches are useful for:

- experiments
- bigger changes
- risky work

You do not need one for every tiny change.

## Fork

A fork is a separate copy of a repository under another GitHub account.

A fork is different from a branch.

You probably do not need a fork for normal KillShift work.

---

# Important project files

| File | What it is for |
|---|---|
| `README.md` | Start here |
| `KNOWN_BUGS.md` | Bugs, testing jobs, and things to work on |
| `STATUS.md` | Current state of the project |
| `MIGRATION.md` | History of moving the game out of the giant file |
| `AGENTS.md` | Rules for Codex and larger coding tasks |
| `package.json` | Project packages and commands |
| `package-lock.json` | Exact package versions |

---

# Main goal

Keep KillShift fun and playable while making the code easier to understand.

You do not need to finish everything at once.

```text
Understand one thing.
Change one thing.
Test one thing.
Commit one thing.
```
