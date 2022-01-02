import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";
import LedgerEntry from "spothub/lib/LedgerEntry";

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
  return await entry.save();
}
