import _ from "lodash";

export default async function ({ client }) {
  // const guild_ids = client.guilds.cache.map((g) => g.id === guild_id);
  for (const guild of client.guilds.cache.map((g) => g)) {
    console.log(guild.id, guild.name, guild.memberCount);
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
