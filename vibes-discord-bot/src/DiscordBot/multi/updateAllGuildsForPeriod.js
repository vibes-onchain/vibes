import updateAllGuildMembers from "./updateAllGuildMembers";
import getLedgerIdsToUpdateEachPeriod from "../spothub/getLedgerIdsToUpdateEachPeriod";

export default async function updateAllGuildsForPeriod({ client, period }) {
  const ledgers = await getLedgerIdsToUpdateEachPeriod(period);
  for (const ledger of ledgers) {
    if (ledger.guild_id && ledger.guild_id.length) {
      console.log(`UPDATING ledger_id: ${ledger.id}`);
      try {
        await updateAllGuildMembers({ client, guild_id: ledger.guild_id });
      } catch (e) {
        console.log(`ERROR ledger_id: ${ledger.id}`, e);
      }
    }
  }
}
