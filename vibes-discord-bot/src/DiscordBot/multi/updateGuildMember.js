import updateGuildMemberVibeRole from "../discord/updateGuildMemberVibeRoles";
import updateGuildMemberNicknameParen from "../discord/updateGuildMemberNicknameParen";
import getVibesUserDetails from "../spothub/getVibesUserDetails";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import renderParen from "../spothub/renderVibesUserParen";

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
  const ledger = await findOrCreateLedgerForGuild(guild_id);
  const vibes_paren = ledger.meta?.['vibes:paren']

  const memberDetails = await getVibesUserDetails({ guild_id, member_id });
  // TODO include vibe traits
  const paren = await renderParen({paren: vibes_paren, context: memberDetails});
  const updatedParen = await updateGuildMemberNicknameParen({
    client,
    guild_id,
    member_id,
    paren,
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
