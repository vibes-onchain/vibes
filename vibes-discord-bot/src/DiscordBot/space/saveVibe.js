import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";

export default async function saveVibe({ ledger_id, from_user_id, user_id, reason }) {
  const space = await findOrCreateLedgerForGuild(ledger_id);
  const entry = LedgerEntry.build({
    ledger_id: space.id,
    type: "Vibe",
    value: {
      from_user_id: from_user_id,
      user_id: user_id,
      reason: reason,
    },
    authored_on: new Date(),
  });
  await entry.save();
}