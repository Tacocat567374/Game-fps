import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createAbilityCatalog } from '../src/game/abilities/catalog.js';

const baseline = JSON.parse(
  readFileSync(new URL('./fixtures/ability-catalog-baseline.json', import.meta.url), 'utf8')
);

function project(catalog) {
  const ids = Object.keys(catalog);
  const metadata = {};
  const hooks = {};
  const hookSources = {};
  const hookResultsAtOne = {};
  for (const id of ids) {
    metadata[id] = {};
    hooks[id] = [];
    hookSources[id] = {};
    hookResultsAtOne[id] = {};
    for (const [name, value] of Object.entries(catalog[id])) {
      if (typeof value === 'function') {
        hooks[id].push(name);
        hookSources[id][name] = Function.prototype.toString.call(value)
          .replace(/\s+/g, ' ').trim();
        hookResultsAtOne[id][name] = value(1, {});
      } else {
        metadata[id][name] = value;
      }
    }
  }
  return { ids, metadata, hooks, hookSources, hookResultsAtOne };
}

test('all 39 ability IDs and insertion order match the pre-refactor catalog', () => {
  const catalog = createAbilityCatalog();
  const ids = Object.keys(catalog);
  assert.equal(ids.length, 39);
  assert.deepEqual(ids, baseline.ids);
  assert.deepEqual(ids.slice(33), [
    'adrenalineVault', 'parkourPlates', 'steadyAim',
    'secondWind', 'goldRush', 'hunterMark'
  ]);
  for (const id of ids) assert.equal(catalog[id].id, id);
  assert.equal(catalog.nonexistentAbility, undefined);
});

test('metadata and all 23 functional hooks match the pre-refactor baseline', () => {
  const actual = project(createAbilityCatalog());
  assert.deepEqual(actual.metadata, baseline.metadata);
  assert.deepEqual(actual.hooks, baseline.hooks);
  assert.deepEqual(actual.hookSources, baseline.hookSources);
  assert.deepEqual(actual.hookResultsAtOne, baseline.hookResultsAtOne);
  assert.equal(Object.values(actual.hooks).flat().length, 23);
});

test('each engine initialization receives independent mutable catalog definitions', () => {
  const first = createAbilityCatalog();
  const second = createAbilityCatalog();
  assert.notStrictEqual(first, second);
  for (const id of baseline.ids) {
    assert.notStrictEqual(first[id], second[id], id + ' must have a fresh definition');
  }
  first.damageModifier.costBase = -1;
  first.steadyAim.onSpread = () => 0;
  first.newAbility = { id: 'newAbility' };
  assert.equal(second.damageModifier.costBase, baseline.metadata.damageModifier.costBase);
  assert.equal(second.steadyAim.onSpread(1), 0.85);
  assert.equal(second.newAbility, undefined);
});

test('representative hooks preserve damage, spread, movement, pierce, and projectile speed', () => {
  const catalog = createAbilityCatalog();
  const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10);
  near(catalog.damageModifier.onDamageMult(100), 112);
  near(catalog.spreadModifier.onSpread(1), 0.88);
  near(catalog.moveSpeedModifier.onMoveSpeedMult(10), 11);
  assert.equal(catalog.pierceModifier.onForcePierce(), true);
  near(catalog.projectileSpeedModifier.onProjectileSpeed(10), 12);
  near(catalog.parkourPlates.onMoveSpeedMult(25), 26);
  near(catalog.hunterMark.onDamageMult(100), 106);
});
