import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";

export default async function saveBadVibe({ from_user_id, user_id, reason }) {
  const space = await findOrCreateLedgerForGuild(this.id);
  const entry = LedgerEntry.build({
    ledger_id: space.id,
    type: "BadVibe",
    value: {
      from_user_id: from_user_id,
      user_id: user_id,
      reason: reason,
    },
    authored_on: new Date(),
  });
  await entry.save();
}
