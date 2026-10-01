// Accessors keep evaluation attached to the current engine-owned run and persistence state.
export function createAchievements({ getLife, getRun, getEarned }) {
  return {
    firstBlood: { icon: '🩸', name: 'First Blood', desc: 'Get your first kill', test: () => getLife().kills >= 1 },
    centurion: { icon: '💯', name: 'Centurion', desc: '100 lifetime kills', test: () => getLife().kills >= 100 },
    reaper: { icon: '💀', name: 'Reaper', desc: '1,000 lifetime kills', test: () => getLife().kills >= 1000 },
    combo10: { icon: '🔥', name: 'Combo Artist', desc: 'Reach a x10 combo', test: () => getLife().bestCombo >= 10 },
    combo25: { icon: '⚡', name: 'Unstoppable', desc: 'Reach a x25 combo', test: () => getLife().bestCombo >= 25 },
    wave5: { icon: '🌊', name: 'Holding Ground', desc: 'Reach wave 5', test: () => getLife().bestWave >= 5 },
    wave10: { icon: '🏙️', name: 'City Breaker', desc: 'Reach wave 10', test: () => getLife().bestWave >= 10 },
    wave20: { icon: '👑', name: 'Arena Legend', desc: 'Reach wave 20', test: () => getLife().bestWave >= 20 },
    untouchable: { icon: '🛡️', name: 'Untouchable', desc: 'Clear a wave without taking damage', test: () => Boolean(getEarned().untouchable) },
    marathon: { icon: '⏱️', name: 'Marathon', desc: 'Survive 10 minutes in one run', test: () => getRun().seconds >= 600 }
  };
}
