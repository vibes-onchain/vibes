import { Intents } from "discord.js";

export const GLOBAL_CMDS = [
  "vibe",
  "badvibe",
  "vibes",
  "badvibes",
  "setviberate",
  'setvibestack',
  "vibecheck",
  "vibechk",
  "help",
  "about",
  "setvibeperiod",
  "setvibeprd",
  "setvibedust",
  "genvibedust",
  "vibedistro",
  "vd",
  "vc",
  "resetvibedust",
  "setfrenlyparen",
  "setfrenlylabel"
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
