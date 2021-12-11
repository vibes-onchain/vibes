import DiscordBot from ":/DiscordBot";

export default async function (args) {
  const task = args?.task; 
  if (!task) {
    console.log('no task specified');
    console.log('./bin/run_action do --task discord/setupVibeRoles --guild_id 888510606091620406');
    return;
  }
  const client = await DiscordBot.setupClient();
  const actionHandler = require(`${__dirname}/../DiscordBot/${task}`);
  await actionHandler({client, ...args});
}
