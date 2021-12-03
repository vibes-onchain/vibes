import findOrCreateSpaceForGuild from "./findOrCreateSpaceForGuild";

export const ALLOWED_VIBE_PERIODS = ["minute", "hour", "day", "week", "month"];

export default async function saveVibePeriod(period, user_id) {
  if (ALLOWED_VIBE_PERIODS.includes(period)) {
    this.values = {
      ...this.values,
      vibe_period: period,
    };
  } else {
    throw new Error(`vibe period ${period} not allowed`);
  }
  const space = await findOrCreateSpaceForGuild(this.id);
  const entry = SpaceLedgerEntry.build({
    space_id: space.id,
    type: "Set Vibe Period",
    value: {
      by_user_id: user_id,
      vibe_period: period,
      // ... can put cause here
    },
    authored_on: new Date(),
  });
  await entry.save();
  await this.save();
}
