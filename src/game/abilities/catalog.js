// A fresh catalog is required because ability contracts are adjusted during engine startup.
export function createAbilityCatalog() {
  const ABILITY_CATALOG = {
                                      pelletModifier: {
                                        id: 'pelletModifier',
                                        name: 'Scatter Matrix',
                                        icon: '🔸',
                                        desc: '+10% shotgun pellets and projectile fragments',
                                        costBase: 70,
                                        maxOwned: 5,

                                        onPellets: pellets => pellets * 1.10
                                      },
                                      ricochetCore: {
        id: 'ricochetCore',
        name: 'Ricochet Core',
        icon: '🔁',
        desc: 'Bullets bounce to one nearby enemy for 65% damage.',
        costBase: 165,
        maxOwned: 3,
        special: 'ricochet'
      },

      armorBreaker: {
        id: 'armorBreaker',
        name: 'Armor Breaker',
        icon: '🛠️',
        desc: 'Consecutive hits on the same enemy deal 8% more damage per stack.',
        costBase: 125,
        maxOwned: 5,
        special: 'armorBreaker'
      },

      volatileMagazine: {
        id: 'volatileMagazine',
        name: 'Volatile Magazine',
        icon: '💥',
        desc: 'The final round in a magazine creates a damaging explosion.',
        costBase: 150,
        maxOwned: 3,
        special: 'volatileMagazine'
      },

      leechingRounds: {
        id: 'leechingRounds',
        name: 'Leeching Rounds',
        icon: '🩸',
        desc: 'Weapon hits restore 1% of damage dealt as health per stack.',
        costBase: 140,
        maxOwned: 4,
        special: 'leechingRounds'
      },

      timeSplitChamber: {
        id: 'timeSplitChamber',
        name: 'Time-Split Chamber',
        icon: '⏳',
        desc: 'Every sixth shot fires a delayed duplicate at 55% damage.',
        costBase: 180,
        maxOwned: 3,
        special: 'timeSplitChamber'
      },

      executionProtocol: {
        id: 'executionProtocol',
        name: 'Execution Protocol',
        icon: '☠️',
        desc: 'Deal 35% bonus weapon damage to enemies below 25% health.',
        costBase: 155,
        maxOwned: 3,
        special: 'executionProtocol'
      },

      elementalOverload: {
        id: 'elementalOverload',
        name: 'Elemental Overload',
        icon: '🌈',
        desc: 'Hits randomly apply burn, freeze, poison, or shock.',
        costBase: 175,
        maxOwned: 3,
        special: 'elementalOverload'
      },

      momentumBarrel: {
        id: 'momentumBarrel',
        name: 'Momentum Barrel',
        icon: '🌀',
        desc: 'Consecutive hits temporarily increase weapon fire rate.',
        costBase: 135,
        maxOwned: 4,
        special: 'momentumBarrel'
      },

      gravityRounds: {
        id: 'gravityRounds',
        name: 'Gravity Rounds',
        icon: '🪐',
        desc: 'Impacts pull nearby enemies toward the target.',
        costBase: 160,
        maxOwned: 3,
        special: 'gravityRounds'
      },

      overkillConverter: {
        id: 'overkillConverter',
        name: 'Overkill Converter',
        icon: '⚡',
        desc: 'Excess damage chains to another nearby enemy.',
        costBase: 190,
        maxOwned: 3,
        special: 'overkillConverter'
      },
                                              phaseShift: {
                                        id: 'phaseShift',
                                        name: 'Phase Shift',
                                        icon: '🫥',
                                        desc: 'Every 7th shot briefly phases through enemies and walls.',
                                        costBase: 145,
                                        maxOwned: 2,
                                        special: 'phaseShift'
                                      },

                                      echoChamber: {
                                        id: 'echoChamber',
                                        name: 'Echo Chamber',
                                        icon: '🔊',
                                        desc: 'Every 5th shot repeats a weaker echo shot automatically.',
                                        costBase: 155,
                                        maxOwned: 3,
                                        special: 'echoShot'
                                      },

                                      emergencyBlink: {
                                        id: 'emergencyBlink',
                                        name: 'Emergency Blink',
                                        icon: '🌀',
                                        desc: 'Taking lethal damage once per wave leaves you with 1 HP and teleports you away.',
                                        costBase: 190,
                                        maxOwned: 1,
                                        special: 'emergencyBlink'
                                      },

                                      damageModifier: {
                                        id: 'damageModifier',
                                        name: 'Overcharged Ammunition',
                                        icon: '🔥',
                                        desc: '+12% weapon damage per stack',
                                        costBase: 105,
                                        maxOwned: 5,
                                        onDamageMult: value => value * 1.12
                                      },

                                      fireRateModifier: {
                                        id: 'fireRateModifier',
                                        name: 'Rapid Mechanism',
                                        icon: '⚙️',
                                        desc: 'Weapons fire 8% faster per stack',
                                        costBase: 115,
                                        maxOwned: 5,
                                        onFireRateMult: value => value * 1.08
                                      },

                                      moveSpeedModifier: {
                                        id: 'moveSpeedModifier',
                                        name: 'Lightweight Boots',
                                        icon: '👟',
                                        desc: 'Move 10% faster per stack',
                                        costBase: 80,
                                        maxOwned: 5,
                                        onMoveSpeedMult: value => value * 1.10
                                      },

                                      damageReductionModifier: {
                                        id: 'damageReductionModifier',
                                        name: 'Reactive Armor',
                                        icon: '🛡️',
                                        desc: 'Take 10% less damage per stack',
                                        costBase: 125,
                                        maxOwned: 5,
                                        onDamageTakenMult: value => value * 0.90
                                      },

                                      reloadModifier: {
                                        id: 'reloadModifier',
                                        name: 'Quick Loader',
                                        icon: '⏱️',
                                        desc: 'Reload 12% faster per stack',
                                        costBase: 95,
                                        maxOwned: 4,
                                        onReloadTimeMult: value => value * 0.88
                                      },

                                      critModifier: {
                                        id: 'critModifier',
                                        name: 'Critical Core',
                                        icon: '🎯',
                                        desc: '+8% critical-hit chance per stack',
                                        costBase: 130,
                                        maxOwned: 4,
                                        onCritChanceBonus: value => value + 0.08
                                      },

                                      pierceCountModifier: {
                                        id: 'pierceCountModifier',
                                        name: 'Penetrator Rounds',
                                        icon: '🪡',
                                        desc: 'Projectiles hit one additional enemy per stack',
                                        costBase: 140,
                                        maxOwned: 3,
                                        onPierceCount: value => value + 1
                                      },

                                      extraHealingModifier: {
                                        id: 'extraHealingModifier',
                                        name: 'Improved Medics',
                                        icon: '💚',
                                        desc: 'Healing effects are 20% stronger per stack',
                                        costBase: 100,
                                        maxOwned: 4,
                                        onHealingMult: value => value * 1.20
                                      },

                                      bulletSizeModifier: {
                                        id: 'bulletSizeModifier',
                                        name: 'Oversized Rounds',
                                        icon: '🔵',
                                        desc: '+30% bullet size and hit radius',
                                        costBase: 85,
                                        maxOwned: 5,

                                        onBulletSize: size => size * 1.30
                                      },

                                      spreadModifier: {
                                        id: 'spreadModifier',
                                        name: 'Stabilizer Fins',
                                        icon: '🎯',
                                        desc: 'Reduces weapon spread by 12%',
                                        costBase: 75,
                                        maxOwned: 5,

                                        onSpread: spread => spread * 0.88
                                      },

                                      explosionModifier: {
                                        id: 'explosionModifier',
                                        name: 'Blast Conduit',
                                        icon: '💥',
                                        desc: '+25% explosion radius',
                                        costBase: 100,
                                        maxOwned: 4,

                                        onExplosionRadius: radius => radius * 1.25
                                      },

                                      chainModifier: {
                                        id: 'chainModifier',
                                        name: 'Chain Reactor',
                                        icon: '⚡',
                                        desc: '+2 targets for chain-lightning weapons',
                                        costBase: 110,
                                        maxOwned: 3,

                                        onArcTargets: targets => targets + 2
                                      },

                                      statusModifier: {
                                        id: 'statusModifier',
                                        name: 'Status Amplifier',
                                        icon: '🧪',
                                        desc: '+35% burn, freeze, poison, and flash duration',
                                        costBase: 95,
                                        maxOwned: 4,

                                        onStatusDuration: duration => duration * 1.35
                                      },

                                      lifeStealModifier: {
                                        id: 'lifeStealModifier',
                                        name: 'Vampiric Rounds',
                                        icon: '🩸',
                                        desc: 'Heal for 6% of direct damage dealt',
                                        costBase: 120,
                                        maxOwned: 4,

                                        onLifeSteal: amount => amount + 0.06
                                      },

                                      pierceModifier: {
                                        id: 'pierceModifier',
                                        name: 'Ricochet Core',
                                        icon: '🧿',
                                        desc: 'Projectiles pierce enemies and continue to another target',
                                        costBase: 115,
                                        maxOwned: 2,

                                        onForcePierce: () => true
                                      },

                                      ammoModifier: {
                                        id: 'ammoModifier',
                                        name: 'Conservation Chamber',
                                        icon: '🔋',
                                        desc: '15% chance for a shot not to consume ammunition',
                                        costBase: 90,
                                        maxOwned: 4,

                                        onAmmoSaveChance: chance => chance + 0.15
                                      },

                                      meleeRangeModifier: {
                                        id: 'meleeRangeModifier',
                                        name: 'Long Edge',
                                        icon: '⚔️',
                                        desc: '+25% melee range',
                                        costBase: 80,
                                        maxOwned: 4,

                                        onMeleeRange: range => range * 1.25
                                      },

                                      flashRadiusModifier: {
                                        id: 'flashRadiusModifier',
                                        name: 'Blinding Catalyst',
                                        icon: '✨',
                                        desc: '+30% flash grenade radius',
                                        costBase: 85,
                                        maxOwned: 4,

                                        onFlashRadius: radius => radius * 1.30
                                      },

                                      projectileSpeedModifier: {
                                        id: 'projectileSpeedModifier',
                                        name: 'Propulsion Coil',
                                        icon: '🚀',
                                        desc: '+20% projectile speed',
                                        costBase: 90,
                                        maxOwned: 4,

                                        onProjectileSpeed: speed => speed * 1.20
                                      }
                                    };

  const extraAbilities = {
          adrenalineVault: {
            id: "adrenalineVault",
            name: "Adrenaline Vault",
            icon: "🫀",
            desc: "Kills restore a burst of stamina.",
            costBase: 110,
            maxOwned: 3,
            special: "adrenalineVault",
          },
          parkourPlates: {
            id: "parkourPlates",
            name: "Parkour Plates",
            icon: "🥾",
            desc: "Jump pads and wall-jumps launch 18% harder per stack.",
            costBase: 95,
            maxOwned: 4,
            onMoveSpeedMult: (value) => value * 1.04,
          },
          steadyAim: {
            id: "steadyAim",
            name: "Steady Aim",
            icon: "◎",
            desc: "ADS spread is reduced a further 15%.",
            costBase: 90,
            maxOwned: 3,
            onSpread: (spread) => spread * 0.85,
          },
          secondWind: {
            id: "secondWind",
            name: "Second Wind",
            icon: "💨",
            desc: "Dash cooldown is 20% shorter per stack.",
            costBase: 120,
            maxOwned: 3,
            special: "secondWind",
          },
          goldRush: {
            id: "goldRush",
            name: "Gold Rush",
            icon: "🪙",
            desc: "Enemies drop 12% more coins.",
            costBase: 100,
            maxOwned: 4,
            special: "goldRush",
          },
          hunterMark: {
            id: "hunterMark",
            name: "Hunter's Mark",
            icon: "🧿",
            desc: "First shot on an enemy deals +20% damage.",
            costBase: 130,
            maxOwned: 2,
            onDamageMult: (value) => value * 1.06,
          },
        };
  Object.assign(ABILITY_CATALOG, extraAbilities);
  return ABILITY_CATALOG;
}
