import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createWeaponData } from '../src/game/weapons/catalog.js';
import { createRarityData } from '../src/game/weapons/rarity-data.js';
import {
  createCoreTuning, PLAYER_RADIUS, PLAYER_EYE_HEIGHT,
  WALK_SPEED, SPRINT_SPEED, JUMP_FORCE, ASCENT_GRAVITY,
  DESCENT_GRAVITY, HEADSHOT_MULTIPLIER
} from '../src/game/config/tuning.js';

const digest = value => createHash('sha256')
  .update(JSON.stringify(value)).digest('hex');

test('weapon catalog preserves baseline IDs and authored data', () => {
  const { W, START_LOADOUT, WEAPON_MAKING_DEFAULTS } = createWeaponData();
  assert.equal(Object.keys(W).length, 70);
  assert.equal(Object.keys(WEAPON_MAKING_DEFAULTS).length, 43);
  assert.deepEqual(START_LOADOUT, ['rifle', 'shotgun', 'smg', 'grenade', 'rocket']);
  assert.equal(W.knife.reserve, Infinity);
  assert.equal(W.elementaloverpowerde.name, 'Elemental Cannon');
  assert.equal(W.freeze.freezeTime, 5);
  assert.equal(digest({ W, START_LOADOUT, WEAPON_MAKING_DEFAULTS }),
    'd16b385db1746f412087e605c11453d0569669952bfb6746f6c21190a176e276');
});

test('weapon and rarity factories keep initialization state independent', () => {
  const first = createWeaponData();
  const second = createWeaponData();
  assert.notStrictEqual(first.W, second.W);
  assert.notStrictEqual(first.W.rifle, second.W.rifle);
  first.W.rifle.damage = -1;
  assert.equal(second.W.rifle.damage, 22);

  const rarity = createRarityData();
  assert.equal(Object.keys(rarity.RARITIES).length, 7);
  assert.equal(Object.keys(rarity.weaponRarities).length, 68);
  assert.equal(rarity.weaponRarities.elementaloverpowerde, 'legendary');
  assert.equal(digest(rarity),
    'caab65f22c6ee551a66b83827e4844513f0e0dfd9d829b73577da3d039737f81');
  assert.notStrictEqual(rarity.RARITIES, createRarityData().RARITIES);
});

test('core and movement tuning retains baseline values', () => {
  assert.deepEqual(createCoreTuning(), {
    fireSpreadMultiplier: 0.88,
    earlyWaveEnemyScale: 0.92,
    lateWaveEnemyScale: 1.05,
    spawnDelayFloor: 120,
    enemyBulletBias: 0.92,
    playerReloadBias: 0.96
  });
  assert.notStrictEqual(createCoreTuning(), createCoreTuning());
  assert.deepEqual(
    [PLAYER_RADIUS, PLAYER_EYE_HEIGHT, WALK_SPEED, SPRINT_SPEED,
      JUMP_FORCE, ASCENT_GRAVITY, DESCENT_GRAVITY, HEADSHOT_MULTIPLIER],
    [0.55, 1.7, 4.5, 8, 10.5, 24, 30, 2]
  );
});
