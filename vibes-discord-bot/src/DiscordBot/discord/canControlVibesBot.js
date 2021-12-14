import { CAN_CONTROL_VIBES_BOT_ROLE } from "../constants";

export default async function ({ client, guild_id, member_id }) {
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
  if (
    !member.roles.cache.some(
      (role) => role.name === CAN_CONTROL_VIBES_BOT_ROLE.name
    )
  ) {
    await member.send(
      `WARN: You're not in the role \`${CAN_CONTROL_VIBES_BOT_ROLE.name}\`, so you can't run this command.`
    );
    return false;
  }
  return true;
}
