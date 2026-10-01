export function createRoundModifiers() {
  const ROUND_MODIFIERS = {
                                      enemyFrenzy: {
                                        side: 'enemy',
                                        name: 'ENEMY FRENZY',
                                        icon: '💨',
                                        desc: 'Enemies move 35% faster.',
                                        enemySpeed: 1.35
                                      },

                                      enemyRage: {
                                        side: 'enemy',
                                        name: 'ENEMY RAGE',
                                        icon: '😡',
                                        desc: 'Enemies deal 30% more damage.',
                                        enemyDamage: 1.30
                                      },

                                      enemyArmor: {
                                        side: 'enemy',
                                        name: 'ENEMY ARMOR',
                                        icon: '🛡️',
                                        desc: 'Enemies have 35% more health.',
                                        enemyHealth: 1.35
                                      },

                                      enemyRapidFire: {
                                        side: 'enemy',
                                        name: 'RAPID ENEMY FIRE',
                                        icon: '🔴',
                                        desc: 'Enemies fire 35% faster.',
                                        enemyFireRate: 1.35
                                      },

                                      enemyFastBullets: {
                                        side: 'enemy',
                                        name: 'FAST ENEMY BULLETS',
                                        icon: '⚡',
                                        desc: 'Enemy bullets travel 60% faster.',
                                        enemyBulletSpeed: 1.60
                                      },

                                      enemySwarm: {
                                        side: 'enemy',
                                        name: 'ENEMY SWARM',
                                        icon: '🐜',
                                        desc: 'The round spawns 30% more enemies.',
                                        enemyCount: 1.30
                                      },

                                      enemyRegeneration: {
                                        side: 'enemy',
                                        name: 'ENEMY REGENERATION',
                                        icon: '💜',
                                        desc: 'Enemies slowly regenerate health.',
                                        enemyRegen: 4
                                      },

                                      enemyExplosive: {
                                        side: 'enemy',
                                        name: 'EXPLOSIVE ENEMIES',
                                        icon: '💣',
                                        desc: 'Enemies deal increased contact damage.',
                                        enemyContactDamage: 1.40
                                      },

                                      enemyRange: {
                                        side: 'enemy',
                                        name: 'ENEMY MARKSMEN',
                                        icon: '🎯',
                                        desc: 'Enemy attack range is increased.',
                                        enemyRange: 1.35
                                      },

                                      enemyReinforcements: {
                                        side: 'enemy',
                                        name: 'ENEMY REINFORCEMENTS',
                                        icon: '🚨',
                                        desc: 'Additional enemies appear during the round.',
                                        enemyCount: 1.20
                                      },

                                      playerPower: {
                                        side: 'player',
                                        name: 'OVERCHARGED WEAPONS',
                                        icon: '🔥',
                                        desc: 'The player deals 30% more damage.',
                                        playerDamage: 1.30
                                      },

                                      playerSpeed: {
                                        side: 'player',
                                        name: 'SPEED BOOST',
                                        icon: '🏃',
                                        desc: 'The player moves 30% faster.',
                                        playerSpeed: 1.30
                                      },

                                      playerSlow: {
                                        side: 'player',
                                        name: 'HEAVY GRAVITY',
                                        icon: '🐌',
                                        desc: 'The player moves 25% slower.',
                                        playerSpeed: 0.75
                                      },

                                      playerRapidFire: {
                                        side: 'player',
                                        name: 'RAPID FIRE',
                                        icon: '🔫',
                                        desc: 'The player fires 25% faster.',
                                        playerFireRate: 1.25
                                      },

                                      playerSlowReload: {
                                        side: 'player',
                                        name: 'JAMMED WEAPONS',
                                        icon: '⏳',
                                        desc: 'The player reloads 30% slower.',
                                        playerReload: 1.30
                                      },

                                      playerBulletSpeed: {
                                        side: 'player',
                                        name: 'HYPER VELOCITY',
                                        icon: '🚀',
                                        desc: 'Player projectiles travel 50% faster.',
                                        playerBulletSpeed: 1.50
                                      },

                                      playerDamageReduction: {
                                        side: 'player',
                                        name: 'ENERGY SHIELD',
                                        icon: '🔰',
                                        desc: 'The player takes 35% less damage.',
                                        playerDamageTaken: 0.65
                                      },

                                      instantAirdrop: {
                                        side: 'player',
                                        name: 'INSTANT AIRDROP',
                                        icon: '📦',
                                        desc: 'An airdrop is delivered at the beginning of the round.',
                                        instantAirdrop: true
                                      },

                                      enemyWeakness: {
                                        side: 'player',
                                        name: 'WEAKER ENEMIES',
                                        icon: '🧊',
                                        desc: 'Enemies have 30% less health.',
                                        enemyHealth: 0.70
                                      },

                                      enemySlowBullets: {
                                        side: 'player',
                                        name: 'SLOW ENEMY BULLETS',
                                        icon: '🐢',
                                        desc: 'Enemy bullets travel 40% slower.',
                                        enemyBulletSpeed: 0.60
                                      }
                                    };
  Object.assign(ROUND_MODIFIERS, {

                          enemyExplodeOnDeath: {
                            side: 'enemy',
                            name: 'LAST LAUGH',
                            icon: '💀',
                            desc: 'Enemies explode when they die.',
                            enemyExplodeOnDeath: true
                          },

                          enemySplit: {
                            side: 'enemy',
                            name: 'SPLITTERS',
                            icon: '🧬',
                            desc: 'Some defeated enemies split into smaller enemies.',
                            enemySplitOnDeath: true
                          },

                          enemyVampires: {
                            side: 'enemy',
                            name: 'VAMPIRE ENEMIES',
                            icon: '🧛',
                            desc: 'Enemies restore health whenever they damage the player.',
                            enemyLifeSteal: 0.20
                          },

                          enemyShielded: {
                            side: 'enemy',
                            name: 'ENERGY CORES',
                            icon: '🔵',
                            desc: 'Enemies periodically gain a temporary damage shield.',
                            enemyShieldInterval: 8,
                            enemyShieldDuration: 3
                          },

                          enemyTeleport: {
                            side: 'enemy',
                            name: 'PHANTOM ENEMIES',
                            icon: '👻',
                            desc: 'Enemies occasionally teleport a short distance.',
                            enemyTeleport: true
                          },

                          enemyDodgers: {
                            side: 'enemy',
                            name: 'DODGE PROTOCOL',
                            icon: '💫',
                            desc: 'Enemies have a chance to dodge incoming projectiles.',
                            enemyDodgeChance: 0.20
                          },

                          enemyKnockback: {
                            side: 'enemy',
                            name: 'HEAVY HITTERS',
                            icon: '🥊',
                            desc: 'Enemy attacks knock the player back much farther.',
                            enemyKnockback: 2
                          },

                          enemyBurning: {
                            side: 'enemy',
                            name: 'INFERNAL ENEMIES',
                            icon: '🔥',
                            desc: 'Enemies leave burning zones behind while moving.',
                            enemyFireTrail: true
                          },

                          enemyFreezing: {
                            side: 'enemy',
                            name: 'FROSTBITTEN',
                            icon: '❄️',
                            desc: 'Enemy attacks can temporarily slow the player.',
                            enemySlowEffect: 0.55
                          },

                          enemyLeapers: {
                            side: 'enemy',
                            name: 'LEAPERS',
                            icon: '🦘',
                            desc: 'Enemies periodically leap toward the player.',
                            enemyLeap: true
                          },

                          enemyMines: {
                            side: 'enemy',
                            name: 'MINEFIELD',
                            icon: '💣',
                            desc: 'Enemies leave proximity mines when they are defeated.',
                            enemyDeathMines: true
                          },

                          enemyDarkness: {
                            side: 'enemy',
                            name: 'BLACKOUT',
                            icon: '🌑',
                            desc: 'The player has significantly reduced visibility.',
                            playerVision: 0.45
                          },

                          enemyDecoys: {
                            side: 'enemy',
                            name: 'DECOY ARMY',
                            icon: '🎭',
                            desc: 'Fake enemies occasionally appear among the real enemies.',
                            enemyDecoys: true
                          },

                          enemyBerserk: {
                            side: 'enemy',
                            name: 'BERSERKER BLOOD',
                            icon: '🩸',
                            desc: 'Enemies become more dangerous when their health is low.',
                            enemyLowHealthBoost: 1.5
                          },

                          enemyCommander: {
                            side: 'enemy',
                            name: 'ENEMY COMMANDER',
                            icon: '👑',
                            desc: 'One powerful commander enemy appears during the round.',
                            enemyCommander: true
                          },

                          vampireWeapons: {
                            side: 'player',
                            name: 'BLOOD BULLETS',
                            icon: '🩸',
                            desc: 'A percentage of damage dealt heals the player.',
                            playerLifeSteal: 0.12
                          },

                          explosiveRounds: {
                            side: 'player',
                            name: 'EXPLOSIVE ROUNDS',
                            icon: '💥',
                            desc: 'Player bullets create small explosions on impact.',
                            playerExplosiveRounds: true
                          },

                          piercingRounds: {
                            side: 'player',
                            name: 'PHASE ROUNDS',
                            icon: '🔷',
                            desc: 'Player projectiles can pass through additional enemies.',
                            playerPierce: 2
                          },

                          bouncingRounds: {
                            side: 'player',
                            name: 'RICOCHET',
                            icon: '🔀',
                            desc: 'Player bullets can bounce off surfaces and enemies.',
                            playerRicochet: 2
                          },

                          homingRounds: {
                            side: 'player',
                            name: 'SMART BULLETS',
                            icon: '🧲',
                            desc: 'Player projectiles slightly home toward nearby enemies.',
                            playerHoming: true
                          },

                          criticalOverdrive: {
                            side: 'player',
                            name: 'CRITICAL OVERDRIVE',
                            icon: '🎯',
                            desc: 'Critical hits have a chance to trigger a second hit.',
                            playerCriticalChain: 0.25
                          },

                          meleeMaster: {
                            side: 'player',
                            name: 'MELEE MASTER',
                            icon: '⚔️',
                            desc: 'Melee attacks have greatly increased range and knockback.',
                            playerMeleeRange: 1.5,
                            playerMeleeKnockback: 1.75
                          },

                          lowGravity: {
                            side: 'player',
                            name: 'MOON GRAVITY',
                            icon: '🌙',
                            desc: 'Gravity is reduced, allowing much higher jumps.',
                            gravityMultiplier: 0.001
                          },

                          airControl: {
                            side: 'player',
                            name: 'AIR CONTROL',
                            icon: '🪽',
                            desc: 'The player can strongly control movement while airborne.',
                            playerAirControl: 2
                          },

                          infiniteSprint: {
                            side: 'player',
                            name: 'INFINITE SPRINT',
                            icon: '♾️',
                            desc: 'Sprint stamina does not drain during the round.',
                            infiniteStamina: true
                          },

                          ammoRecycler: {
                            side: 'player',
                            name: 'AMMO RECYCLER',
                            icon: '♻️',
                            desc: 'Defeated enemies have a chance to restore ammunition.',
                            ammoOnKillChance: 0.20
                          },

                          killSpeed: {
                            side: 'player',
                            name: 'KILL RUSH',
                            icon: '💨',
                            desc: 'Getting a kill briefly increases player movement speed.',
                            killSpeedBoost: 2,
                            killSpeedDuration: 3
                          },

                          killShield: {
                            side: 'player',
                            name: 'KILL SHIELD',
                            icon: '🛡️',
                            desc: 'Getting a kill grants a short temporary shield.',
                            shieldOnKill: true,
                            shieldDuration: 3
                          },

                          executioner: {
                            side: 'player',
                            name: 'EXECUTIONER',
                            icon: '🪓',
                            desc: 'Enemies below 10% health take greatly increased damage.',
                            executeThreshold: 0.10,
                            executeMultiplier: 3
                          },

                          glassCannon: {
                            side: 'player',
                            name: 'GLASS CANNON',
                            icon: '🔮',
                            desc: 'The player deals massive damage but takes increased damage.',
                            playerDamage: 1.75,
                            playerDamageTaken: 1.50
                          },

                          doubleTrouble: {
                            side: 'enemy',
                            name: 'DOUBLE TROUBLE',
                            icon: '👥',
                            desc: 'Enemies appear in pairs, but each has reduced health.',
                            enemyCount: 1.75,
                            enemyHealth: 0.65
                          },

                          chaosMode: {
                            side: 'enemy',
                            name: 'CHAOS MODE',
                            icon: '🌀',
                            desc: 'Enemy movement direction periodically changes unpredictably.',
                            enemyChaosMovement: true
                          },

                          reverseArena: {
                            side: 'enemy',
                            name: 'REVERSE GRAVITY',
                            icon: '🔄',
                            desc: 'Gravity periodically reverses for enemies.',
                            enemyReverseGravity: true
                          },

                          shrinkingArena: {
                            side: 'enemy',
                            name: 'SHRINKING ARENA',
                            icon: '⭕',
                            desc: 'The playable arena slowly becomes smaller during the round.',
                            arenaShrink: true
                          },

                          dangerousFloor: {
                            side: 'enemy',
                            name: 'DANGEROUS FLOOR',
                            icon: '🌋',
                            desc: 'Certain areas of the floor periodically become damaging.',
                            dangerousFloor: true
                          },

                          meteorStrike: {
                            side: 'enemy',
                            name: 'METEOR STORM',
                            icon: '☄️',
                            desc: 'Random areas are periodically targeted by falling meteors.',
                            meteorStrikes: true
                          },

                          blackoutPulse: {
                            side: 'enemy',
                            name: 'BLACKOUT PULSE',
                            icon: '📡',
                            desc: 'The arena briefly goes dark at regular intervals.',
                            blackoutInterval: 12,
                            blackoutDuration: 2
                          },

                          enemyClone: {
                            side: 'enemy',
                            name: 'CLONING PROTOCOL',
                            icon: '👯',
                            desc: 'A surviving enemy can occasionally create a weaker clone.',
                            enemyCloning: true
                          },

                          weaponRandomizer: {
                            side: 'player',
                            name: 'WILD WEAPONS',
                            icon: '🎲',
                            desc: 'The player periodically receives a random weapon effect.',
                            weaponRandomizer: true
                          },

                          oneHitWonder: {
                            side: 'player',
                            name: 'ONE HIT WONDER',
                            icon: '☝️',
                            desc: 'Player damage is massively increased, but maximum health is reduced.',
                            playerDamage: 2.5,
                            playerMaxHealth: 0.35
                          },

                          bulletTime: {
                            side: 'player',
                            name: 'BULLET TIME',
                            icon: '⏱️',
                            desc: 'Enemy projectiles move much slower while the player moves normally.',
                            enemyBulletSpeed: 0.35
                          },

                          adrenaline: {
                            side: 'player',
                            name: 'ADRENALINE',
                            icon: '⚡',
                            desc: 'The player becomes faster as their health gets lower.',
                            lowHealthSpeedBoost: 1.75
                          },

                          lastStand: {
                            side: 'player',
                            name: 'LAST STAND',
                            icon: '🚩',
                            desc: 'The player gains major bonuses while below 25% health.',
                            lowHealthDamage: 1.75,
                            lowHealthFireRate: 1.50,
                            lowHealthSpeed: 1.35
                          },
                                      babyMode: {
                                        side: 'player',
                                        name: 'BABY MODE',
                                        icon: '🍼',
                                        desc: 'Enemies spawn with one wave lower difficulty.',
                                        difficultyWaveOffset: -1
                                      },

                                      playerRegeneration: {
                                        side: 'player',
                                        name: 'REGENERATION',
                                        icon: '💚',
                                        desc: 'The player slowly regenerates health.',
                                        playerRegeneration: 4
                                      },

                                      playerArmor: {
                                        side: 'player',
                                        name: 'FORTIFIED ARMOR',
                                        icon: '🛡️',
                                        desc: 'The player takes 25% less damage.',
                                        playerDamageTaken: 0.75
                                      },

                                      playerAmmo: {
                                        side: 'player',
                                        name: 'AMMO CACHE',
                                        icon: '🔋',
                                        desc: 'The player receives additional ammunition.',
                                        playerAmmoMultiplier: 1.5
                                      },

                                      enemyWeaknessPlus: {
                                        side: 'player',
                                        name: 'FRAIL ENEMIES',
                                        icon: '🧊',
                                        desc: 'Enemies have 50% less health.',
                                        enemyHealth: 0.5
                                      },

                                      enemySlowdown: {
                                        side: 'player',
                                        name: 'SLOWED ENEMIES',
                                        icon: '🐌',
                                        desc: 'Enemies move 25% slower.',
                                        enemySpeed: 0.75
                                      },

                                      enemyDamageReduction: {
                                        side: 'player',
                                        name: 'WEAK ATTACKS',
                                        icon: '🪶',
                                        desc: 'Enemies deal 25% less damage.',
                                        enemyDamage: 0.75
                                      },

                                      playerSpeedPlus: {
                                        side: 'player',
                                        name: 'TURBO SPEED',
                                        icon: '⚡',
                                        desc: 'The player moves 50% faster.',
                                        playerSpeed: 1.5
                                      },

                                      playerFireRatePlus: {
                                        side: 'player',
                                        name: 'RAPID WEAPONS',
                                        icon: '🔫',
                                        desc: 'The player fires 40% faster.',
                                        playerFireRate: 1.4
                                      },

                                      instantHealing: {
                                        side: 'player',
                                        name: 'FULL RESTORE',
                                        icon: '❤️',
                                        desc: 'The player is fully healed at the beginning of the wave.',
                                        instantHealing: true
                                      },

                                      eliteLevel: {
                                        side: 'enemy',
                                        name: 'ELITE LEVEL',
                                        icon: '☠️',
                                        desc: 'Enemies use one wave higher difficulty.',
                                        difficultyWaveOffset: 1
                                      },

                                      tinyDevils: {
                                        side: 'enemy',
                                        name: 'TINY DEVILS',
                                        icon: '👹',
                                        desc: 'Enemies are 50% smaller, 10% faster, have 50% less health, and deal 5% less damage.',
                                        enemySize: 0.5,
                                        enemySpeed: 1.1,
                                        enemyHealth: 0.5,
                                        enemyDamage: 0.95
                                      },

                                      bigBoys: {
                                        side: 'enemy',
                                        name: 'BIG BOYS',
                                        icon: '🦍',
                                        desc: 'Enemies are 50% bigger, 10% slower, have 50% more health, and deal 5% more damage.',
                                        enemySize: 1.5,
                                        enemySpeed: 0.9,
                                        enemyHealth: 1.5,
                                        enemyDamage: 1.05
                                      },

                                      enemyHaste: {
                                        side: 'enemy',
                                        name: 'ENEMY HASTE',
                                        icon: '💨',
                                        desc: 'Enemies move 60% faster.',
                                        enemySpeed: 1.6
                                      },

                                      enemyOvercharge: {
                                        side: 'enemy',
                                        name: 'ENEMY OVERCHARGE',
                                        icon: '🔥',
                                        desc: 'Enemies deal 75% more damage.',
                                        enemyDamage: 1.75
                                      },

                                      enemyFortress: {
                                        side: 'enemy',
                                        name: 'ENEMY FORTRESS',
                                        icon: '🏰',
                                        desc: 'Enemies have double health.',
                                        enemyHealth: 2
                                      },

                                      enemySwarmPlus: {
                                        side: 'enemy',
                                        name: 'MASSIVE SWARM',
                                        icon: '🐜',
                                        desc: 'The wave contains 75% more enemies.',
                                        enemyCount: 1.75
                                      },

                                      enemyRapidFirePlus: {
                                        side: 'enemy',
                                        name: 'HELLFIRE',
                                        icon: '🔴',
                                        desc: 'Enemies fire 75% faster.',
                                        enemyFireRate: 1.75
                                      },

                                      enemyRegenerationPlus: {
                                        side: 'enemy',
                                        name: 'STRONG REGENERATION',
                                        icon: '💜',
                                        desc: 'Enemies regenerate health quickly.',
                                        enemyRegen: 12
                                      },

                                      enemyBulletStorm: {
                                        side: 'enemy',
                                        name: 'BULLET STORM',
                                        icon: '🌩️',
                                        desc: 'Enemy bullets travel 100% faster.',
                                        enemyBulletSpeed: 2
                                      },

                                      enemyContactPlus: {
                                        side: 'enemy',
                                        name: 'BRUTAL CONTACT',
                                        icon: '💥',
                                        desc: 'Enemy contact damage is doubled.',
                                        enemyContactDamage: 2
                                      }
                                    });
  return ROUND_MODIFIERS;
}
