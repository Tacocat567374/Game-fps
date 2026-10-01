import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import { JUMP_FORCE, WALL_JUMP_PUSH, WALL_JUMP_FORCE, WALL_JUMP_COOLDOWN } from '../src/game/config/tuning.js';
import { createInputState } from '../src/game/input/input-state.js';
import { createMovementController } from '../src/game/movement/movement-controller.js';

const source = readFileSync(new URL('../src/legacy/killshift-engine.js', import.meta.url), 'utf8') +
  readFileSync(new URL('../src/game/movement/movement-controller.js', import.meta.url), 'utf8');

function functionSource(name) {
  const match = new RegExp('function\\s+' + name + '\\s*\\(').exec(source);
  assert.ok(match, name + ' exists in the engine');
  const opening = source.indexOf('{', match.index);
  let depth = 0;
  for (let index = opening; index < source.length; index++) {
    if (source[index] === '{') depth++;
    if (source[index] === '}' && --depth === 0) {
      return source.slice(match.index, index + 1);
    }
  }
  throw new Error('Unclosed function: ' + name);
}

function harness(overrides = {}) {
  const completions = [];
  const timers = [];
  const status = [];
  const nextButton = { textContent: '' };
  const state = {
    THREE,
    JUMP_FORCE,
    JUMP_PAD_MIN_FORCE: 13,
    JUMP_PAD_FORCE_MULTIPLIER: 1.4,
    JUMP_PAD_JUMP_CUT_GRACE: 0.1,
    WALL_JUMP_PUSH,
    WALL_JUMP_FORCE,
    WALL_JUMP_COOLDOWN,
    alive: true,
    dying: false,
    grounded: true,
    coyoteTimer: 0,
    jumpBufferTimer: 0.1,
    jumpCutGraceTimer: 0,
    jumpCutApplied: true,
    velocityY: 0,
    moveVelocityX: 0,
    moveVelocityZ: 0,
    airJumpAvailable: true,
    groundPoundActive: false,
    wallJumpCooldown: 0,
    wallRunning: false,
    climbingWall: false,
    wallRunTimer: 0,
    climbingObstacle: null,
    tutorialActive: true,
    tutorialStepDone: false,
    tutorialStep: 3,
    tutorialSteps: [
      { action: 'look' }, { action: 'move' }, { action: 'sprint' },
      { action: 'jump' }, { action: 'slide' }
    ],
    evidence: { moved: 0, sprintTime: 0 },
    PROMPTS: { jump: 'Perform a normal jump.' },
    hasGameplayInput: () => true,
    lookDelta: () => 0,
    tutorialStatus: message => status.push(message),
    $: () => nextButton,
    setTimeout: callback => timers.push(callback),
    renderTutorialStep: () => {},
    finishTutorial: () => {},
    window: { playSound: () => {} },
    showFeed: () => {},
    ...overrides
  };
  const context = vm.createContext(state);
  context.playSound = (...args) => context.window.playSound(...args);
  const movement = createMovementController({ input: createInputState(), engine: context });
  context.motion = movement.state;
  for (const key of Object.keys(movement.state)) {
    if (Object.hasOwn(state, key)) movement.state[key] = state[key];
    Object.defineProperty(context, key, {
      get: () => movement.state[key],
      set: value => { movement.state[key] = value; },
      configurable: true
    });
  }
  Object.assign(context, {
    performParkourJump: movement.performParkourJump,
    performAirJump: movement.performAirJump,
    beginWallJump: movement.beginWallJump
  });
  for (const name of [
    'completeTutorialStep', 'tutorialRegisterAction', 'verifyAction',
    'tutorialMasteryGate'
  ]) {
    vm.runInContext(functionSource(name), context, { filename: 'killshift-engine.js' });
  }
  context.originalTutorialRegisterAction = context.tutorialRegisterAction;
  context.currentAction = () => context.tutorialSteps[context.tutorialStep]?.action;
  context.tutorialRegisterAction = context.tutorialMasteryGate;
  context.tutorialStatus = message => status.push(message);
  context.renderTutorialStep = () => {
    context.tutorialStepDone = false;
    completions.push(context.currentAction());
  };
  return {
    context,
    completions,
    status,
    advance() {
      assert.equal(timers.length, 1, 'one tutorial advance is scheduled');
      timers.shift()();
    }
  };
}

test('Steps 1-3 progress; a real ground jump advances Step 4 to Slide', () => {
  const h = harness({ tutorialStep: 0, lookDelta: () => 0.2 });
  const s = h.context;
  for (const [action, evidence] of [
    ['look', () => {}],
    ['move', () => { s.evidence.moved = 2; }],
    ['sprint', () => { s.evidence.sprintTime = 0.5; }]
  ]) {
    assert.equal(s.tutorialSteps[s.tutorialStep].action, action);
    evidence();
    s.tutorialRegisterAction(action);
    assert.equal(s.tutorialStepDone, true);
    h.advance();
  }
  assert.equal(s.tutorialSteps[s.tutorialStep].action, 'jump');
  s.tutorialRegisterAction('jump');
  assert.equal(s.tutorialStepDone, false, 'raw tutorial input is insufficient');
  assert.equal(s.performParkourJump(), true);
  assert.equal(s.velocityY, JUMP_FORCE, 'normal jump force remains unchanged');
  assert.equal(s.grounded, false);
  assert.equal(s.tutorialStepDone, true);
  h.advance();
  assert.equal(s.tutorialSteps[s.tutorialStep].action, 'slide');
  assert.deepEqual(h.completions, ['move', 'sprint', 'jump', 'slide']);
});

test('invalid input, blocked jump, and unrelated airborne movement do not satisfy Jump', () => {
  const h = harness();
  const s = h.context;
  s.tutorialRegisterAction('jump');
  assert.equal(s.tutorialStepDone, false);
  s.alive = false;
  assert.equal(s.performParkourJump(), false);
  assert.equal(s.tutorialStepDone, false);
  s.alive = true;
  s.grounded = false;
  s.coyoteTimer = 0;
  assert.equal(s.performAirJump(), true);
  assert.equal(s.velocityY, 7.6, 'air jump force remains unchanged');
  assert.equal(s.tutorialStepDone, false);
  assert.equal(s.performParkourJump(), true, 'direct airborne QA call keeps its existing behavior');
  assert.equal(s.tutorialStepDone, false, 'airborne QA call is not a normal jump');
  const wallContact = { normal: new THREE.Vector3(1, 0, 0) };
  assert.equal(s.beginWallJump(wallContact), true);
  assert.equal(s.velocityY, s.WALL_JUMP_FORCE);
  assert.equal(s.tutorialStepDone, false);
  assert.equal(s.performParkourJump(15, true), true);
  assert.equal(s.velocityY, Math.max(s.JUMP_PAD_MIN_FORCE, 15 * s.JUMP_PAD_FORCE_MULTIPLIER));
  assert.equal(s.tutorialStepDone, false);
});

test('coyote jump is accepted; normal jumping outside tutorial retains motion', () => {
  const h = harness({ grounded: false, coyoteTimer: 0.08 });
  const s = h.context;
  assert.equal(s.performParkourJump(), true);
  assert.equal(s.tutorialStepDone, true);
  const outside = harness({ tutorialActive: false, grounded: true, moveVelocityX: 5 });
  assert.equal(outside.context.performParkourJump(), true);
  assert.equal(outside.context.velocityY, JUMP_FORCE + 0.6);
  assert.equal(outside.context.tutorialStepDone, false);
});

test('normal Jump tutorial has no remaining raw-input or velocity completion path', () => {
  const registrations = [...source.matchAll(/tutorialRegisterAction\('jump'(.*?)\)/g)];
  assert.equal(registrations.length, 1);
  assert.match(registrations[0][0], /tutorialRegisterAction\('jump', true\)/);
  assert.match(source, /title: 'Step 4 — Jump'[\s\S]*?action: 'jump'[\s\S]*?title: 'Step 5 — Slide'/);
});
