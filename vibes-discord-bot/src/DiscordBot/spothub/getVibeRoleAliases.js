import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";

export default async function getVibeRoleAliases({guild_id}) {
  const ledger = await findOrCreateLedgerForGuild(guild_id);
  const role_aliases = {
    "OG Vibe": ledger.meta?.["vibes:role_alias:OG Vibe"],
    "Legendary Vibe": ledger.meta?.["vibes:role_alias:Legendary Vibe"],
    "Epic Vibe": ledger.meta?.["vibes:role_alias:Epic Vibe"],
    "Rare Vibe": ledger.meta?.["vibes:role_alias:Rare Vibe"],
    "Frenly Vibe": ledger.meta?.["vibes:role_alias:Frenly Vibe"],
    "Sus Vibe": ledger.meta?.["vibes:role_alias:Sus Vibe"],
  };
  return role_aliases;
}
