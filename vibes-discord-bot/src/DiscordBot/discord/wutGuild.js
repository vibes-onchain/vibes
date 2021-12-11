export default async function({client, guild_id}) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find(g => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  console.log(guild);
}