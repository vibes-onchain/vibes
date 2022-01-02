import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";
import LedgerEntry from "spothub/lib/LedgerEntry";
import moment from 'moment';

export default async function ({ guild_id }) {
  const ledger = await findOrCreateLedgerForGuild(guild_id);
  const ledger_id = ledger.id;
  const setVibePeriodLE = await LedgerEntry.findLast({
    where: { ledger_id, type: "Set Vibe Period" },
  });
  let vibe_period;
  let vibe_period_remaining;
  if (setVibePeriodLE && setVibePeriodLE.id) {
    vibe_period = setVibePeriodLE.value?.vibe_period;
    vibe_period_remaining = moment.utc().endOf(vibe_period).from(moment.utc()); 
  }
  let vibe_rate;
  const setVibenomicsLE = await LedgerEntry.findLast({
    where: { ledger_id, type: "Set Vibe Rate" },
  });
  if (setVibenomicsLE && setVibenomicsLE.id) {
    vibe_rate = setVibenomicsLE.value?.vibe_rate;
  } 
  return {
    vibe_period,
    vibe_period_remaining,
    vibe_rate
  };
}
