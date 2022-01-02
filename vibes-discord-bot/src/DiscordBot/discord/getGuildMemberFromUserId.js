export default function getGuildMemberFromUserId({
  client,
  guild_id,
  user_id,
}) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  if (!user_id) {
    throw new Error("needs user_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  const member = guild.members.cache.find((i) => i.user?.id === user_id);
  return member;
}
