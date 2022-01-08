import { Client } from "discord.js";

import { TOKEN, GLOBAL_CMDS, REQUIRED_INTENTS } from "./constants";

import handleMessage from "./discord/handleMessage";
import handleReaction from "./discord/handleReaction";
import handleSlashCommand from "./discord/handleSlashCommand";
import readyGuilds from "./discord/readyGuilds";
import updateAllGuildMembers from "./multi/updateAllGuildMembers";
import welcomeGuildMember from "./discord/welcomeGuildMember";
import getLedgerIdsToUpdateEachPeriod from "./spothub/getLedgerIdsToUpdateEachPeriod";
import updateAllGuildsForPeriod from "./multi/updateAllGuildsForPeriod";

import Cron from "croner";

let ready_guilds = [];

class DiscordBot {}

async function setupCronJobs(client) {
  Cron("0 * * * * *", async () => {
    console.log("[CRON]", "starting minute tasks");
    await updateAllGuildsForPeriod({ client, period: "minute" });
  });

  Cron("0 0 * * * *", async () => {
    console.log("[CRON]", "starting hour tasks");
    await updateAllGuildsForPeriod({ client, period: "hour" });
  });

  Cron("0 0 0 * * *", async () => {
    console.log("[CRON]", "starting day tasks");
    await updateAllGuildsForPeriod({ client, period: "day" });
  });

  Cron("0 0 0 * * 1", async () => {
    console.log("[CRON]", "starting week tasks");
    await updateAllGuildsForPeriod({ client, period: "week" });
  });

  Cron("0 0 0 1 * *", async () => {
    console.log("[CRON]", "starting month tasks");
    await updateAllGuildsForPeriod({ client, period: "month" });
  });
}

async function setupListeners(client) {
  if (client.isReady()) {
      ready_guilds = await readyGuilds(client, ready_guilds);
      console.log("[CLIENT]", `Guilds: `, ready_guilds);
  } else {
    client.once("ready", async () => {
      ready_guilds = await readyGuilds(client, ready_guilds);
      console.log("[CLIENT]", `Guilds: `, ready_guilds);
    });
  }
  // TODO guildCreate, handle addition to guild
  // TODO guildDelete, handle removal from guild

  // client.on("apiRequest", (msg) => {
  //   console.log("[DISCORD]", msg?.method, msg?.path, msg?.route);
  // });

  client.on("debug", (msg) => {
    console.log("[DISCORD]", msg);
  });

  client.on("guildMemberAdd", async (member) => {
    const guild_id = member.guild?.id;
    return welcomeGuildMember(client, guild_id, member);
  });

  client.on("messageCreate", async (message) => {
    return handleMessage(client, message);
  });

  client.on("messageReactionAdd", async (reaction, user) => {
    console.log("messageReactionAdd", { reaction });
    return handleReaction(client, reaction, user);
  });

  client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    return handleSlashCommand({ client, command: interaction });
  });
  // TODO messageReactionRemove
}

DiscordBot.setupClient = async function () {
  const client = new Client({
    intents: REQUIRED_INTENTS,
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
  });
  const connect = new Promise((resolve) => {
    client.once("ready", async () => {
      resolve(client);
    });
  });
  client.login(TOKEN);
  await connect;
  return client;
};

DiscordBot.start = async function () {
  const client = await DiscordBot.setupClient();

  if (!!parseInt(process.env.APP_DISCORD_BOT_LISTENS)) {
    console.log("[CLIENT] Starting listeners");
    await setupListeners(client);
  }

  if (!!parseInt(process.env.APP_DISCORD_BOT_RUNS_CRON_JOBS)) {
    console.log("[CLIENT] Starting cron handlers");
    await setupCronJobs(client);
  }

  await new Promise((resolve, reject) => {});
};

export default DiscordBot;
