import Ledger from "spothub/lib/Ledger";
import LedgerEntry from "spothub/lib/LedgerEntry";

export default async function getLedgerIdsToUpdateEachPeriod(period) {
  const ledgers = await Ledger.findAll({ where: {} });
  const r = [];
  for (const ledger of ledgers) {
    const le = await LedgerEntry.findOne({
      where: {
        type: "Set Vibe Period",
        ledger_id: ledger.id,
      },
      order: "desc",
    });
    if (le.value?.vibe_period === period) {
      r.push(ledger.id);
    }
  }
  return r;
}
