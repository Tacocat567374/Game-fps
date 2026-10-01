// Keep metadata instance-local to an engine initialization.
export function createRarityData() {
const DUPLICATE_WEAPON_VALUES = {
  common: 10,
  uncommon: 25,
  rare: 60,
  epic: 150,
  legendary: 400,
  mythic: 1000,
  divine: 2500
};

// RARITY 2.0
// Every tier is data-driven so new weapons can be authored without hard-coding
// balance rules throughout the combat code.  fireRate is a multiplier to the
// weapon's shots-per-minute style cooldown: higher = faster.
const RARITIES = {
  common:    { color: 0x94a3b8, damage: 1.00, fireRate: 1.00, ammo: 1.00, reload: 1.00, range: 1.00, spread: 1.00, critChance: 0.00, critDamage: 1.00, projectileSpeed: 1.00, statusPower: 1.00, abilityPower: 1.00, dropWeight: 520, minWave: 1,  power: 0,  statRoll: 0.00, affixSlots: 0 },
  uncommon:  { color: 0x22c55e, damage: 1.18, fireRate: 1.08, ammo: 1.18, reload: 0.96, range: 1.04, spread: 0.97, critChance: 0.01, critDamage: 1.05, projectileSpeed: 1.05, statusPower: 1.08, abilityPower: 1.08, dropWeight: 300, minWave: 1,  power: 1, statRoll: 0.03, affixSlots: 1 },
  rare:      { color: 0x3b82f6, damage: 1.38, fireRate: 1.17, ammo: 1.38, reload: 0.92, range: 1.08, spread: 0.94, critChance: 0.025, critDamage: 1.12, projectileSpeed: 1.10, statusPower: 1.18, abilityPower: 1.18, dropWeight: 150, minWave: 3, power: 2, statRoll: 0.06, affixSlots: 1 },
  epic:      { color: 0xa855f7, damage: 1.68, fireRate: 1.29, ammo: 1.68, reload: 0.87, range: 1.13, spread: 0.90, critChance: 0.045, critDamage: 1.22, projectileSpeed: 1.16, statusPower: 1.30, abilityPower: 1.32, dropWeight: 65,  minWave: 8, power: 3, statRoll: 0.09, affixSlots: 2 },
  legendary: { color: 0xf59e0b, damage: 2.05, fireRate: 1.43, ammo: 2.05, reload: 0.81, range: 1.19, spread: 0.86, critChance: 0.07, critDamage: 1.35, projectileSpeed: 1.23, statusPower: 1.45, abilityPower: 1.50, dropWeight: 25,  minWave: 14, power: 4, statRoll: 0.13, affixSlots: 3 },
  mythic:    { color: 0xef4444, damage: 2.55, fireRate: 1.62, ammo: 2.55, reload: 0.74, range: 1.26, spread: 0.82, critChance: 0.10, critDamage: 1.50, projectileSpeed: 1.32, statusPower: 1.65, abilityPower: 1.75, dropWeight: 8,   minWave: 22, power: 5, statRoll: 0.18, affixSlots: 4 },
  divine:    { color: 0xffffff, damage: 3.15, fireRate: 1.86, ammo: 3.10, reload: 0.66, range: 1.34, spread: 0.76, critChance: 0.14, critDamage: 1.70, projectileSpeed: 1.45, statusPower: 1.90, abilityPower: 2.05, dropWeight: 2,   minWave: 35, power: 6, statRoll: 0.24, affixSlots: 5 }
};

const RARITY_ORDER = ['common','uncommon','rare','epic','legendary','mythic','divine'];
const RARITY_AFFIXES = {
  damage:        { label:'Overcharged', stat:'damage', min:1.04, max:1.12 },
  fireRate:      { label:'Rapid', stat:'fireRate', min:1.03, max:1.08 },
  reload:        { label:'Quickload', stat:'reload', min:0.92, max:0.97 },
  magazine:      { label:'Extended', stat:'mag', min:1.05, max:1.16 },
  range:         { label:'Longshot', stat:'range', min:1.04, max:1.12 },
  crit:          { label:'Precision', stat:'critChance', min:0.015, max:0.035 },
  projectile:    { label:'Accelerated', stat:'projectileSpeed', min:1.04, max:1.10 },
  status:        { label:'Infused', stat:'statusPower', min:1.06, max:1.16 },
  ability:       { label:'Amplified', stat:'abilityPower', min:1.06, max:1.18 }
};

const RARITY_SYSTEM = {
  luckPerPoint: 0.018,
  pityStart: 18,
  pityStep: 0.045,
  guaranteed: { rare: 8, epic: 18, legendary: 35, mythic: 65, divine: 100 },
  duplicateSalvageMultiplier: 1.0,
  qualityVariance: true
};

const weaponRarities = {
  // COMMON
  pistol: 'common',
  rifle: 'common',
  shotgun: 'common',
  smg: 'common',
  knife: 'common',
  burstPistol: 'common',
  burst: 'common',
  dual: 'common',
  bandage: 'common',

  // UNCOMMON
  lmg: 'uncommon',
  laser: 'uncommon',
  minigun: 'uncommon',
  pulse: 'uncommon',
  scatterCannon: 'uncommon',
  grenade: 'uncommon',
  flash: 'uncommon',
  cluster: 'uncommon',
  freeze: 'uncommon',
  flamethrower: 'uncommon',
  crossbow: 'uncommon',
  medkit: 'uncommon',

  // RARE
  sniper: 'rare',
  rocket: 'rare',
  mine: 'rare',
  plasma: 'rare',
  goldenPistol: 'rare',
  venom: 'rare',
  inferno: 'rare',
  magmaRepeater: 'rare',
  cryo: 'rare',
  plagueCaster: 'rare',
  acidSprayer: 'rare',
  frostBurst: 'rare',
  arc: 'rare',
  shockwave: 'rare',
  sonicBoom: 'rare',
  boomerang: 'rare',
  soulReaper: 'rare',
  littlewhammies: 'rare',

  // EPIC
  railgun: 'epic',
  rail: 'epic',
  void: 'epic',
  voidPistol: 'epic',
  plasmaPistol: 'epic',
  voidNova: 'epic',
  gravity: 'epic',
  gravityNova: 'epic',
  teslaCoil: 'epic',
  chainFrost: 'epic',
  ricochetCannon: 'epic',
  plasmaBurst: 'epic',
  solarFlare: 'epic',
  photonLance: 'epic',
  blade: 'epic',
  bigwhammies: 'epic',

  // LEGENDARY
  meteor: 'legendary',
  cometLauncher: 'legendary',
  wildfire: 'legendary',
  bioRocket: 'legendary',
  omegaPistol: 'legendary',
  thunderHammer: 'legendary',
  eclipseBlade: 'legendary',
  elementaloverpowerde: 'legendary',

  // MYTHIC
  starfall: 'mythic',
  antimatterRifle: 'mythic',

  // DIVINE
  nuke: 'divine',
  chronoSingularity: 'divine',
genesisCannon: 'divine'

};

const rarityNames = {
  common: "COMMON",
  uncommon: "UNCOMMON",
  rare: "RARE",
  epic: "EPIC",
  legendary: "LEGENDARY",
  mythic: "MYTHIC",
  divine: "DIVINE"
};
  return { DUPLICATE_WEAPON_VALUES, RARITIES, RARITY_ORDER, RARITY_AFFIXES,
    RARITY_SYSTEM, weaponRarities, rarityNames };
}
