import { VIBE_ROLE_NAMES } from '../constants';

export default async function updateGuildMemberVibeRole({client, guild_id, member_id, role_name}) {
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

  for (const role of member.roles.cache.map(i => i)) {
    if (VIBE_ROLE_NAMES.includes(role.name) && role_name !== role.name) {
      await member.roles.remove(role);
    }
  }
  const in_role = member.roles.cache.find((role) => role.name === role_name);
  if (!in_role) {
    const role = guild.roles.cache.find((role) => role.name === role_name);
    if (role) {
      await member.roles.add(role);
    } 
  }
  return true;
}
