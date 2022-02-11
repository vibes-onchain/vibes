import setupGuild from "../discord/setupGuild";
import getGuildStuff from "../discord/getGuildStuff";
import setupNewGuildStep1 from "../multi/setupNewGuildStep1";
import canControlVibesBot from "../discord/canControlVibesBot";

export default async function ({ client, command, message, guild_id }) {
  const message_member = message ? message.member : command.member;

  if (
    !(await canControlVibesBot({
      client,
      guild_id,
      member_id: message_member?.id,
    }))
  ) {
    return { error: "you must be a vibesbot admin" };
  }

  const please_wait_msg = `:runner: running setup script. i'll be right back.`;
  if (command) {
    await command.reply({
      content: please_wait_msg,
      ephemeral: true,
    });
  } else if (message) {
    await message.channel.send(please_wait_msg);
  }


  await setupGuild({ client, guild_id });

  const { vibeFeedChannel, vibesConfigChannel } = getGuildStuff({ client, guild_id });
  await vibeFeedChannel?.send("discord server has been setup").catch((e) => {
    console.log(e);
  });
  await setupNewGuildStep1({client, guild_id});
  return true;
}
