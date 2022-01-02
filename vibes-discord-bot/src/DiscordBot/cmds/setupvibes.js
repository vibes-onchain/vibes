import setupGuild from "../discord/setupGuild";
import getGuildStuff from "../discord/getGuildStuff";

export default async function ({ client, command, guild_id }) {
  if (command) {
    await command.reply({
      content: `:runner: running setup script. please wait.`,
      ephemeral: true,
    });
  }

  await setupGuild({ client, guild_id });

  const { vibeFeedChannel } = getGuildStuff({ client, guild_id });
  await vibeFeedChannel?.send("discord server has been setup").catch((e) => {
    console.log(e);
  });

  return true;
}
