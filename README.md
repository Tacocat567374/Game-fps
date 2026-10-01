# KillShift

KillShift is a browser-based first-person shooter built with JavaScript, Three.js, and Vite.

The game is still being worked on. It has weapons, enemies, waves, movement abilities, upgrades, maps, and other systems that are being improved over time.

## Running the game

You need Node.js installed first.

Open a terminal in the project folder and run:

```powershell
npm install
npm run dev
```

Vite will show you a local web address. Open that address in your browser to play the game.

For some features, such as mouse pointer lock, it is best to use a normal desktop browser.

## Build and tests

To make sure the project can build:

```powershell
npm run build
```

To run the automated tests:

```powershell
npm test
```

If both commands pass, that is a good sign that the project is still working.

It does not prove that every part of the game works, so it is still a good idea to play the part you changed.

## Project structure

The game used to be almost entirely inside one very large file.

We are slowly splitting it into smaller modules so each part of the game has a clear job.

A **module** is just a section of the program that is responsible for one part of the game.

The main folders now look roughly like this:

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

### `src/game/`

This is where the newer modular code lives.

For example:

- `input` keeps track of keyboard and mouse input.
- `movement` handles player movement, jumping, sprinting, sliding, dashing, stamina, and parkour.
- `weapons` contains weapon information.
- `abilities` contains ability information.
- `enemies` contains enemy definitions.
- `maps` contains map information.
- `waves` contains wave and round information.
- `progression` contains things such as challenges and achievements.
- `audio` contains sound information.
- `config` contains game tuning values.

### `src/legacy/killshift-engine.js`

This is the older game engine.

It is still important and the game still uses it, but it contains many different systems in one very large file.

The goal is to slowly move code out of it when that code has a clear place to live.

Do not try to rewrite the whole file at once.

Move one clear system at a time and keep the game playable.

## How the parts connect

A useful example is player movement:

```text
Input
  ↓
Movement
  ↓
Collision / World
```

**Input** knows which buttons are being pressed.

**Movement** decides how the player should move.

**Collision and World** code answers questions like:

- Is the player standing on the ground?
- Did the player hit a wall?
- Can the player move into this space?

Keeping these jobs separate makes the code easier to understand and easier to change later.

## If you are working on the game

Before changing code:

1. Run the game and make sure it works.
2. Read the code you are about to change.
3. Ask which part of the game should own that code.
4. Make one clear change at a time.
5. Run the build and tests.
6. Play the part of the game you changed.
7. Commit your work with a message that explains what you changed.

A good question to keep asking is:

> **What part of the game should own this?**

If the code controls movement, it probably belongs with Movement.

If it controls enemies, it probably belongs with Enemies.

If it controls weapons, it probably belongs with Weapons.

The goal is not just to make the files smaller. The goal is to make it easier to tell where things belong.

## Git basics

Git keeps a history of the project.

A **commit** is like a save point for the code.

When you make a commit, Git remembers what the project looked like at that moment.

Each commit gets a long ID called a **commit hash** or **SHA**.

It looks something like this:

```text
54c22c703b4162531fc637a378bcce52e9dfb550
```

You normally do not need to type the whole thing.

The first few characters are usually enough:

```text
54c22c7
```

You can see recent commits with:

```powershell
git log --oneline
```

You might see something like:

```text
54c22c7 refactor: extract player movement state
2766504 refactor: establish input module ownership
```

This gives you a history of what changed.

### What is `main`?

`main` is the main working version of KillShift.

Think of it as the normal path through the project's history.

### What is a branch?

A branch is another path where you can work on something without changing `main` right away.

For example, if you wanted to experiment with enemy AI, you could make a branch for it.

If the experiment goes badly, `main` is still there.

You do not need to make a branch for every tiny change. They are most useful when you are doing larger work or experimenting.

### What is a fork?

A fork is different from a branch.

A branch is another path inside the same repository.

A fork is a separate copy of a repository, usually under another GitHub account.

You probably do not need a fork while working directly on this project.

## Helpful project files

These files have more information about the project:

- `AGENTS.md` — rules and instructions for working on the code.
- `STATUS.md` — explains what has already been changed and what comes next.
- `MIGRATION.md` — explains how the old game is being moved into the newer project structure.

## Where to start

If you are new to this version of the project, start by looking at:

```text
src/game/input/
src/game/movement/
```

Then compare those files with:

```text
src/legacy/killshift-engine.js
```

Input and Movement show how a system can be moved out of the giant engine and given its own job.

The next major area to study is **Collision / Physics**.

Before moving anything, first try to understand which code:

- checks the world for walls, floors, or obstacles
- changes player movement
- belongs to Movement
- belongs to Collision or Physics

Understanding the boundary is more important than moving lots of code quickly.

## Current direction

The main goal is simple:

**Keep KillShift playable while making the code easier to understand.**

The project does not need one giant rewrite.

Improve it one system at a time.
