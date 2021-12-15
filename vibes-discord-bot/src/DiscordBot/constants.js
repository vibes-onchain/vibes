import { Intents } from "discord.js";

export const GLOBAL_CMDS = [
  "vibe",
  "badvibe",
  "vibes",
  "badvibes",
  "susvibes",
  "susvibe",
  "setviberate",
  "setvibestack",
  "setvibestacks",
  "vibecheck",
  "vibechk",
  "help",
  "vibesbot",
  "about",
  "setvibeperiod",
  "setvibeprd",
  "setvibedust",
  "genvibedust",
  "vibedistro",
  "vibedistribution",
  "refreshvibes",
  "vd",
  "vc",
  "resetvibedust",
  "setvibesparen",
  "setvibestrait",
  "setupvibes"
];

export const REQUIRED_INTENTS = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_BANS,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_INTEGRATIONS,
  Intents.FLAGS.GUILD_WEBHOOKS,
  // Intents.FLAGS.GUILD_INVITES,
  // Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  // Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  // Intents.FLAGS.DIRECT_MESSAGE_TYPING
];

export const TOKEN = process.env.APP_DISCORD_BOT_TOKEN;

export const CAN_CONTROL_VIBES_BOT_ROLE = {
  name: "[Can Control Vibes Bot]",
  hoist: false,
  mentionable: false,
};

export const GOOD_VIBES_START_HERE_ROLE = {
  host: false,
  mentionable: false,
  name: "[Good Vibes Start Here]",
};
export const GOOD_VIBE_ROLES = [
  {
    color: 15844367,
    reason: "",
    name: "OG Vibe",
    icon: "og-vibes.png",
    hoist: true,
    when: ["vibe_dust_zscore", ">", 2]
  },
  {
    color: 15105570,
    reason: "",
    name: "Legendary Vibe",
    hoist: true,
    icon: "legendary-vibes.png",
    when: ["vibe_dust_zscore", ">", 1.5]
  },
  {
    color: 10181046,
    reason: "",
    name: "Epic Vibe",
    icon: "epic-vibes.png",
    hoist: true,
    when: ["vibe_dust_zscore", ">", 1]
  },
  {
    color: 3447003,
    reason: "",
    name: "Rare Vibe",
    icon: "rare-vibes.png",
    hoist: true,
    when: ["vibe_dust_zscore", ">", 0]
  },
  {
    color: 0,
    reason: "",
    name: "Frenly Vibe",
    icon: "frenly-vibes.png",
    hoist: true,
    when: ["vibe_dust_zscore", ">", -0.5]
  },
];
export const BAD_VIBES_START_HERE_ROLE = {
  host: false,
  mentionable: false,
  name: "[Bad Vibes Start Here]",
};
export const BAD_VIBE_ROLES = [
  {
    color: 10038562,
    reason: "",
    name: "Sus Vibe",
    hoist: false,
    icon: "sus-vibes.gif",
    hoist: true,
    when: ["vibe_dust", "<", 0]
  },
];

export const VIBE_ROLE_NAMES = [
  ...BAD_VIBE_ROLES.map((i) => i.name),
  ...GOOD_VIBE_ROLES.map((i) => i.name),
];

export const VIBES_BOT_ROLE_NAME =
  process.env.APP_ENV === "development" ? "vibesbot-dev" : "vibesbot";

export const VIBE_FEED_CHANNEL = { name: "vibe-feed", type: "GUILD_TEXT" };

const iconsDir = `${__dirname}/../../assets/icons`;

export const VIBE_EMOJIS = {
  susvibe: { location: `${iconsDir}/sus-vibes.gif`, name: "susvibe" },
  ogvibe: { location: `${iconsDir}/og-vibes.png`, name: "ogvibe" },
  epicvibe: { location: `${iconsDir}/epic-vibes.png`, name: "epicvibe" },
  rarevibe: { location: `${iconsDir}/rare-vibes.png`, name: "rarevibe" },
  legendaryvibe: {
    location: `${iconsDir}/legendary-vibes.png`,
    name: "legendaryvibe",
  },
  frenlyvibe: { location: `${iconsDir}/frenly-vibes.png`, name: "frenlyvibe" },
  vibes: { location: `${iconsDir}/frenly-vibes.png`, name: "vibes" },
  vibe: { location: `${iconsDir}/frenly-vibes.png`, name: "vibe" },
  vibedust: { location: `${iconsDir}/vibedust.gif`, name: "vibedust" },
};
