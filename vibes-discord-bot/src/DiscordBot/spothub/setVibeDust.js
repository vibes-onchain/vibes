import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";
import LedgerEntry from 'spothub/lib/LedgerEntry';

export default async function saveSetVibes({
  ledger_id,
  by_discord_member_id,
  member_id,
  vibe_dust = 0,
  reason,
}) {
  const space = await findOrCreateLedgerForGuild(ledger_id);
  const entry = LedgerEntry.build({
    ledger_id: space.id,
    type: "Set Vibe Dust",
    sender: {
      type: 'discord_guild_member',
      id: by_discord_member_id
    },
    receiver: {
      type: 'discord_guild_member',
      id: member_id
    },
    value: {
      vibe_dust,
      reason,
    },
    authored_on: new Date(),
  });
  return await entry.save();
}
