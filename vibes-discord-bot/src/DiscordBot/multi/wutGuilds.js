import _ from "lodash";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getGuildStuff from "../discord/getGuildStuff";

export default async function ({ client }) {
  // const guild_ids = client.guilds.cache.map((g) => g.id === guild_id);
  console.log('is_setup', ',', 'guild.id', ',', 'ledger.id', ',', 'guild.name', ',', 'guild.memberCount');
  for (const guild of client.guilds.cache.map((g) => g)) {
    const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
    const {vibeFeedChannel} = getGuildStuff({client, guild_id: guild.id});
    const is_setup = !!vibeFeedChannel ? 1 : 0;
    console.log(is_setup, ',', guild.id, ',', ledger.id, ',', guild.name, ',', guild.memberCount);
    // console.log(
    //   "roles",
    //   _.sortBy(
    //     guild.roles.cache.map((i) => ({
    //       name: i.name,
    //       position: i.position,
    //       color: i.color,
    //     })),
    //     "position"
    //   )
    // );
  }
}
