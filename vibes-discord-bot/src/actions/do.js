import DiscordBot from ":/DiscordBot";

export default async function (args) {
  const task = args?.task;
  const taskRepeat = args?.taskRepeat ?? 1;
  if (!task) {
    console.log('no task specified');
    console.log('./bin/run_action do --task discord/setupVibeRoles --guild_id 888510606091620406');
    return;
  }
  const client = await DiscordBot.setupClient();
  const actionHandler = require(`${__dirname}/../DiscordBot/${task}`);
  for (let i = 0; i < taskRepeat ; i++) {
    const r = await actionHandler({client, ...args});
    console.log(r);
  }
}
