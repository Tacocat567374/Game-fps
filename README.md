# KillShift

Browser-based first-person shooter built with:

- JavaScript
- Three.js
- Vite

## Play the game

Once GitHub Pages is enabled:

```text
https://tacocat567374.github.io/Game-fps/
```

---

# What you need installed

Before working on KillShift, make sure these programs are installed on the computer.

| Software | Why you need it | Recommended |
|---|---|---|
| **Git** | Downloads the project and saves code history | Current version |
| **Node.js** | Runs the development tools and build system | Node.js 22 LTS |
| **npm** | Downloads the project's JavaScript packages | Comes with Node.js |
| **Desktop web browser** | Runs and tests the game | Chrome, Edge, or Firefox |
| **Code editor** | Used to edit the project | VS Code recommended |

### Check that Git is installed

Open PowerShell:

```powershell
git --version
```

You should see something like:

```text
git version 2.x.x
```

### Check that Node.js is installed

```powershell
node --version
```

You should see a version number.

For this project, **Node.js 22 LTS is recommended**.

### Check that npm is installed

```powershell
npm --version
```

npm normally gets installed automatically with Node.js.

On some Windows computers, PowerShell may block `npm.ps1`.

If this happens, use:

```powershell
npm.cmd
```

instead of:

```powershell
npm
```

For example:

```powershell
npm.cmd install
npm.cmd run dev
```

---

# Project dependencies

You do **not** need to install Three.js or Vite separately.

They are listed in the project's `package.json`.

The main packages are:

| Package | Purpose |
|---|---|
| `three` | The 3D game engine library |
| `vite` | Runs the local development server and builds the game |

When you run:

```powershell
npm install
```

npm reads:

```text
package.json
package-lock.json
```

and downloads the correct project packages into:

```text
node_modules/
```

The `node_modules` folder is created automatically.

Do not manually edit it.

Do not commit it to Git.

If `node_modules` is missing, just run:

```powershell
npm install
```

again.

---

# Get the project

If the project is not already on the computer:

```powershell
git clone https://github.com/Tacocat567374/Game-fps.git
cd Game-fps
```

Then install the project packages:

```powershell
npm install
```

You normally only need to do this:

- the first time you download the project
- after `package.json` or `package-lock.json` changes
- if `node_modules` was deleted

---

# Run locally

Open a terminal inside the `Game-fps` folder.

Start the development server:

```powershell
npm run dev
```

On Windows, if PowerShell blocks npm:

```powershell
npm.cmd run dev
```

Vite will print an address similar to:

```text
http://localhost:5173/
```

Open that address in a desktop browser.

A normal desktop browser works best because KillShift uses **pointer lock** to control the mouse during gameplay.

---

# Build

To create the production version of the game:

```powershell
npm run build
```

Or on Windows if needed:

```powershell
npm.cmd run build
```

The finished build is placed in:

```text
dist/
```

GitHub Pages uses this built version when publishing the game.

---

# Run tests

```powershell
npm test
```

Or:

```powershell
npm.cmd test
```

Passing tests are a good sign, but also play the part of the game you changed.

---

# Project layout

```text
src/
├── game/
│   ├── abilities/
│   ├── audio/
│   ├── config/
│   ├── enemies/
│   ├── input/
│   ├── maps/
│   ├── movement/
│   ├── progression/
│   ├── waves/
│   └── weapons/
│
├── legacy/
│   └── killshift-engine.js
│
├── main.js
└── styles.css
```

## `src/game/`

Newer modular game code lives here.

| Folder | Job |
|---|---|
| `input` | Keyboard, mouse, and input state |
| `movement` | Jumping, sprinting, stamina, sliding, dashing, parkour |
| `weapons` | Weapon data |
| `abilities` | Ability data |
| `enemies` | Enemy definitions |
| `maps` | Map data |
| `waves` | Waves and round modifiers |
| `progression` | Challenges and achievements |
| `audio` | Sound information |
| `config` | Game tuning values |

## `src/legacy/killshift-engine.js`

This is the older game engine.

It still contains many systems that have not been moved yet.

Do not rewrite the whole file at once.

Move one clear system at a time.

---

# What has already been modularized

The project already has separate ownership for:

- game tuning
- weapons
- rarity data
- abilities
- enemy definitions
- maps
- waves
- challenges
- achievements
- audio information
- raw input state
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

Example:

```text
Input
  ↓
Movement
  ↓
Collision / World
```

### Input

Knows things like:

- W is pressed
- Space is pressed
- mouse button is down
- sprint is held

### Movement

Handles things like:

- speed
- jumping
- sprinting
- stamina
- sliding
- dashing
- wall-running
- vaulting
- mantling

### Collision / World

Answers things like:

- Is there a floor here?
- Is there a wall here?
- Can the player move here?
- Is there a ceiling above the player?

---

# Your first task

The next system to study is:

## Collision / Physics

Open these two files side by side:

```text
src/game/movement/movement-controller.js
src/legacy/killshift-engine.js
```

Before changing anything, figure out:

1. Which functions check floors, walls, ceilings, or obstacles?
2. Which functions change player movement?
3. Which functions belong to Movement?
4. Which functions belong to Collision or Physics?
5. What information does Movement need from Collision?

Do not start by moving hundreds of lines.

First understand the boundary.

---

# Main coding rule

Ask:

> **What part of the game should own this code?**

| Code | Likely owner |
|---|---|
| Jumping | Movement |
| Wall checks | Collision |
| Enemy decisions | Enemies / AI |
| Weapon stats | Weapons |
| Bullet damage | Combat |
| Map definitions | Maps |
| Save files | Saves |
| Health display | HUD / UI |

---

# When changing code

Use this basic process:

1. Run the game first.
2. Read the code you want to change.
3. Decide which system owns it.
4. Make one clear change.
5. Run the build.
6. Run the tests.
7. Play the changed part of the game.
8. Commit it.

Try to keep the game playable.

Do not mix a big code cleanup with game balancing unless there is a good reason.

---

# Git basics

## Repository

A Git repository is the project plus its saved history.

## Commit

A commit is like a save point.

Example:

```text
54c22c7 refactor: extract player movement state
```

## Commit hash

Each commit gets a unique ID.

Full hash:

```text
54c22c703b4162531fc637a378bcce52e9dfb550
```

Short version:

```text
54c22c7
```

Usually the short version is enough.

See recent commits with:

```powershell
git log --oneline
```

## `main`

`main` is the main working version of KillShift.

## Branch

A branch is another path where you can work without changing `main` right away.

Useful for:

- experiments
- larger features
- risky changes

## Fork

A fork is a separate copy of someone else's repository under another GitHub account.

A fork is not the same thing as a branch.

You probably do not need a fork for normal work on KillShift.

---

# Important project files

| File | Purpose |
|---|---|
| `README.md` | Quick guide to the project |
| `package.json` | Lists project packages and commands |
| `package-lock.json` | Locks package versions so everyone gets the same setup |
| `AGENTS.md` | Rules for working on the code |
| `STATUS.md` | Current project state and next work |
| `MIGRATION.md` | History of the modularization work |

---

# Main goal

Keep KillShift playable while making the code easier to understand.

Do not try to fix everything at once.

**One system at a time.**
