import * as THREE from 'three';
import { MAX_STAMINA, STAMINA_REGEN_DELAY, STAMINA_DRAIN, STAMINA_REGEN, STAMINA_EXHAUSTED_THRESHOLD, SLIDE_STAMINA_COST, STAMINA_WARNING_COOLDOWN, SLIDE_DURATION, SLIDE_SPEED, SLIDE_COOLDOWN, WALK_SPEED, JUMP_FORCE, COYOTE_TIME, WALL_JUMP_PUSH, WALL_JUMP_FORCE, WALL_JUMP_COOLDOWN, PLAYER_RADIUS, VAULT_MIN_SPEED, PLAYER_EYE_HEIGHT, VAULT_MAX_HEIGHT, VAULT_ENTRY_DISTANCE, VAULT_DURATION, VAULT_COOLDOWN, WALL_RUN_DURATION, WALL_RUN_SPEED, SPRINT_SPEED, AIR_SPEED_MULTIPLIER, ACCELERATION, AIR_ACCELERATION, DECELERATION, JUMP_CUT_MIN_VELOCITY, JUMP_CUT_MULTIPLIER, WALL_CLIMB_SPEED, ASCENT_GRAVITY, DESCENT_GRAVITY, LANDING_BOOST_SPEED } from '../config/tuning.js';
import { createMovementState } from './movement-state.js';

// Collision/world queries and gameplay effects are supplied by the engine.
export function createMovementController({ input, engine }) {
  const motion = createMovementState();

  function isSprintHeld() {
    return input.isSprintHeld();
  }

  function consumeStamina(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      return true;
    }

    if (engine.hasRoundModifier('infiniteStamina')) {
      motion.stamina = MAX_STAMINA;
      motion.staminaRegenDelay = 0;
      motion.sprintExhausted = false;
      motion.staminaWarningCooldown = 0;

      return true;
    }

    if (motion.stamina < amount) {
      return false;
    }

    motion.stamina = Math.max(0, motion.stamina - amount);
    motion.staminaRegenDelay = STAMINA_REGEN_DELAY;

    if (motion.stamina <= 0) {
      motion.sprintExhausted = true;
    }

    return true;
  }

  function updateStamina(dt, moving = false, sprinting = false) {
    const safeDt = THREE.MathUtils.clamp(
      Number(dt) || 0,
      0,
      0.05
    );

    motion.staminaWarningCooldown = Math.max(
      0,
      motion.staminaWarningCooldown - safeDt
    );

    if (safeDt <= 0) {
      engine.renderStaminaHud();
      return;
    }

    if (engine.hasRoundModifier('infiniteStamina')) {
      motion.stamina = MAX_STAMINA;
      motion.staminaRegenDelay = 0;
      motion.sprintExhausted = false;
      motion.staminaWarningCooldown = 0;

      engine.renderStaminaHud();
      return;
    }

    motion.stamina = THREE.MathUtils.clamp(
      Number.isFinite(motion.stamina) ? motion.stamina : MAX_STAMINA,
      0,
      MAX_STAMINA
    );

    motion.staminaRegenDelay = Math.max(
      0,
      motion.staminaRegenDelay - safeDt
    );

    if (sprinting && moving && !motion.sprintExhausted) {
      motion.stamina = Math.max(
        0,
        motion.stamina - STAMINA_DRAIN * safeDt
      );

      motion.staminaRegenDelay = STAMINA_REGEN_DELAY;

      if (motion.stamina <= 0) {
        motion.stamina = 0;
        motion.sprintExhausted = true;
      }

      engine.renderStaminaHud();
      return;
    }

    if (!isSprintHeld()) {
      motion.sprintExhausted = false;
    }

    const sprintingWhileMoving =
      isSprintHeld() &&
      moving &&
      !motion.sprintExhausted;

    // Do not regenerate while sliding or during the regen delay.
    if (
      motion.sliding ||
      motion.staminaRegenDelay > 0 ||
      sprintingWhileMoving
    ) {
      engine.renderStaminaHud();
      return;
    }

    motion.stamina = Math.min(
      MAX_STAMINA,
      motion.stamina + STAMINA_REGEN * safeDt
    );

    if (motion.stamina >= STAMINA_EXHAUSTED_THRESHOLD) {
      motion.sprintExhausted = false;
    }

    engine.renderStaminaHud();
  }

  function getSafeStamina() {
    const value = Number.isFinite(motion.stamina)
      ? motion.stamina
      : MAX_STAMINA;

    return THREE.MathUtils.clamp(
      value,
      0,
      MAX_STAMINA
    );
  }

  function getMovementDirection(inputSide, inputForward) {
    const inputLength = Math.hypot(
      inputSide,
      inputForward
    );

    if (inputLength <= 0) {
      return new THREE.Vector3();
    }

    const forward = new THREE.Vector3();
    engine.camera.getWorldDirection(forward);
    forward.y = 0;

    if (forward.lengthSq() === 0) {
      forward.set(0, 0, -1);
    } else {
      forward.normalize();
    }

    const right = new THREE.Vector3(
      -forward.z,
      0,
      forward.x
    );

    return forward
      .multiplyScalar(inputForward / inputLength)
      .add(
        right.multiplyScalar(inputSide / inputLength)
      )
      .normalize();
  }

  function getCurrentMoveDirection() {
    const inputSide =
      (input.isKeyDown('KeyD') ? 1 : 0) -
      (input.isKeyDown('KeyA') ? 1 : 0);

    const inputForward =
      (input.isKeyDown('KeyW') ? 1 : 0) -
      (input.isKeyDown('KeyS') ? 1 : 0);

    let direction = getMovementDirection(
      inputSide,
      inputForward
    );

    if (direction.lengthSq() <= 0.0001) {
      direction.set(
        motion.moveVelocityX,
        0,
        motion.moveVelocityZ
      );

      if (direction.lengthSq() > 0.0001) {
        direction.normalize();
      }
    }

    if (direction.lengthSq() <= 0.0001) {
      engine.camera.getWorldDirection(direction);
      direction.y = 0;

      if (direction.lengthSq() <= 0.0001) {
        direction.set(0, 0, -1);
      } else {
        direction.normalize();
      }
    }

    return direction;
  }

  function startSlide(direction = null) {
    if (
      !engine.alive ||
      engine.dying ||
      !engine.hasGameplayInput() ||
      motion.sliding ||
      motion.slideCooldown > 0 ||
      !motion.grounded
    ) {
      return false;
    }

    const finalDirection =
      direction?.clone() || getCurrentMoveDirection();

    finalDirection.setY(0);

    if (finalDirection.lengthSq() <= 0.0001) {
      return false;
    }

    finalDirection.normalize();

    // Consume slide stamina exactly once.
    if (!consumeStamina(SLIDE_STAMINA_COST)) {
      if (motion.staminaWarningCooldown <= 0) {
        engine.showFeed('NOT ENOUGH STAMINA', '#fca5a5');
        motion.staminaWarningCooldown = STAMINA_WARNING_COOLDOWN;
      }

      return false;
    }

    motion.sliding = true;
    motion.slideTimer = SLIDE_DURATION;
    motion.slideDirection.copy(finalDirection);

    motion.moveVelocityX = motion.slideDirection.x * SLIDE_SPEED;
    motion.moveVelocityZ = motion.slideDirection.z * SLIDE_SPEED;

    engine.showFeed('SLIDE', '#bae6fd');
    engine.renderStaminaHud();

    return true;
  }

  function stopSlide() {
    if (!motion.sliding) {
      return;
    }

    motion.sliding = false;
    motion.slideTimer = 0;
    motion.slideCooldown = SLIDE_COOLDOWN;

    const horizontalSpeed = Math.hypot(
      motion.moveVelocityX,
      motion.moveVelocityZ
    );

    const maximumExitSpeed = WALK_SPEED;

    if (horizontalSpeed > maximumExitSpeed) {
      const scale = maximumExitSpeed / horizontalSpeed;

      motion.moveVelocityX *= scale;
      motion.moveVelocityZ *= scale;
    }
  }

  function updateSlide(dt) {
    const safeDt = THREE.MathUtils.clamp(
      Number(dt) || 0,
      0,
      0.05
    );

    motion.slideCooldown = Math.max(
      0,
      motion.slideCooldown - safeDt
    );

    if (!motion.sliding) {
      return false;
    }

    // A slide must end immediately if the player leaves the ground.
    if (
      !engine.alive ||
      engine.dying ||
      !engine.hasGameplayInput() ||
      !motion.grounded
    ) {
      stopSlide();
      return false;
    }

    motion.slideTimer -= safeDt;

    const progress = THREE.MathUtils.clamp(
      motion.slideTimer / SLIDE_DURATION,
      0,
      1
    );

    const speed = THREE.MathUtils.lerp(
      WALK_SPEED,
      SLIDE_SPEED,
      progress
    );

    motion.moveVelocityX = motion.slideDirection.x * speed;
    motion.moveVelocityZ = motion.slideDirection.z * speed;

    engine.movePlayerWithCollision(
      new THREE.Vector3(
        motion.moveVelocityX * safeDt,
        0,
        motion.moveVelocityZ * safeDt
      )
    );

    if (
      motion.slideTimer <= 0 ||
      !isSprintHeld()
    ) {
      stopSlide();
    }

    return true;
  }

  function performParkourJump(force = JUMP_FORCE, fromJumpPad = false) {
    if (!engine.alive || engine.dying || !engine.hasGameplayInput()) {
      return false;
    }

    const normalJump = !fromJumpPad && (motion.grounded || motion.coyoteTimer > 0);
    const horizontalSpeed = Math.hypot(
      motion.moveVelocityX,
      motion.moveVelocityZ
    );

    const momentumBonus = THREE.MathUtils.clamp(
      horizontalSpeed * 0.12,
      0,
      1.8
    );

    let jumpForce = force + momentumBonus;

    if (fromJumpPad) {
      jumpForce = Math.max(
        engine.JUMP_PAD_MIN_FORCE,
        force * engine.JUMP_PAD_FORCE_MULTIPLIER
      );

      motion.jumpCutGraceTimer = engine.JUMP_PAD_JUMP_CUT_GRACE;
    } else {
      motion.jumpCutGraceTimer = 0;
    }

    motion.jumpCutApplied = false;
    motion.velocityY = jumpForce;
    motion.grounded = false;
    motion.coyoteTimer = 0;
    motion.jumpBufferTimer = 0;

    engine.playSound(
      'jump',
      fromJumpPad ? 1.1 : 0.95,
      fromJumpPad ? 1.2 : 1 + Math.min(horizontalSpeed, 10) * 0.015
    );

    if (fromJumpPad) {
      engine.showFeed(`JUMP PAD! +${Math.round(jumpForce)} FORCE`, '#67e8f9');
    }

    if (normalJump) {
      engine.tutorialRegisterAction('jump', true);
    }

    return true;
  }

  function performAirJump() {
    if (!engine.alive || engine.dying ||!engine.hasGameplayInput()|| motion.grounded || !motion.airJumpAvailable || motion.groundPoundActive) {
      return false;
    }

    const horizontalSpeed = Math.hypot(motion.moveVelocityX, motion.moveVelocityZ);
    motion.airJumpAvailable = false;
    motion.jumpCutApplied = false;

    motion.velocityY = 7.6 + THREE.MathUtils.clamp(horizontalSpeed * 0.08, 0, 1.2);
    motion.jumpCutGraceTimer = 0.08;
    motion.jumpBufferTimer = 0;
    engine.playSound('jump', 0.9, 1.35);
    engine.showFeed('AIR JUMP', '#c4b5fd');
    return true;
  }

  function performGroundPound() {
    if (!engine.alive || engine.dying ||!engine.hasGameplayInput()|| motion.grounded || motion.groundPoundActive || motion.climbingWall || motion.wallRunning) {
      return false;
    }

    motion.groundPoundActive = true;
    motion.airJumpAvailable = false;
    motion.velocityY = -26;
    motion.moveVelocityX *= 0.72;
    motion.moveVelocityZ *= 0.72;
    motion.jumpCutGraceTimer = 0;
    engine.playSound('jump', 0.8, 0.55);
    engine.showFeed('GROUND POUND', '#f59e0b');
    return true;
  }

  function updateParkourTimers(dt) {
    const safeDt = Number.isFinite(dt) && dt > 0 ? dt : 0;

    motion.vaultCooldown = Math.max(0, motion.vaultCooldown - safeDt);
    motion.mantleCooldown = Math.max(0, motion.mantleCooldown - safeDt);
    motion.wallJumpCooldown = Math.max(0, motion.wallJumpCooldown - safeDt);
    motion.jumpBufferTimer = Math.max(0, motion.jumpBufferTimer - safeDt);

    motion.jumpCutGraceTimer = Math.max(
      0,
      motion.jumpCutGraceTimer - safeDt
    );

    if (motion.grounded) {
      motion.coyoteTimer = COYOTE_TIME;
    } else {
      motion.coyoteTimer = Math.max(
        0,
        motion.coyoteTimer - safeDt
      );
    }

    if (motion.vaulting) {
      motion.vaultTimer -= safeDt;

      if (motion.vaultTimer <= 0) {
        motion.vaulting = false;
        motion.vaultTimer = 0;
        motion.vaultObstacle = null;
      }
    }
  }

  function beginWallJump(contact) {
    if (!contact || motion.wallJumpCooldown > 0 || !engine.alive || engine.dying ||!engine.hasGameplayInput()) {
      return false;
    }

    const normal = contact.normal.clone().setY(0);
    if (normal.lengthSq() <= 0.0001) return false;
    normal.normalize();

    const currentHorizontal = new THREE.Vector3(motion.moveVelocityX, 0, motion.moveVelocityZ);
    const tangentMomentum = currentHorizontal
      .clone()
      .sub(normal.clone().multiplyScalar(currentHorizontal.dot(normal)));

    if (tangentMomentum.lengthSq() > 0.0001) {
      tangentMomentum.normalize().multiplyScalar(
        Math.min(8.5, Math.max(2.0, currentHorizontal.length() * 0.75))
      );
    }

    motion.moveVelocityX = tangentMomentum.x + normal.x * WALL_JUMP_PUSH;
    motion.moveVelocityZ = tangentMomentum.z + normal.z * WALL_JUMP_PUSH;
    motion.jumpCutApplied = false;

    motion.velocityY = WALL_JUMP_FORCE;

    motion.grounded = false;
    motion.wallRunning = false;
    motion.wallRunTimer = 0;
    motion.climbingWall = false;
    motion.climbingObstacle = null;
    motion.wallJumpCooldown = WALL_JUMP_COOLDOWN;
    motion.jumpBufferTimer = 0;

    engine.playSound('jump', 1.1, 1.25);
    engine.showFeed('WALL JUMP!', '#a5b4fc');
    return true;
  }

  function updateMantle(dt) {
    if (!motion.mantling) {
      return false;
    }

    const safeDt = THREE.MathUtils.clamp(
      Number(dt) || 0,
      0,
      0.05
    );

    motion.mantleTimer += safeDt;

    const progress = THREE.MathUtils.clamp(
      motion.mantleTimer / motion.mantleDuration,
      0,
      1
    );

    /*
     * Smooth-step interpolation gives the mantle a soft start and finish.
     */
    const eased =
      progress * progress * (3 - 2 * progress);

    const position = new THREE.Vector3().lerpVectors(
      motion.mantleStartPosition,
      motion.mantleEndPosition,
      eased
    );

    /*
     * Add a small upward arc so the player rises over the ledge instead of
     * sliding horizontally through it.
     */
    const arc =
      Math.sin(progress * Math.PI) *
      Math.min(0.42, Math.max(0.16, motion.mantleEndPosition.y - motion.mantleStartPosition.y) * 0.22);

    position.y += arc;

    /*
     * Do not move into invalid geometry during the animation.
     * If the current interpolated position is blocked, shorten the movement
     * rather than allowing penetration.
     */
    if (engine.canMoveTo(position, PLAYER_RADIUS)) {
      engine.camera.position.copy(position);
    } else {
      const safePosition = engine.camera.position.clone().lerp(
        position,
        0.35
      );

      if (engine.canMoveTo(safePosition, PLAYER_RADIUS)) {
        engine.camera.position.copy(safePosition);
      }
    }

    motion.moveVelocityX = THREE.MathUtils.lerp(
      motion.moveVelocityX,
      motion.mantleDirection.x * 1.2,
      Math.min(1, safeDt * 10)
    );

    motion.moveVelocityZ = THREE.MathUtils.lerp(
      motion.moveVelocityZ,
      motion.mantleDirection.z * 1.2,
      Math.min(1, safeDt * 10)
    );

    if (progress >= 1) {
      engine.camera.position.copy(motion.mantleEndPosition);

      motion.mantling = false;
      motion.mantleTimer = 0;
      motion.mantleObstacle = null;

      motion.velocityY = 0;
      motion.grounded = true;
      motion.jumpCutApplied = false;

      motion.climbingWall = false;
      motion.climbingObstacle = null;
      motion.wallRunning = false;
      motion.wallRunTimer = 0;

      motion.moveVelocityX *= 0.82;
      motion.moveVelocityZ *= 0.82;

      engine.playCombatAnimation('land');

      return false;
    }

    return true;
  }

  function trySprintVault(direction = null) {
    if (!engine.alive || engine.dying || !engine.hasGameplayInput() || !motion.grounded || motion.vaulting || motion.vaultCooldown > 0) {
      return false;
    }

    const moveDirection = direction?.clone() || getCurrentMoveDirection();
    if (moveDirection.lengthSq() <= 0.0001) return false;
    moveDirection.setY(0).normalize();

    const horizontalSpeed = Math.hypot(motion.moveVelocityX, motion.moveVelocityZ);
    if (horizontalSpeed < VAULT_MIN_SPEED) return false;

    const feetY = engine.camera.position.y - PLAYER_EYE_HEIGHT;
    let bestObstacle = null;
    let bestDistance = Infinity;

    for (const obstacle of engine.obstacles) {
      if (!obstacle || obstacle.blocksMovement === false || obstacle.climbable === false) continue;

      const obstacleHeight = obstacle.maxY - feetY;
      if (obstacleHeight < 0.35 || obstacleHeight > VAULT_MAX_HEIGHT) continue;

      const closest = engine.getClosestPointOnObstacleXZ(engine.camera.position, obstacle);
      const offset = closest.clone().sub(engine.camera.position).setY(0);
      const distance = offset.length();

      if (distance > PLAYER_RADIUS + VAULT_ENTRY_DISTANCE || distance < 0.0001) continue;
      if (offset.normalize().dot(moveDirection) < 0.5) continue;

      if (distance < bestDistance) {
        bestDistance = distance;
        bestObstacle = obstacle;
      }
    }

    if (!bestObstacle) return false;

    motion.vaulting = true;
    motion.vaultTimer = VAULT_DURATION;
    motion.vaultCooldown = VAULT_COOLDOWN;
    motion.vaultObstacle = bestObstacle;

    motion.velocityY = Math.max(6.5, JUMP_FORCE * 0.83);
    motion.grounded = false;

    const vaultSpeed = Math.max(9.5, horizontalSpeed);
    motion.moveVelocityX = moveDirection.x * vaultSpeed;
    motion.moveVelocityZ = moveDirection.z * vaultSpeed;

    engine.playSound('jump', 0.85, 1.15);
    engine.showFeed('VAULT!', '#fef08a');
    return true;
  }

  function handleBufferedParkourJump() {
    if (
      motion.jumpBufferTimer <= 0 ||
      !engine.alive ||
      engine.dying ||
      !engine.hasGameplayInput() ||
      motion.mantling
    ) {
      return false;
    }

    /*
     * Wall-jumps have priority while attached to a wall.
     */
    if (motion.wallRunning || motion.climbingWall) {
      const contact = engine.getWallContact();

      if (contact) {
        return engine.beginWallJump(contact);
      }
    }

    /*
     * Try a mantle before performing a normal jump. This allows the player
     * to press Space near a ledge instead of jumping into its wall.
     */
    if (engine.tryMantle()) {
      motion.jumpBufferTimer = 0;
      return true;
    }

    if (motion.grounded || motion.coyoteTimer > 0) {
      return engine.performParkourJump();
    }

    return performAirJump() || engine.tryMantle();
  }

  function updateWallRun(dt) {
    if (!Number.isFinite(dt) || dt <= 0) {
      return false;
    }

    const contact = engine.getWallRunContact();

    if (!contact) {
      motion.wallRunning = false;
      motion.wallRunTimer = 0;
      return false;
    }

    if (!motion.wallRunning) {
      motion.wallRunning = true;
      motion.wallRunTimer = WALL_RUN_DURATION;
      motion.wallRunNormal.copy(contact.normal);
      motion.velocityY = 0;
    }

    motion.wallRunTimer -= dt;

    const tangent = new THREE.Vector3(
      -motion.wallRunNormal.z,
      0,
      motion.wallRunNormal.x
    );

    if (tangent.lengthSq() <= 0.000001) {
      motion.wallRunning = false;
      motion.wallRunTimer = 0;
      return false;
    }

    tangent.normalize();

    const horizontalVelocity = new THREE.Vector3(
      motion.moveVelocityX,
      0,
      motion.moveVelocityZ
    );

    if (horizontalVelocity.dot(tangent) < 0) {
      tangent.negate();
    }

    motion.moveVelocityX = tangent.x * WALL_RUN_SPEED;
    motion.moveVelocityZ = tangent.z * WALL_RUN_SPEED;

    engine.movePlayerWithCollision(
      new THREE.Vector3(
        motion.moveVelocityX * dt,
        0,
        motion.moveVelocityZ * dt
      )
    );

    engine.camera.position.y += 1.15 * dt;

    const wallTopEyeHeight =
      contact.obstacle.maxY + PLAYER_EYE_HEIGHT;

    if (
      motion.wallRunTimer <= 0 ||
      !motion.jumpHeld ||
      engine.camera.position.y >= wallTopEyeHeight
    ) {
      motion.wallRunning = false;
      motion.wallRunTimer = 0;
    }

    return true;
  }

  function updateWallRun30(dt, TUNE) {
    if (!Number.isFinite(dt) || dt <= 0) return false;

    const contact = engine.getWallRunContact();
    if (!contact) {
      if (motion.wallRunning) {
        motion.wallRunning = false;
        motion.wallRunTimer = 0;
      }
      return false;
    }

    if (!motion.wallRunning) {
      motion.wallRunning = true;
      motion.wallRunTimer = TUNE.wallRunDuration;
      motion.wallRunNormal.copy(contact.normal).setY(0).normalize();
      motion.grounded = false;
      motion.velocityY = Math.max(motion.velocityY, 1.1);
    }

    motion.wallRunTimer -= dt;

    const tangent = new THREE.Vector3(-motion.wallRunNormal.z, 0, motion.wallRunNormal.x);
    if (tangent.lengthSq() <= 0.0001) {
      motion.wallRunning = false;
      motion.wallRunTimer = 0;
      return false;
    }
    tangent.normalize();

    const horizontal = new THREE.Vector3(motion.moveVelocityX, 0, motion.moveVelocityZ);
    if (horizontal.dot(tangent) < 0) tangent.negate();

    const carriedSpeed = Math.max(TUNE.wallRunSpeed, horizontal.length() * 0.94);
    motion.moveVelocityX = tangent.x * carriedSpeed;
    motion.moveVelocityZ = tangent.z * carriedSpeed;

    // Keep the player glued to the wall without teleporting through it.
    const closest = engine.getClosestPointOnObstacleXZ(engine.camera.position, contact.obstacle);
    const wallOffset = closest.clone().addScaledVector(motion.wallRunNormal, PLAYER_RADIUS + 0.065);
    engine.camera.position.x = THREE.MathUtils.lerp(engine.camera.position.x, wallOffset.x, Math.min(1, dt * 20));
    engine.camera.position.z = THREE.MathUtils.lerp(engine.camera.position.z, wallOffset.z, Math.min(1, dt * 20));

    engine.movePlayerWithCollision(new THREE.Vector3(motion.moveVelocityX * dt, 0, motion.moveVelocityZ * dt));
    engine.camera.position.y += TUNE.wallRunLift * dt;
    motion.grounded = false;

    const topEyeY = contact.obstacle.maxY + PLAYER_EYE_HEIGHT;
    if (motion.wallRunTimer <= 0 || engine.camera.position.y >= topEyeY - TUNE.landingSnap || !motion.jumpHeld) {
      motion.wallRunning = false;
      motion.wallRunTimer = 0;
      engine.camera.position.y = Math.min(engine.camera.position.y, topEyeY + 0.02);
    }

    engine.visualCameraWallRoll = THREE.MathUtils.lerp(
      engine.visualCameraWallRoll,
      THREE.MathUtils.clamp(
        -motion.wallRunNormal.x * 0.075 + motion.wallRunNormal.z * 0.04,
        -0.12,
        0.12,
      ),
      1 - Math.exp(-12 * dt),
    );

    return true;
  }

  function startDash(TUNE) {
    if (!engine.alive || engine.dying || engine.shopOpen) return false;
    if (!(engine.controls.isLocked || engine.qaForceLock)) return false;
    if (motion.dashCooldown > 0.001) return false;

    let direction = typeof getCurrentMoveDirection === 'function' ? getCurrentMoveDirection() : null;
    if (!direction || direction.lengthSq() <= 0.0001) {
      direction = new THREE.Vector3();
      engine.camera.getWorldDirection(direction);
      direction.y = 0;
      if (direction.lengthSq() <= 0.0001) direction.set(0, 0, -1);
    }
    direction.setY(0);
    if (direction.lengthSq() <= 0.0001) return false;
    direction.normalize();

    if (!consumeStamina(TUNE.dashStamina)) {
      engine.showFeed('NOT ENOUGH STAMINA', '#fca5a5');
      return false;
    }

    const wasGrounded = motion.grounded;
    motion.dashDirection.copy(direction);
    motion.dashSpeed = Math.max(
      wasGrounded ? TUNE.dashGroundSpeed : TUNE.dashAirSpeed,
      Math.hypot(motion.moveVelocityX, motion.moveVelocityZ) + (wasGrounded ? 9 : 7),
    );
    motion.dashActiveTime = wasGrounded ? TUNE.dashGroundTime : TUNE.dashAirTime;

    motion.sliding = false;
    motion.slideTimer = 0;
    motion.vaulting = false;
    motion.vaultObstacle = null;
    motion.vaultTimer = 0;
    motion.wallRunning = false;
    motion.wallRunTimer = 0;
    motion.climbingWall = false;
    motion.climbingObstacle = null;
    motion.wallClimbGraceTimer = 0;

    // A tiny immediate burst makes the dash feel instant while the dash state
    // carries the remaining distance through the normal collision solver.
    engine.movePlayerWithCollision(motion.dashDirection.clone().multiplyScalar(TUNE.dashInitialTravel));

    motion.moveVelocityX = motion.dashDirection.x * motion.dashSpeed;
    motion.moveVelocityZ = motion.dashDirection.z * motion.dashSpeed;
    if (!wasGrounded) motion.velocityY = Math.max(motion.velocityY, 2.6);

    const secondWindStacks = typeof engine.abilityOwnedCount === 'function'
      ? engine.getActiveAbilityStacks('secondWind')
      : 0;
    const cooldownMultiplier = Math.pow(0.80, Math.max(0, secondWindStacks));
    motion.dashCooldown = (wasGrounded ? TUNE.dashGroundCooldown : TUNE.dashAirCooldown) * cooldownMultiplier;

    motion.dashFlash = 0.18;
    engine.onDashStarted(wasGrounded);

    return true;
  }

  function updateLocomotion(dt, grapplePulling, dashActiveAtFrameStart) {
        const wallRunOwnsFrame = motion.wallRunning ||
          (!motion.grounded && motion.jumpHeld && motion.dashActiveTime <= 0 && !!engine.getWallRunContact());

        if (
          engine.alive &&
          engine.hasGameplayInput() &&
          !grapplePulling &&
          !motion.mantling
        ) {
          const inputForward =
            (input.isKeyDown('KeyW') ? 1 : 0) -
            (input.isKeyDown('KeyS') ? 1 : 0);

          const inputSide =
            (input.isKeyDown('KeyD') ? 1 : 0) -
            (input.isKeyDown('KeyA') ? 1 : 0);

          const inputLength = Math.hypot(
            inputSide,
            inputForward
          );

          const moving = inputLength > 0;

          const sprinting =
            isSprintHeld() &&
            moving &&
            motion.stamina > 0 &&
            !motion.sprintExhausted &&
            !input.aiming &&
            !motion.sliding;

          updateStamina(dt, moving, sprinting);
        if (motion.mantling) {
          updateMantle(dt);
        }

          if (motion.sliding) {
            updateSlide(dt);
          } else if (!dashActiveAtFrameStart && motion.dashActiveTime <= 0 && !wallRunOwnsFrame) {
            const targetSpeed =
              (sprinting ? SPRINT_SPEED : WALK_SPEED) *
              engine.getActiveMoveSpeedMult() *
              engine.getPlayerSpeedMultiplier() *
              engine.getRoundModifierValue('playerSpeed', 1) *
              (motion.grounded ? 1 : AIR_SPEED_MULTIPLIER);

            const movementDirection = getMovementDirection(
              inputSide,
              inputForward
            );

            const targetVelocity =
              movementDirection.multiplyScalar(targetSpeed);

            const acceleration =
              moving
                ? motion.grounded
                  ? ACCELERATION
                  : AIR_ACCELERATION
                : DECELERATION;

            const smoothing =
              1 - Math.exp(-acceleration * dt);

            motion.moveVelocityX +=
              (targetVelocity.x - motion.moveVelocityX) * smoothing;

            motion.moveVelocityZ +=
              (targetVelocity.z - motion.moveVelocityZ) * smoothing;

            if (!moving) {
              if (Math.abs(motion.moveVelocityX) < 0.01) {
                motion.moveVelocityX = 0;
              }

              if (Math.abs(motion.moveVelocityZ) < 0.01) {
                motion.moveVelocityZ = 0;
              }
            }

            engine.movePlayerWithCollision(
              new THREE.Vector3(
                motion.moveVelocityX * dt,
                0,
                motion.moveVelocityZ * dt
              )
            );
          }

          engine.updateMovementCrosshair(sprinting);

        } else {

          if (engine.alive) {
            updateStamina(dt, false, false);
          }
        }

                           if (engine.alive && engine.camera.position.y < -8) {
                             const safeSurface = engine.getWalkableSurfaceHeight(
                               engine.camera.position.x,
                               engine.camera.position.z,
                               engine.camera.position.y - PLAYER_EYE_HEIGHT
                             );
                             engine.camera.position.y = safeSurface + PLAYER_EYE_HEIGHT + 0.05;
                             motion.velocityY = 0;
                             const landed = !motion.grounded;
                             motion.grounded = true;
                             motion.jumpCutApplied = false;

                               if (landed) engine.playCombatAnimation("land");

                             motion.climbingWall = false;
                             motion.climbingObstacle = null;
                             motion.wallClimbGraceTimer = 0;
                           }

        if (
          engine.alive &&
          engine.hasGameplayInput() &&
          !grapplePulling &&
          !motion.mantling
        ) {

                             handleBufferedParkourJump();

                          if (
          !motion.jumpHeld &&
          !motion.jumpCutApplied &&
          motion.jumpCutGraceTimer <= 0 &&
          motion.velocityY > JUMP_CUT_MIN_VELOCITY
        ) {
          motion.velocityY = Math.max(
            JUMP_CUT_MIN_VELOCITY,
            motion.velocityY * JUMP_CUT_MULTIPLIER
          );

          motion.jumpCutApplied = true;
        }


                           }

        if (!grapplePulling && !motion.mantling) {
              const didWallRun = wallRunOwnsFrame && engine.updateWallRun(dt);

              if (!didWallRun) {

                let wallContact = motion.climbingWall ? engine.getWallContact() : engine.canWallClimb();

                if (motion.climbingWall && !wallContact && motion.wallClimbGraceTimer > 0) {
                  motion.wallClimbGraceTimer = Math.max(0, motion.wallClimbGraceTimer - dt);
                  wallContact = motion.climbingObstacle ? { obstacle: motion.climbingObstacle, normal: motion.wallRunNormal.clone() } : null;
                }

                if (wallContact && wallContact.obstacle?.climbable !== false) {
                  if (!motion.climbingWall) {
                    motion.climbingWall = true;
                    motion.climbingObstacle = wallContact.obstacle;
                  }
                  motion.wallClimbGraceTimer = 0.10;
                  motion.grounded = false;
                  motion.velocityY = WALL_CLIMB_SPEED;

                  const obstacle = motion.climbingObstacle;
                  const desiredDistance = PLAYER_RADIUS + 0.055;
                  const closest = engine.getClosestPointOnObstacleXZ(engine.camera.position, obstacle);
                  const normal = wallContact.normal?.clone() || new THREE.Vector3();
                  normal.y = 0;
                  if (normal.lengthSq() > 0.0001) {
                    normal.normalize();

                    const anchor = closest.clone().addScaledVector(normal, desiredDistance);
                    engine.camera.position.x += (anchor.x - engine.camera.position.x) * Math.min(1, dt * 18);
                    engine.camera.position.z += (anchor.z - engine.camera.position.z) * Math.min(1, dt * 18);
                  }

                  const climbStep = WALL_CLIMB_SPEED * dt;
                  const topEyeY = obstacle.maxY + PLAYER_EYE_HEIGHT;
                  engine.camera.position.y = Math.min(topEyeY, engine.camera.position.y + climbStep);

                  if (engine.camera.position.y >= topEyeY - 0.001) {

                    engine.camera.position.y = topEyeY;
                    motion.velocityY = 0;
                    const landed = !motion.grounded;
                    motion.grounded = true;
                    motion.jumpCutApplied = false;

                      if (landed) engine.playCombatAnimation("land");

                    motion.climbingWall = false;
                    motion.climbingObstacle = null;
                    motion.wallClimbGraceTimer = 0;
                    motion.coyoteTimer = COYOTE_TIME;
                  }
                } else {
                  motion.climbingWall = false;
                  motion.climbingObstacle = null;
                  motion.wallClimbGraceTimer = 0;

                  const previousY = engine.camera.position.y;

                  motion.velocityY -= (
                    motion.velocityY > 0
                      ? ASCENT_GRAVITY
                      : DESCENT_GRAVITY
                  ) * engine.getRoundModifierValue('gravityMultiplier', 1) * dt;

                  const nextY =
                    engine.camera.position.y + motion.velocityY * dt;

                  const previousFeetY = previousY - PLAYER_EYE_HEIGHT;
                  const nextFeetY = nextY - PLAYER_EYE_HEIGHT;
                  const sweptSurfaceY = motion.velocityY <= 0
                    ? engine.getVerticalLandingSurface(engine.camera.position.x, engine.camera.position.z, previousFeetY, nextFeetY, PLAYER_RADIUS)
                    : null;
                  const ceilingEyeY = motion.velocityY > 0
                    ? engine.getVerticalCeilingEyeY(engine.camera.position.x, engine.camera.position.z, previousY, nextY, PLAYER_RADIUS)
                    : null;
                  const standingSurfaceY = engine.getWalkableSurfaceHeight(
                    engine.camera.position.x,
                    engine.camera.position.z,
                    previousY - PLAYER_EYE_HEIGHT
                  );
                  const surfaceY = sweptSurfaceY !== null
                    ? Math.max(standingSurfaceY, sweptSurfaceY)
                    : standingSurfaceY;
                  const surfaceEyeY = surfaceY + PLAYER_EYE_HEIGHT;

                  if (
                    motion.velocityY <= 0 &&
                    previousY >= surfaceEyeY - 0.06 &&
                    nextY <= surfaceEyeY + 0.06
                  ) {
                    engine.camera.position.y = surfaceEyeY;
                    motion.velocityY = 0;
                    const landed = !motion.grounded;
                    motion.grounded = true;
                    motion.jumpCutApplied = false;

                      if (landed) engine.playCombatAnimation("land");

                    if (motion.groundPoundActive) engine.resolveGroundPoundImpact();
                    else motion.airJumpAvailable = true;

                    if (motion.jumpBufferTimer > 0 && engine.alive && engine.controls.isLocked) {
                      engine.performParkourJump();
                    }
                  } else if (ceilingEyeY !== null) {
                    engine.camera.position.y = ceilingEyeY;
                    motion.velocityY = 0;
                    motion.grounded = false;
                  } else {
                    engine.camera.position.y = nextY;
                    motion.grounded = false;
                  }

                  if (
                    engine.camera.position.y < surfaceEyeY &&
                    motion.velocityY <= 0
                  ) {
                    engine.camera.position.y = surfaceEyeY;
                    motion.velocityY = 0;
                    motion.grounded = true;
                    motion.jumpCutApplied = false;

                    if (motion.groundPoundActive) engine.resolveGroundPoundImpact();
                    else motion.airJumpAvailable = true;

                    if (motion.jumpBufferTimer > 0 && engine.alive && engine.controls.isLocked) {
                      engine.performParkourJump();
                    }
                  }

                  if (
                    motion.grounded &&
                    !motion.wasGrounded &&
                    Math.hypot(motion.moveVelocityX, motion.moveVelocityZ) > 7
                  ) {
                    const landingScale = 1 + LANDING_BOOST_SPEED * 0.01;
                    motion.moveVelocityX *= landingScale;
                    motion.moveVelocityZ *= landingScale;
                  }

                }
              }
              }

  }

  function updateDashCooldown(dt) {
    motion.dashCooldown = Math.max(0, motion.dashCooldown - dt);
    if (!engine.alive) { motion.dashActiveTime = 0; motion.dashSpeed = 0; }
  }

  function updateDash(dt, stopOnBlocked = false) {
    if (motion.dashActiveTime > 0 && engine.alive && engine.hasGameplayInput() && !engine.shopOpen) {
      motion.dashActiveTime = Math.max(0, motion.dashActiveTime - dt);
      const distance = stopOnBlocked ? Math.max(0, motion.dashSpeed * dt) : motion.dashSpeed * dt;
      if (!stopOnBlocked || distance > 0) {
        const moved = engine.movePlayerWithCollision(motion.dashDirection.clone().multiplyScalar(distance));
        motion.moveVelocityX = motion.dashDirection.x * motion.dashSpeed;
        motion.moveVelocityZ = motion.dashDirection.z * motion.dashSpeed;
        if (stopOnBlocked && !moved) motion.dashActiveTime = Math.min(motion.dashActiveTime, 0.02);
      }
    }
  }

  return { state: motion, isSprintHeld, consumeStamina, updateStamina, getSafeStamina, getMovementDirection, getCurrentMoveDirection, startSlide, stopSlide, updateSlide, performParkourJump, performAirJump, performGroundPound, updateParkourTimers, beginWallJump, updateMantle, trySprintVault, handleBufferedParkourJump, updateWallRun, updateWallRun30, startDash, updateLocomotion, updateDashCooldown, updateDash };
}
