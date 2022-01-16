export default async function updateGuildMemberNickname({
  client,
  guild_id,
  member_id,
  nickname,
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

  const member_nickname = member.nickname || member.user.username;
  if (member.user.id === client.user.id || member.user.bot || !member.manageable) {
    // do nothing
  } else if (!nickname || nickname.length === 0) {
    if (member_nickname !== member.user.username) {
      await member.setNickname(`${member.user.username}`.substring(0, 32)).catch((e) => {
        console.log(e);
      });
      return true;
    }
  } else {
    const nn = nickname.substring(0, 32);
    if (member_nickname !== nn) {
      await member
        .setNickname(nn)
        .catch((e) => {
          console.log(e);
        });
      return true;
    }
  }
}
