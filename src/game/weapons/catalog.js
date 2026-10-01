// Fresh authoring objects are required because engine startup and save loading mutate W.
export function createWeaponData() {
// WEAPON AUTHORING SCHEMA — these are the knobs available to every weapon.
                                // Existing weapons may omit fields; the initializer fills safe defaults.
                                const WEAPON_MAKING_DEFAULTS = {
                                  damage: 25, rate: 500, mag: 10, reserve: 60, reload: 1400, range: 100, spread: 0.02,
                                  projectileSpeed: 1, critChance: 0, critDamage: 2, statusPower: 1, abilityPower: 1, knockback: 1,
                                  pellets: 1, burst: 1, chargeTime: 0, recoil: 1, falloffStart: 0.65, falloffEnd: 1,
                                  headshotMultiplier: 2, pierceCount: 0, splashRadius: 0, splashFalloff: 0.5, homing: 0,
                                  projectileGravity: 0, projectileLifetime: 0, chainTargets: 0, chainRange: 0, chainDamage: 0.65,
                                  statusDuration: 0, burnDamage: 0, freezeTime: 0, poisonDamage: 0, poisonDuration: 0,
                                  recoilRecovery: 1, movePenalty: 0, aimMultiplier: 1, hipSpreadMultiplier: 1,
                                  rarity: 'common', color: 0xffffff, tags: [], uniqueAbility: null, uniqueSpecial: null
                                };

                                const W = {
                                  arc:{
                                name:'Arc Cannon',
                                icon:'⚡',
                                damage:62,
                                rate:420,
                                mag:8,
                                reserve:64,
                                reload:1450,
                                spread:.008,
                                range:105,
                                arc:true,
                                arcTargets:4,
                                arcRange:13,
                                arcDamage:.65
                              },
                              genesisCannon: {
  name: 'Genesis Cannon',
  icon: '🌟',
  desc: 'Creates a radiant field that damages enemies and restores player health.',

  damage: 260,
  rate: 2400,
  mag: 1,
  reserve: 5,
  reload: 2800,
  spread: 0,
  range: 220,

  explosive: true,
  radius: 16,

  genesis: true,
  genesisDuration: 7,
  genesisDamage: 75,
  genesisHealing: 9,
  genesisTick: 0.75,

  color: 0xfef08a
},
                              chronoSingularity: {
  name: 'Chrono Singularity',
  icon: '🕳️',
  desc: 'Creates a temporal vortex that pulls in, damages, and freezes enemies.',

  damage: 180,
  rate: 2200,
  mag: 1,
  reserve: 6,
  reload: 3000,
  spread: 0,
  range: 260,

  explosive: true,
  radius: 18,

  chrono: true,
  chronoDuration: 5,
  chronoDamage: 55,
  chronoSlow: 0.12,
  chronoPullStrength: 7,

  color: 0x67e8f9
},
soulReaper: {
  name: 'Soul Reaper',
  icon: '☠️',
  desc: 'Kills restore health. Every third shot creates a gravity vortex.',

  damage: 70,
  rate: 420,
  mag: 18,
  reserve: 108,
  reload: 1400,
  spread: 0.02,
  range: 150,
  color: 0x8b5cf6,

  uniqueAbility: 'soulHarvest',
  uniqueSpecial: 'gravityVortex',

  specialEvery: 3,
  specialRadius: 10,
  specialDamage: 45,
  specialCooldown: 5
},
                              'void': {
                                name: 'Void Blaster',
                                icon: '🟣',
                                damage: 85,
                                rate: 700,
                                mag: 6,
                                reserve: 42,
                                reload: 1700,
                                spread: 0.006,
                                range: 130,
                                void: true,
                                radius: 6
                              },

                              cryo:{
                                name:'Cryo Shotgun',
                                icon:'❄️',
                                damage:22,
                                pellets:8,
                                rate:700,
                                mag:6,
                                reserve:48,
                                reload:1450,
                                spread:.095,
                                range:62,
                                freeze:true,
                                freezeTime:2.5
                              },
                            medkit: {
                          name: 'Medkit',
                          icon: '🩹',
                          damage: 0,
                          heal: 40,
                          rate: 600,
                          mag: 5,
                          reserve: 0,
                          reload: Infinity,
                          spread: 0,
                          range: 0,
                          medkit: true
                        },

                        bandage: {
                          name: 'Bandage',
                          icon: '🩹',
                          damage: 0,
                          heal: 20,
                          rate: 700,
                          mag: 5,
                          reserve: 0,
                          reload: Infinity,
                          spread: 0,
                          range: 0,
                          bandage: true
                        },

                              bigwhammies:{
                                name:'BIG WHAMMIES',
                                icon:'🐯️',
                                damage:40,
                                pellets:100,
                                rate:700,
                                mag:10,
                                reserve:48,
                                reload:1450,
                                spread:1,
                                range:62,
                              crit:true,
                              },
                              littlewhammies:{
                                name:'LITTLE WHAMMIES',
                                icon:'🤏',
                                damage:22,
                                pellets:30,
                                rate:700,
                                mag:6,
                                reserve:48,
                                reload:1450,
                                spread:.03,
                                range:62,
                                crit:true,
                              },

                              inferno:{
                                name:'Inferno Rifle',
                                icon:'🔥',
                                damage:28,
                                rate:110,
                                mag:32,
                                reserve:192,
                                reload:1350,
                                spread:.018,
                                range:125,
                                auto:true,
                                burn:true,
                                burnDamage:8,
                                burnTime:3
                              },

                              gravity:{
                                name:'Gravity Gun',
                                icon:'🌀',
                                damage:35,
                                rate:900,
                                mag:5,
                                reserve:35,
                                reload:1600,
                                spread:0,
                                range:80,
                                gravityGun:true,
                                pullRadius:10
                              },

                              rail:{
                                name:'Overcharged Railgun',
                                icon:'💠',
                                damage:260,
                                rate:1800,
                                mag:2,
                                reserve:20,
                                reload:2200,
                                spread:0,
                                range:350,
                                pierce:true,
                                rail:true,
                                knockback:8
                              },

                              meteor:{
                                name:'Meteor Launcher',
                                icon:'☄️',
                                damage:320,
                                rate:1600,
                                mag:2,
                                reserve:12,
                                reload:2000,
                                spread:0,
                                range:250,
                                explosive:true,
                                radius:16,
                                meteor:true
                              },

                              blade:{
                                name:'Energy Blade',
                                icon:'⚔️',
                                damage:130,
                                rate:300,
                                mag:1,
                                reserve:Infinity,
                                reload:0,
                                spread:0,
                                range:7,
                                melee:true,
                                energySlash:true
                              },

                              venom:{
                                name:'Venom SMG',
                                icon:'☠️',
                                damage:15,
                                rate:75,
                                mag:45,
                                reserve:225,
                                reload:1100,
                                spread:.028,
                                range:90,
                                auto:true,
                                poison:true,
                                poisonDamage:6,
                                poisonTime:4
                              },

                                  pulse: {
                                name: 'Pulse Rifle',
                                icon: '🟩',
                                damage: 38,
                                rate: 160,
                                mag: 36,
                                reserve: 216,
                                reload: 1300,
                                spread: 0.012,
                                range: 180,
                                auto: true,
                                pulse: true
                              },

                              burstPistol: {
                                name: 'Burst Pistol',
                                icon: '🔹',
                                damage: 24,
                                rate: 520,
                                burst: 3,
                                mag: 18,
                                reserve: 144,
                                reload: 1150,
                                spread: 0.018,
                                range: 110
                              },
                              nuke:{
                               name:'TACTICAL NUKE',
                               icon:'☢️',
                               damage:99999,
                               rate:5000,
                               mag:1,
                               reserve:1,
                               reload:5000,
                               spread:0,
                               range:500,
                               explosive:true,
                               radius:75,
                               nuke:true
                              },
                              goldenPistol:{
                                name:'Golden Eagle Pistol',
                                icon:'🟨',
                                damage:42,
                                rate:220,
                                mag:14,
                                reserve:140,
                                reload:900,
                                spread:.008,
                                range:120,
                                crit:true
                              },

                              plasmaPistol:{
                                name:'Plasma Pistol',
                                icon:'🔵',
                                damage:55,
                                rate:300,
                                mag:10,
                                reserve:100,
                                reload:1100,
                                spread:.006,
                                range:150,
                                explosive:true,
                                radius:3
                              },

                              shadowPistol:{
                                name:'Shadow Pistol',
                                icon:'⚫',
                                damage:70,
                                rate:260,
                                mag:8,
                                reserve:80,
                                reload:1000,
                                spread:.004,
                                range:180,
                                pierce:true
                              },

                              rapidPistol:{
                                name:'Rapid Fire Pistol',
                                icon:'🔫',
                                damage:24,
                                rate:90,
                                mag:32,
                                reserve:256,
                                reload:950,
                                spread:.025,
                                range:100,
                                auto:true
                              },

                              voidPistol:{
                                name:'Void Hand Cannon',
                                icon:'🟣',
                                damage:120,
                                rate:600,
                                mag:5,
                                reserve:40,
                                reload:1500,
                                spread:.002,
                                range:220,
                                void:true,
                                radius:5
                              },

                              omegaPistol:{
                                name:'Omega Pistol',
                                icon:'⚛️',
                                damage:160,
                                rate:850,
                                mag:3,
                                reserve:30,
                                reload:1800,
                                spread:0,
                                range:300,
                                pierce:true,
                                explosive:true,
                                radius:4
                              },

                              scatterCannon: {
                                name: 'Scatter Cannon',
                                icon: '🟧',
                                damage: 18,
                                pellets: 14,
                                rate: 900,
                                mag: 4,
                                reserve: 40,
                                reload: 1800,
                                spread: 0.14,
                                range: 65
                              },

                                  pistol:{name:'Pistol',icon:'🔫',damage:28,rate:240,mag:12,reserve:96,reload:1000,spread:.012,range:90},
                                      laser:{name:'Laser Rifle',icon:'🔴',damage:34,rate:120,mag:28,reserve:140,reload:1250,spread:.006,range:190,auto:true},
                                  dual:{name:'Dual Pistols',icon:'🔫',damage:20,rate:130,mag:24,reserve:144,reload:1200,spread:.022,range:95,auto:true},
                                  shockwave:{name:'Shockwave Cannon',icon:'🌊',damage:110,rate:800,mag:4,reserve:28,reload:1500,spread:.03,range:55,explosive:true,radius:7},
                                  minigun:{name:'Minigun',icon:'🟠',damage:15,rate:45,mag:120,reserve:480,reload:2800,spread:.045,range:120,auto:true},
                                  freeze:{name:'Freeze Ray',icon:'❄️',damage:18,rate:100,mag:35,reserve:210,reload:1500,spread:.012,range:100,auto:false,freeze:true,freezeTime:5},
                                  boomerang:{name:'Boomerang Blade',icon:'🌀',damage:95,rate:650,mag:2,reserve:12,reload:1200,spread:0,range:100,pierce:true},
                                  rifle:{name:'Rifle',icon:'🔫',damage:22,rate:95,mag:30,reserve:150,reload:1150,spread:.010,range:130,auto:true},
                                  shotgun:{name:'Shotgun',icon:'💥',damage:14,pellets:9,rate:650,mag:6,reserve:48,reload:1350,spread:.10,range:58},
                                  smg:{name:'SMG',icon:'🟦',damage:12,rate:68,mag:40,reserve:180,reload:1050,spread:.026,range:82,auto:true},
                                  elementaloverpowerde:{name:'Elemental Cannon',icon:'🌊',damage:5,rate:800,mag:1000,reserve:1000,reload:1050,spread:0,range:82,
                                    poison:true,poisonDamage:6,poisonTime:9999999,
                                    freeze:true,freezeTime:99999999,
                                    burn:true,burnDamage:8,burnTime:9999999999},
                                 sniper: {
                    name: 'Sniper',
                    icon: '🎯',
                    damage: 100,
                    headshotMultiplier: 3,
                    rate: 1000,
                    mag: 5,
                    reserve: 35,
                    reload: 1650,
                    spread: 0.0015,
                    range: 240
                  },

                                  grenade:{name:'Grenade',icon:'💣',damage:150,rate:900,mag:2,reserve:10,reload:1500,spread:0,range:34,explosive:true,radius:10},
                                 flash: {
                    name: 'Flash Grenade',
                    icon: '✨',
                    damage: 12,
                    rate: 850,
                    mag: 2,
                    reserve: 10,
                    reload: 1350,
                    spread: 0,
                    range: 30,
                    radius: 10,
                    flash: true
                  },

                                  rocket:{name:'Rocket Launcher',icon:'🚀',damage:240,rate:1150,mag:1,reserve:8,reload:1650,spread:.006,range:200,explosive:true,radius:14},
                                  knife:{name:'Knife',icon:'🔪',damage:75,rate:360,mag:1,reserve:Infinity,reload:0,spread:0,range:5.5,melee:true},
                                  lmg:{name:'LMG',icon:'🟫',damage:19,rate:100,mag:75,reserve:300,reload:2000,spread:.030,range:115,auto:true},
                                  burst:{name:'Burst Rifle',icon:'⚡',damage:24,rate:390,burst:3,mag:24,reserve:150,reload:1350,spread:.015,range:145},
                                  railgun:{name:'Railgun',icon:'🔷',damage:180,rate:1450,mag:3,reserve:24,reload:2100,spread:0,range:290,pierce:true},
                                  flamethrower:{name:'Flamethrower',icon:'🔥',damage:10,rate:55,mag:100,reserve:360,reload:1950,spread:.075,range:27,flame:true,auto:true,flameTick:7},
                                  mine:{name:'Proximity Mine',icon:'🧨',damage:180,rate:700,mag:2,reserve:12,reload:1550,spread:0,range:20,mine:true,radius:11},
                                  plasma:{name:'Plasma Gun',icon:'🟢',damage:42,rate:300,mag:20,reserve:120,reload:1400,spread:.008,range:155,explosive:true,radius:4,auto:true},
                                  crossbow:{name:'Crossbow',icon:'🏹',damage:145,rate:850,mag:1,reserve:24,reload:1200,spread:0,range:210,pierce:true},
                                  cluster:{name:'Cluster Grenade',icon:'🟣',damage:85,rate:1000,mag:2,reserve:8,reload:1600,spread:0,range:35,explosive:true,radius:9,cluster:true}
                                };
                              const START_LOADOUT = ['rifle', 'shotgun', 'smg', 'grenade', 'rocket'];
                              Object.assign(W, {
                                solarFlare: {
                                  name: 'Solar Flare',
                                  icon: '☀️',
                                  damage: 180,
                                  rate: 1200,
                                  mag: 3,
                                  reserve: 18,
                                  reload: 1700,
                                  spread: 0.01,
                                  range: 180,
                                  explosive: true,
                                  radius: 12,
                                  color: 0xffb000
                                },

                                teslaCoil: {
                                  name: 'Tesla Coil',
                                  icon: '⚡',
                                  damage: 48,
                                  rate: 500,
                                  mag: 12,
                                  reserve: 72,
                                  reload: 1400,
                                  spread: 0.01,
                                  range: 120,
                                  arc: true,
                                  arcTargets: 5,
                                  arcRange: 15,
                                  arcDamage: 0.7
                                },

                                voidNova: {
                                  name: 'Void Nova',
                                  icon: '🌌',
                                  damage: 110,
                                  rate: 950,
                                  mag: 4,
                                  reserve: 28,
                                  reload: 1800,
                                  spread: 0,
                                  range: 150,
                                  void: true,
                                  radius: 8
                                },

                                frostBurst: {
                                  name: 'Frost Burst',
                                  icon: '🧊',
                                  damage: 30,
                                  pellets: 10,
                                  rate: 780,
                                  mag: 5,
                                  reserve: 45,
                                  reload: 1600,
                                  spread: 0.11,
                                  range: 65,
                                  freeze: true,
                                  freezeTime: 4
                                },

                                plagueCaster: {
                                  name: 'Plague Caster',
                                  icon: '🦠',
                                  damage: 35,
                                  rate: 360,
                                  mag: 16,
                                  reserve: 96,
                                  reload: 1450,
                                  spread: 0.025,
                                  range: 125,
                                  poison: true,
                                  poisonDamage: 12,
                                  poisonTime: 6
                                },

                                magmaRepeater: {
                                  name: 'Magma Repeater',
                                  icon: '🌋',
                                  damage: 32,
                                  rate: 145,
                                  mag: 26,
                                  reserve: 156,
                                  reload: 1500,
                                  spread: 0.022,
                                  range: 135,
                                  auto: true,
                                  burn: true,
                                  burnDamage: 11,
                                  burnTime: 4
                                },

                                thunderHammer: {
                                  name: 'Thunder Hammer',
                                  icon: '🔨',
                                  damage: 190,
                                  rate: 720,
                                  mag: 1,
                                  reserve: Infinity,
                                  reload: 0,
                                  spread: 0,
                                  range: 8,
                                  melee: true,
                                  energySlash: true
                                },

                                cometLauncher: {
                                  name: 'Comet Launcher',
                                  icon: '🌠',
                                  damage: 390,
                                  rate: 1900,
                                  mag: 2,
                                  reserve: 14,
                                  reload: 2200,
                                  spread: 0,
                                  range: 300,
                                  meteor: true,
                                  radius: 18
                                },

                                sonicBoom: {
                                  name: 'Sonic Boom',
                                  icon: '🔊',
                                  damage: 125,
                                  rate: 1000,
                                  mag: 5,
                                  reserve: 35,
                                  reload: 1650,
                                  spread: 0.02,
                                  range: 75,
                                  explosive: true,
                                  radius: 9
                                },

                                ricochetCannon: {
                                  name: 'Ricochet Cannon',
                                  icon: '🔄',
                                  damage: 95,
                                  rate: 650,
                                  mag: 8,
                                  reserve: 64,
                                  reload: 1350,
                                  spread: 0.01,
                                  range: 220,
                                  pierce: true
                                },

                                plasmaBurst: {
                                  name: 'Plasma Burst',
                                  icon: '🟢',
                                  damage: 70,
                                  rate: 420,
                                  burst: 3,
                                  mag: 15,
                                  reserve: 90,
                                  reload: 1550,
                                  spread: 0.015,
                                  range: 170,
                                  auto: false,
                                  explosive: true,
                                  radius: 4
                                },

                                acidSprayer: {
                                  name: 'Acid Sprayer',
                                  icon: '🧪',
                                  damage: 9,
                                  rate: 60,
                                  mag: 90,
                                  reserve: 360,
                                  reload: 2100,
                                  spread: 0.085,
                                  range: 32,
                                  auto: true,
                                  poison: true,
                                  poisonDamage: 8,
                                  poisonTime: 5
                                },

                                photonLance: {
                                  name: 'Photon Lance',
                                  icon: '🔆',
                                  damage: 230,
                                  rate: 1550,
                                  mag: 3,
                                  reserve: 24,
                                  reload: 1900,
                                  spread: 0,
                                  range: 320,
                                  pierce: true,
                                  knockback: 10
                                },

                                gravityNova: {
                                  name: 'Gravity Nova',
                                  icon: '🌀',
                                  damage: 75,
                                  rate: 1100,
                                  mag: 4,
                                  reserve: 32,
                                  reload: 1800,
                                  spread: 0,
                                  range: 100,
                                  gravityGun: true,
                                  pullRadius: 16
                                },

                                wildfire: {
                                  name: 'Wildfire Projector',
                                  icon: '🔥',
                                  damage: 15,
                                  rate: 48,
                                  mag: 120,
                                  reserve: 420,
                                  reload: 2300,
                                  spread: 0.09,
                                  range: 30,
                                  auto: true,
                                  flame: true,
                                  flameTick: 12,
                                  burn: true,
                                  burnDamage: 10,
                                  burnTime: 4
                                },

                                starfall: {
                                  name: 'Starfall',
                                  icon: '✨',
                                  damage: 500,
                                  rate: 2600,
                                  mag: 1,
                                  reserve: 8,
                                  reload: 2800,
                                  spread: 0,
                                  range: 380,
                                  meteor: true,
                                  radius: 22
                                },

                                chainFrost: {
                                  name: 'Chain Frost',
                                  icon: '❄️',
                                  damage: 42,
                                  rate: 600,
                                  mag: 10,
                                  reserve: 70,
                                  reload: 1500,
                                  spread: 0.012,
                                  range: 145,
                                  arc: true,
                                  arcTargets: 6,
                                  arcRange: 18,
                                  arcDamage: 0.55,
                                  freeze: true,
                                  freezeTime: 2
                                },

                                bioRocket: {
                                  name: 'Bio Rocket',
                                  icon: '☣️',
                                  damage: 210,
                                  rate: 1300,
                                  mag: 2,
                                  reserve: 16,
                                  reload: 1750,
                                  spread: 0.008,
                                  range: 190,
                                  explosive: true,
                                  radius: 13,
                                  poison: true,
                                  poisonDamage: 10,
                                  poisonTime: 5
                                },

                                eclipseBlade: {
                                  name: 'Eclipse Blade',
                                  icon: '🌑',
                                  damage: 240,
                                  rate: 430,
                                  mag: 1,
                                  reserve: Infinity,
                                  reload: 0,
                                  spread: 0,
                                  range: 9,
                                  melee: true,
                                  energySlash: true
                                },

                                antimatterRifle: {
                                  name: 'Antimatter Rifle',
                                  icon: '⚛️',
                                  damage: 420,
                                  rate: 2100,
                                  mag: 2,
                                  reserve: 18,
                                  reload: 2400,
                                  spread: 0,
                                  range: 400,
                                  pierce: true,
                                  explosive: true,
                                  radius: 6
                                }
                              });
  return { WEAPON_MAKING_DEFAULTS, W, START_LOADOUT };
}
