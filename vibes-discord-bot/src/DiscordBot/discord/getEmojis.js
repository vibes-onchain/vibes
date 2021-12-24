import { VIBE_EMOJIS } from "../constants";

function getEmoji(guild, name) {
  return guild.emojis.cache.find((emoji) => emoji.name === name);
}

export default function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }

  const keys = Object.keys(VIBE_EMOJIS);
  const r = {};
  for (const key of keys) {
    r[key] = getEmoji(guild, key);
  }
  return r;
}
