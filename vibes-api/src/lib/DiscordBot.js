import { Client, Intents } from "discord.js";

let sharedDiscordClient = null;

export default class DiscordBot {}

DiscordBot.setupClient = async function () {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
  });
  const connect = new Promise((resolve) => {
    client.once("ready", async () => {
      resolve(client);
    });
  });
  console.log("[DISCORD] logging in");
  client.login(process.env.APP_DISCORD_BOT_TOKEN);
  await connect;
  return client;
};

DiscordBot.getClient = async function () {
  if (sharedDiscordClient && sharedDiscordClient.isReady()) {
    return sharedDiscordClient;
  } else {
    const client = await DiscordBot.setupClient();
    sharedDiscordClient = client;
    return sharedDiscordClient;
  }
};
