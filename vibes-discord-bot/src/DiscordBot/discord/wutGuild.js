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
  await guild.commands.fetch();
  console.log(
    "commands",
    _.sortBy(
      guild.commands.cache
        .map((i) => i)
        .filter((i) => i.applicationId === process.env.APP_DISCORD_APP_ID)
        .map((i) => ({
          ..._.pick(i, ["name", "description"]),
          options: i.options.map((i) => i.name),
        })),
      "name"
    )
  );
  console.log(
    "roles",
    _.sortBy(
      guild.roles.cache.map((i) => ({
        name: i.name,
        position: i.position,
        color: i.color,
      })),
      "position"
    )
  );
}
