import _ from "lodash";

export default async function ({ client, guild_id }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  console.log(guild);
  console.log('roles',
    _.sortBy(
      guild.roles.cache.map((i) => ({ name: i.name, position: i.position, color: i.color })),
      "position"
    )
  );
}
