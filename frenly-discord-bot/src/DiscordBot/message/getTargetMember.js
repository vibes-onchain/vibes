export default function getTargetMember({ message, cmd_args }) {
  // if (cmd_args.length > 1) {
  //   return;
  // }
  const target = cmd_args[0];
  const targetIdMatcher = new RegExp(`<@!(\[0-9]+)>`);
  const m = target.match(targetIdMatcher);
  if (!m) {
    return;
  }
  const target_id = m[1];
  const target_user = message.mentions?.users?.find((i) => i.id === target_id);
  if (!target_user) {
    return;
  }
  for (const [member_id, member] of message.guild.members.cache) {
    if (member.user.id === target_user.id) {
      return member;
    }
  }
}
