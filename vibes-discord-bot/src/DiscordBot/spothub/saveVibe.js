import LedgerEntry from 'spothub/lib/LedgerEntry';

export default async function saveVibe({ ledger_id, from_member_id, member_id, reason, note, reaction_to_message_id }) {
  const entry = LedgerEntry.build({
    ledger_id,
    type: "Vibe",
    sender: {
      type: 'discord_guild_member',
      id: from_member_id
    },
    receiver: {
      type: 'discord_guild_member',
      id: member_id
    },
    value: {
      reaction_to_message_id,
      note: note || reason,
    },
    authored_on: new Date(),
  });
  await entry.save();
}