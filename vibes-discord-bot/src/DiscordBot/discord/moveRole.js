import _ from "lodash";

export default async function ({ client, guild_id, name, position }) {
  if (!guild_id) {
    throw new Error("needs guild_id");
  }
  const guild = client.guilds.cache.find((g) => g.id === guild_id);
  if (!guild) {
    throw new Error("guild not found");
  }
  const role = guild.roles.cache.find((i) => i.name === name);
  await role.setPosition(position)
  console.log(role);
}
