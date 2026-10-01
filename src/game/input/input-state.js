// Raw device state only; gameplay gating and action execution stay with the engine.
export function createInputState() {
  return {
    keys: {},
    mouseDown: false,
    aiming: false,
    mobileSprintHeld: false,

    setKey(code, value) {
      this.keys[code] = !!value;
    },

    isKeyDown(code) {
      return Boolean(this.keys[code]);
    },

    isSprintHeld() {
      return Boolean(
        this.mobileSprintHeld ||
        this.keys.sprint ||
        this.keys.ShiftLeft ||
        this.keys.ShiftRight
      );
    },

    setMouseDown(value) {
      this.mouseDown = !!value;
    },

    setAiming(value) {
      this.aiming = !!value;
    },

    setMobileSprint(value) {
      this.mobileSprintHeld = Boolean(value);
    },

    clearKeys() {
      this.keys = {};
    },

    clearButtons() {
      this.mouseDown = false;
      this.aiming = false;
    },

    reset({ preserveMobileSprint = false } = {}) {
      this.clearKeys();
      this.clearButtons();
      if (!preserveMobileSprint) this.mobileSprintHeld = false;
    },

    bindMouseRelease(target) {
      const onMouseUp = event => {
        if (event.button === 0) this.setMouseDown(false);
        if (event.button === 2) this.setAiming(false);
      };
      target.addEventListener('mouseup', onMouseUp);
      return () => target.removeEventListener('mouseup', onMouseUp);
    }
  };
}
