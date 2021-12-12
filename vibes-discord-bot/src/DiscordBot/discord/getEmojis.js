
function getEmoji(guild, name) {
  return guild.emojis.cache.find(
    (emoji) => emoji.name === name
  );
}
export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }

  const emojis = {
    vibedust: getEmoji(guild, "vibedust"),
    ogvibe: getEmoji(guild, "ogvibe"),
    epicvibe: getEmoji(guild, "epicvibe"),
    rarevibe: getEmoji(guild, "rarevibe"),
    legendaryvibe: getEmoji(guild, "legendaryvibe"),
    frenlyvibe: getEmoji(guild, "frenlyvibe"),
    vibe: getEmoji(guild, "vibe"),
    vibes: getEmoji(guild, "vibes"),
    susvibe: getEmoji(guild, "susvibe"),
  };

  return emojis;
}
