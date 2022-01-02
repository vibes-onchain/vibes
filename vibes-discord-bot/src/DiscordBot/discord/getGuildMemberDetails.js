export default function getGuildMemberDetails({client, guild_id, member_id}) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  if (!member_id) {
    throw new Error("needs member_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  const member = guild.members.cache.find(i => i.id === member_id);
  const details = {
    member_id: member?.id,
    user_id: member?.user?.id,
    username: member?.user?.username,
    avatar: member?.user?.avatar,
  }
  return details;
}