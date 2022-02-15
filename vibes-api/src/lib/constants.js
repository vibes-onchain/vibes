export const GOOD_VIBE_ROLES = [
  {
    color: 15844367,
    reason: "",
    name: "OG Vibes",
    icon: "og-vibes.png",
    hoist: true,
    when: ["vibestack_score", ">", 2],
    level: 5,
  },
  {
    color: 15105570,
    reason: "",
    name: "Legendary Vibes",
    hoist: true,
    icon: "legendary-vibes.png",
    when: ["vibestack_score", ">", 1.5],
    level: 4,
  },
  {
    color: 10181046,
    reason: "",
    name: "Epic Vibes",
    icon: "epic-vibes.png",
    hoist: true,
    when: ["vibestack_score", ">", 1],
    level: 3,
  },
  {
    color: 3447003,
    reason: "",
    name: "Rare Vibes",
    icon: "rare-vibes.png",
    hoist: true,
    when: ["vibestack_score", ">", 0],
    level: 2,
  },
  {
    color: 0,
    reason: "",
    name: "Frenly Vibes",
    icon: "frenly-vibes.png",
    hoist: true,
    when: ["vibestack", ">", 0],
    level: 1,
  },
];

export const BAD_VIBE_ROLES = [
  {
    color: 10038562,
    reason: "",
    name: "Sus Vibes",
    hoist: false,
    icon: "sus-vibes.gif",
    hoist: true,
    when: ["vibestack", "<", 0],
    level: -1,
  },
];

export const VIBE_ROLE_NAMES = [
  ...BAD_VIBE_ROLES.map((i) => i.name),
  ...GOOD_VIBE_ROLES.map((i) => i.name),
];