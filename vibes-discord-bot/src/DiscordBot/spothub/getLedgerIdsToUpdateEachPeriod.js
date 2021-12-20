import Ledger from "spothub/lib/Ledger";
import LedgerEntry from "spothub/lib/LedgerEntry";

export default async function getLedgerIdsToUpdateEachPeriod(period) {
  const ledgers = await Ledger.findAll({ where: {} });
  const r = [];
  for (const ledger of ledgers) {
    const le = await LedgerEntry.findLast({
      where: {
        type: "Set Vibe Period",
        ledger_id: ledger.id,
      },
      order: "desc",
    });
    if (le.value?.vibe_period === period) {
      r.push({ id: ledger.id, guild_id: ledger.meta?.['vibes:discord_guild_id'] });
    }
  }
  return r;
}
