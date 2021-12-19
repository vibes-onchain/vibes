import updateGuildMember from "./updateGuildMember";

export default async function updateAllGuildMembers({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  for (const member of guild.members.cache.map((i) => i)) {
    console.log('updating', member.id, member.user.username)
    const changed = await updateGuildMember({
      client,
      guild_id,
      member_id: member.id,
    });
    if (changed) {
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 500);
      });
    }
  }
}
