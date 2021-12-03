import findOrCreateSpaceForGuild from "./findOrCreateSpaceForGuild";

export default async function saveVibe({ from_user_id, user_id, reason }) {
  const space = await findOrCreateSpaceForGuild(this.id);
  const entry = SpaceLedgerEntry.build({
    space_id: space.id,
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