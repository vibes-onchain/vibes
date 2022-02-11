export default function getVibeFeed({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  return guild.channels.cache.find((channel) => channel.name === "vibes-config");
}
