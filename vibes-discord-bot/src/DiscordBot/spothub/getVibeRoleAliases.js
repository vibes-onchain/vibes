import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";

export default async function getVibeRoleAliases({guild_id}) {
  const ledger = await findOrCreateLedgerForGuild(guild_id);
  const role_aliases = {
    "OG Vibes": ledger.meta?.["vibes:role_alias:OG Vibes"],
    "Legendary Vibes": ledger.meta?.["vibes:role_alias:Legendary Vibes"],
    "Epic Vibes": ledger.meta?.["vibes:role_alias:Epic Vibes"],
    "Rare Vibes": ledger.meta?.["vibes:role_alias:Rare Vibes"],
    "Frenly Vibes": ledger.meta?.["vibes:role_alias:Frenly Vibes"],
    "Sus Vibse": ledger.meta?.["vibes:role_alias:Sus Vibes"],
  };
  return role_aliases;
}
