export default async function saveBadVibe({ from_user_id, user_id, reason }) {
  const space = await DiscordGuild.findOrCreateSpace(this.id);
  const entry = SpaceLedgerEntry.build({
    space_id: space.id,
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
