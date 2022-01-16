import updateAllGuildMembers from "./updateAllGuildMembers";
import getLedgerIdsToUpdateEachPeriod from "../spothub/getLedgerIdsToUpdateEachPeriod";
import moment from "moment";

export default async function updateSomeGuildsThisMinute({ client }) {
  const sample_last_digit = moment().format("m") % 10;
  const sample_guilds = client.guilds.cache
    .map((i) => i)
    .filter((i) => i.id.toString().substr(-1) % 10 === sample_last_digit);
  for (const guild of sample_guilds) {
    console.log(`UPDATING guild_id: ${guild.id} name: ${guild.name}`);
    try {
      await updateAllGuildMembers({ client, guild_id: guild.id });
    } catch (e) {
      console.log(`ERROR guild_id: ${guild.id}`, e);
    }
  }
  // const ledgers = await getLedgerIdsToUpdateEachPeriod(period);
  // for (const ledger of ledgers) {
  //   if (ledger.guild_id && ledger.guild_id.length) {
  //     console.log(`UPDATING ledger_id: ${ledger.id}`);
  //     try {
  //       await updateAllGuildMembers({ client, guild_id: ledger.guild_id });
  //     } catch (e) {
  //       console.log(`ERROR ledger_id: ${ledger.id}`, e);
  //     }
  //   }
  // }
}
