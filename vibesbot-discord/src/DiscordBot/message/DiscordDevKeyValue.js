export function getGuildMemberKey(guild_member) {
  return `discord:${guild_member.guild.id}:${guild_member.user.id}`;
}

export async function findOrCreateMember(member) {
  let user = await DevKeyValue.findOne({
    where: {
      key: getGuildMemberKey(member),
    },
  });
  if (!user) {
    user = await DevKeyValue.create({
      key: getGuildMemberKey(member),
      value: { gmi: 0, wagmi: 0 },
    });
  }
  return user;
}

export default {
  getGuildMemberKey,
  findOrCreateMember,
};
