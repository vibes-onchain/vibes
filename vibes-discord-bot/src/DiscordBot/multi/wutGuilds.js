import _ from "lodash";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";

export default async function ({ client }) {
  // const guild_ids = client.guilds.cache.map((g) => g.id === guild_id);
  console.log('guild.id', ',', 'ledger.id', ',', 'guild.name', ',', 'guild.memberCount');
  for (const guild of client.guilds.cache.map((g) => g)) {
    const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
    console.log(guild.id, ',', ledger.id, ',', guild.name, ',', guild.memberCount);
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
