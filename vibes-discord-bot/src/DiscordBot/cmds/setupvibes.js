import setupGuild from "../discord/setupGuild";

export default async function ({ client, guild_id }) {
  await setupGuild({ client, guild_id });
}
