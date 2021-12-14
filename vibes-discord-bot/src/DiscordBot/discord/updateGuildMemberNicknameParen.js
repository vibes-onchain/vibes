export default async function updateGuildMemberNicknameParen({
  client,
  guild_id,
  member_id,
  paren,
}) {
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
  const member = guild.members.cache.find((i) => i.id === member_id);
  if (!member) {
    throw new Error("member not found");
  }

  if (member.user.id === client.user.id || member.user.bot || !member.manageable) {
    // do nothing
  } else if (!paren) {
    if (member.nickname !== member.user.username) {
      await member.setNickname(`${member.user.username}`.substring(0, 32)).catch((e) => {
        console.log(e);
      });
      return true;
    }
  } else {
    const nn = `${member.user.username} (${paren})`.substring(0, 32);
    if (member.nickname !== nn) {
      await member
        .setNickname(nn)
        .catch((e) => {
          console.log(e);
        });
      return true;
    }
  }
}
