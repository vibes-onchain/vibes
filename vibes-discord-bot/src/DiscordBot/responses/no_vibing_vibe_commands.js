export function forVibeFeed({
  client,
  guild_id,
  sending_member,
  receiving_member,
  vibesLedgerSummary,
  ledger_id,
}) {
  return `sorry <@${sending_member.user_id}> your vibe reaction was ignored, because it was on a vibe command and confuses my simple bot mind.`
}