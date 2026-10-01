export function createEnemyAuthoringData() {
  const ENEMY_MAKING_DEFAULTS = {
                                       hp: 75, speed: 2.15, damage: 12, range: 0, size: 0.9, armor: 0, shield: 0,
                                       accuracy: 0.75, aggression: 1, attackCooldown: 0.8, attackWindup: 0, preferredRange: 0,
                                       chaseRange: 80, leashRange: 140, retreatHealth: 0, dodgeChance: 0, dodgeDistance: 0,
                                       critChance: 0, critDamage: 1.5, knockbackResistance: 0, stunResistance: 0,
                                       fireResistance: 0, iceResistance: 0, poisonResistance: 0, explosiveResistance: 0,
                                       climbAbility: 0, jumpAbility: 0, jumpHeight: 0, wallRunAbility: 0, airControl: 1,
                                       turnSpeed: 1, acceleration: 1, deceleration: 1, orbitDistance: 0, strafeAmount: 0,
                                       projectileSpeed: 1, projectileLifetime: 0, statusPower: 1, healPower: 1, supportRange: 0,
                                       xp: 10, score: 10, lootLuck: 0, eliteChance: 0, boss: false, tags: []
                                     };
  const ENEMY_ARCHETYPES = {
                                       grunt: { role:'melee', climbAbility:1, jumpAbility:1, aggression:1, armor:0, accuracy:.9 },
                                       runner: { role:'rush', climbAbility:1, jumpAbility:1, aggression:1.35, dodgeChance:.08, speed:5 },
                                       brute: { role:'bruiser', climbAbility:.7, armor:.12, knockbackResistance:.55, aggression:1.1 },
                                       tank: { role:'tank', climbAbility:.5, armor:.28, knockbackResistance:.8, aggression:.9 },
                                       assassin: { role:'ambush', climbAbility:1.25, jumpAbility:1.2, dodgeChance:.18, aggression:1.4 },
                                       ranger: { role:'ranged', accuracy:.82, preferredRange:34, aggression:.9 },
                                       sniper: { role:'sniper', accuracy:.97, preferredRange:80, aggression:.7 },
                                       medic: { role:'support', supportRange:26, healPower:1.25, aggression:.65 },
                                       sentinel: { role:'parry', armor:.08, parryChance:.18, aggression:.9 },
                                       juggernaut: { role:'tank', armor:.32, knockbackResistance:.9, climbAbility:.65, aggression:1.05 },
                                       shaman: { role:'support', supportRange:30, statusPower:1.2, aggression:.65 },
                                       grappler: { role:'control', climbAbility:1.3, jumpAbility:1.1, aggression:1.15 },
                                       shieldbearer: { role:'tank', armor:.2, shield:60, knockbackResistance:.75, aggression:.85 },
                                       divine: { role:'boss', armor:.18, climbAbility:1, boss:true, lootLuck:2, eliteChance:1 },
                                       chronomancer: { role:'control', statusPower:1.4, climbAbility:.8, aggression:.8 },
                                       voidling: { role:'teleport', climbAbility:1.2, dodgeChance:.2, aggression:1.25 }
                                     };
  return { ENEMY_MAKING_DEFAULTS, ENEMY_ARCHETYPES };
}
