import LedgerEntry from "spothub/lib/LedgerEntry";
import AppCache from ':/lib/AppCache';

export default async function setVibestack({
  ledger_id,
  by_member_id,
  member_id,
  vibestack = 0,
  reason,
}) {
  const entry = LedgerEntry.build({
    ledger_id,
    type: "Set Vibestack",
    sender: {
      type: "discord_guild_member",
      id: by_member_id,
    },
    receiver: {
      type: "discord_guild_member",
      id: member_id,
    },
    value: {
      vibestack,
      reason,
    },
    authored_on: new Date(),
  });
  await entry.save();
  await AppCache.del(`ledger_latest_entries-${ledger_id}`);
  return entry;
}
