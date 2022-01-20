import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";

export default async function getVibeRoleAliases({guild_id}) {
  const ledger = await findOrCreateLedgerForGuild(guild_id);
  const vibe_reaction_aliases = (ledger.meta?.["vibes:vibe_reaction_aliases"] || "").split(' ');
  return vibe_reaction_aliases;
}
