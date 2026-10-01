import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createAbilityCatalog } from '../src/game/abilities/catalog.js';

const source = readFileSync(new URL('../src/legacy/killshift-engine.js', import.meta.url), 'utf8');

function extractFunction(name) {
  const match = new RegExp('function\\s+' + name + '\\s*\\(').exec(source);
  assert.ok(match, name + ' remains in the engine');
  const start = source.indexOf('{', match.index);
  let depth = 0;
  for (let index = start; index < source.length; index++) {
    if (source[index] === '{') depth++;
    if (source[index] === '}' && --depth === 0) {
      return source.slice(match.index, index + 1);
    }
  }
  throw new Error('Unclosed engine function: ' + name);
}

function runtime() {
  const overlays = [];
  const elements = new Map();
  const state = {
    ABILITY_CATALOG: createAbilityCatalog(),
    alive: true,
    dying: false,
    shopOpen: false,
    controls: { isLocked: false },
    coins: 9999,
    ownedAbilities: [],
    activeAbilities: [],
    shopAbilities: [],
    rerollUsed: false,
    REROLL_COST: 80,
    $: id => {
      if (!elements.has(id)) elements.set(id, { textContent: '', disabled: false });
      return elements.get(id);
    },
    setOverlay: (id, visible) => overlays.push([id, visible]),
    updateShopOption: () => {},
    updateGameHud: () => {},
    showFeed: () => {},
    renderAbilitySelectionUI: () => {}
  };
  const context = vm.createContext(state);
  for (const name of [
    'getModifierValue', 'generateShopAbilities', 'updateRerollButton',
    'openShop', 'abilityOwnedCount', 'abilityCostFor', 'canBuyAbility',
    'buyAbility', 'showAbilitySelect'
  ]) vm.runInContext(extractFunction(name), context, { filename: 'killshift-engine.js' });
  context.getStackCount = id => context.ownedAbilities.filter(value => value === id).length;
  return { context, overlays, elements };
}

test('shop opens with catalog-backed choices and purchases retain their original cost', () => {
  const { context: game, overlays, elements } = runtime();
  game.openShop();
  assert.equal(game.shopOpen, true);
  assert.ok(game.shopAbilities.length >= 6);
  assert.ok(game.shopAbilities.slice(0, 3).every(id => game.ABILITY_CATALOG[id]));
  assert.ok(overlays.some(([id, visible]) => id === 'shop' && visible));
  const id = game.shopAbilities[0];
  const cost = game.ABILITY_CATALOG[id].costBase;
  assert.equal(game.abilityCostFor(id), cost);
  game.buyAbility(id);
  assert.equal(game.coins, 9999 - cost);
  assert.equal(game.ownedAbilities.filter(value => value === id).length, 1);
  assert.equal(game.abilityCostFor(id), Math.floor(cost * 1.35));
  assert.equal(elements.get('shopCoins').textContent, game.coins.toLocaleString());
});

test('owned ability selection, modifier stacks, and special IDs remain recognized', () => {
  const { context: game, overlays } = runtime();
  game.ownedAbilities.push('damageModifier', 'damageModifier', 'goldRush', 'parkourPlates');
  game.showAbilitySelect();
  assert.equal(game.activeAbilities.length, 3);
  assert.ok(game.activeAbilities.includes('goldRush'));
  assert.ok(overlays.some(([id, visible]) => id === 'abilitySelect' && visible));
  const result = game.getModifierValue('onDamageMult', 100);
  assert.ok(Math.abs(result - 100 * 1.12 * 1.12) < 1e-10);
  assert.equal(game.ABILITY_CATALOG.goldRush.special, 'goldRush');
  assert.equal(game.ABILITY_CATALOG.parkourPlates.id, 'parkourPlates');
});
