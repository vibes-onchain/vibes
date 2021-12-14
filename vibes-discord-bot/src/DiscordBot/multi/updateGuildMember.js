import updateGuildMemberVibeRole from "../discord/updateGuildMemberVibeRoles";
import updateGuildMemberNicknameParen from "../discord/updateGuildMemberNicknameParen";
import getVibesUserDetails from "../spothub/getVibesUserDetails";

export default async function updateGuildMember({
  client,
  guild_id,
  member_id,
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

  const memberDetails = await getVibesUserDetails({ guild_id, member_id });
  // console.log(member_id, {memberDetails});
  // TODO figure out paren
  // updateGuildMemberNicknameParen
  const updatedParen = await updateGuildMemberNicknameParen({
    client,
    guild_id,
    member_id,
    paren: memberDetails.vibedust,
  });

  // TODO figure out vibe role
  // updateGuildMemberVibeRoles
  const updatedVibesRole = await updateGuildMemberVibeRole({
    client,
    guild_id,
    member_id,
    role_name: memberDetails.vibeLevel,
  });

  return updatedParen || updatedVibesRole;
}
