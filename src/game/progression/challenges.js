export function createChallenges() {
  return [
        {
          id: "headhunter",
          name: "HEADHUNTER",
          desc: "Land 4 headshots this wave.",
          type: "headshots",
          need: 4,
          reward: 40
        },
        {
          id: "sharpshooter",
          name: "SHARPSHOOTER",
          desc: "Land 8 headshots this wave.",
          type: "headshots",
          need: 8,
          reward: 75
        },
        {
          id: "untouchable",
          name: "UNTOUCHABLE",
          desc: "Take no damage this wave.",
          type: "noDamage",
          need: 1,
          reward: 55
        },
        {
          id: "flawless",
          name: "FLAWLESS",
          desc: "Survive the wave without taking damage.",
          type: "noDamage",
          need: 1,
          reward: 90
        },
        {
          id: "speedkill",
          name: "BLITZ",
          desc: "Get 8 kills this wave.",
          type: "kills",
          need: 8,
          reward: 35
        },
        {
          id: "massacre",
          name: "MASSACRE",
          desc: "Get 15 kills this wave.",
          type: "kills",
          need: 15,
          reward: 80
        },
        {
          id: "parkour",
          name: "AIRBORNE",
          desc: "Get 3 kills while airborne, dashing, or wall-running.",
          type: "parkourKills",
          need: 3,
          reward: 45
        },
        {
          id: "parkourMaster",
          name: "PARKOUR MASTER",
          desc: "Get 6 kills while airborne, dashing, or wall-running.",
          type: "parkourKills",
          need: 6,
          reward: 100
        },
        {
          id: "runner",
          name: "RUNNER",
          desc: "Get 5 kills while moving quickly.",
          type: "movingKills",
          need: 5,
          reward: 50
        },
        {
          id: "survivor",
          name: "SURVIVOR",
          desc: "Finish the wave with at least 50% health.",
          type: "healthAtWaveEnd",
          need: 1,
          reward: 45
        },
        {
          id: "eliteHunter",
          name: "ELITE HUNTER",
          desc: "Defeat 2 elite enemies this wave.",
          type: "eliteKills",
          need: 2,
          reward: 70
        },
        {
          id: "executioner",
          name: "EXECUTIONER",
          desc: "Defeat 3 enemies with melee attacks or executions.",
          type: "meleeKills",
          need: 3,
          reward: 65
        }
      ];
}
