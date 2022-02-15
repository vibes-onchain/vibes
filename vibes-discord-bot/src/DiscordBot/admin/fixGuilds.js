import _ from "lodash";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getGuildStuff from "../discord/getGuildStuff";

export default async function ({ client }) {
  // const guild_ids = client.guilds.cache.map((g) => g.id === guild_id);
  for (const guild of client.guilds.cache.map((g) => g)) {
    const guild_id = guild.id;
    const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
    const {vibeFeedChannel} = getGuildStuff({client, guild_id});
    const is_setup = !!vibeFeedChannel ? 1 : 0;
    if (is_setup) {
      console.log(guild.name);
      // ADMIN CODE HERE
    }
  }
}
