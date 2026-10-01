// Static tuning values; runtime movement and combat state remains in the engine.
export function createCoreTuning() {
const CORE_TUNING = {
  fireSpreadMultiplier: 0.88,
  earlyWaveEnemyScale: 0.92,
  lateWaveEnemyScale: 1.05,
  spawnDelayFloor: 120,
  enemyBulletBias: 0.92,
  playerReloadBias: 0.96
};
  return CORE_TUNING;
}

export const MAX_STAMINA = 100;
export const STAMINA_DRAIN = 24;
export const STAMINA_REGEN = 18;
export const STAMINA_REGEN_DELAY = 0.35;
export const STAMINA_EXHAUSTED_THRESHOLD = 25;
export const MANTLE_MIN_HEIGHT = 0.45;
export const MANTLE_MAX_HEIGHT = 2.55;
export const MANTLE_REACH = 1.45;
export const MANTLE_CLEARANCE = 0.08;
export const STAMINA_WARNING_COOLDOWN = 0.75;
export const PARRY_WINDOW = 0.18;
export const PARRY_RANGE = 7.5;
export const PARRY_CONE_DOT = 0.35;
export const PARRY_SPEED_MULTIPLIER = 1.65;
export const PARRY_DAMAGE_MULTIPLIER = 1.5;
export const SENTINEL_PARRY_BASE_CHANCE = 0.42;
export const SENTINEL_PARRY_COOLDOWN = 1.25;
export const SENTINEL_PARRY_MIN_DISTANCE = 3;
export const SENTINEL_PARRY_MAX_DISTANCE = 30;
export const SENTINEL_PARRY_DAMAGE_MULTIPLIER = 1.5;
export const SENTINEL_PARRY_SPEED = 12;
export const PLAYER_RADIUS = 0.55;
export const PLAYER_EYE_HEIGHT = 1.7;
export const JUMP_FORCE = 10.5;
export const ASCENT_GRAVITY = 24;
export const DESCENT_GRAVITY = 30;
export const JUMP_CUT_MULTIPLIER = 0.78;
export const JUMP_CUT_MIN_VELOCITY = 2.25;
export const WALL_CLIMB_SPEED = 4.2;
export const WALL_CLIMB_LOOK_THRESHOLD = 0.28;
export const WALL_CONTACT_DISTANCE = 0.18;
export const WALL_CLIMB_MAX_STEP = 0.45;
export const WALL_RUN_SPEED = 8.5;
export const WALL_RUN_DURATION = 1.15;
export const WALL_RUN_MIN_SPEED = 4.5;
export const WALL_RUN_JUMP_FORCE = 9.5;
export const COMBO_DURATION = 3.2;
export const WALK_SPEED = 4.5;
export const AIR_SPEED_MULTIPLIER = 0.72;
export const SPRINT_SPEED = 8.0;
export const ACCELERATION = 14;
export const DECELERATION = 18;
export const SLIDE_SPEED = 12.5;
export const SLIDE_DURATION = 0.65;
export const SLIDE_COOLDOWN = 0.35;
export const SLIDE_STAMINA_COST = 12;
export const COYOTE_TIME = 0.14;
export const JUMP_BUFFER_TIME = 0.16;
export const AIR_ACCELERATION = 7.5;
export const VAULT_MIN_SPEED = 4.5;
export const VAULT_MAX_HEIGHT = 1.65;
export const VAULT_ENTRY_DISTANCE = 1.35;
export const VAULT_DURATION = 0.32;
export const VAULT_COOLDOWN = 0.20;
export const MANTLE_COOLDOWN = 0.28;
export const WALL_JUMP_FORCE = 11.5;
export const WALL_JUMP_PUSH = 7.0;
export const WALL_JUMP_COOLDOWN = 0.18;
export const LANDING_BOOST_SPEED = 0.6;
export const HEADSHOT_MULTIPLIER = 2;
export const NORMAL_FOV = 75;
export const AIM_FOV = 55;
export const SNIPER_AIM_FOV = 12;
