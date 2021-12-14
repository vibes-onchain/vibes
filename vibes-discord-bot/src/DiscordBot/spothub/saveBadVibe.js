import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";
import LedgerEntry from 'spothub/lib/LedgerEntry';

export default async function saveBadVibe({ ledger_id, from_member_id, member_id, reason }) {
  const space = await findOrCreateLedgerForGuild(ledger_id);
  const entry = LedgerEntry.build({
    ledger_id: space.id,
    type: "BadVibe",
    sender: {
      type: 'discord_guild_member',
      id: from_member_id
    },
    receiver: {
      type: 'discord_guild_member',
      id: member_id
    },
    value: {
      reason: reason,
    },
    authored_on: new Date(),
  });
  await entry.save();
}
