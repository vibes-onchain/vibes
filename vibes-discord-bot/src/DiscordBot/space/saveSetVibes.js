import findOrCreateSpaceForGuild from "./findOrCreateSpaceForGuild";

export default async function saveSetVibes({
  by_user_id,
  user_id,
  vibes = 1,
  reason,
}) {
  const space = await findOrCreateSpaceForGuild(this.id);
  const entry = LedgerEntry.build({
    ledger_id: space.id,
    type: "Set Vibe Dust",
    value: {
      by_user_id: by_user_id,
      user_id: user_id,
      vibes: vibes,
      reason: reason,
    },
    authored_on: new Date(),
  });
  await entry.save();
}
