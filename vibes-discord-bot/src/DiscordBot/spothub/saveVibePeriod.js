import LedgerEntry from 'spothub/lib/LedgerEntry';

export const ALLOWED_VIBE_PERIODS = ["minute", "hour", "day", "week", "month"];

export default async function saveVibePeriod(space_id, period, user_id) {
  if (!space_id) {
    return;
  }

  if (!ALLOWED_VIBE_PERIODS.includes(period)) {
    throw new Error(`vibe period ${period} not allowed`);
  }
  const entry = LedgerEntry.build({
    ledger_id: space_id,
    type: "Set Vibe Period",
    sender: {
      type: 'discord_guild_member',
      id: user_id
    },
    value: {
      by_user_id: user_id,
      vibe_period: period,
      // ... can put cause here
    },
    authored_on: new Date(),
  });
  await entry.save();
}
