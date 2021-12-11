import { Client } from "discord.js";

import { TOKEN, GLOBAL_CMDS, REQUIRED_INTENTS } from "./constants";

import handleMessage from "./discord/handleMessage";
import handleReaction from "./discord/handleReaction";
import saveBadVibe from "./spothub/saveBadVibe";
import saveVibe from "./spothub/saveVibe";
import readyGuilds from "./discord/readyGuilds";
import messageVibeFeedChannel from "./discord/messageVibeFeedChannel";
import updateLedgerGuildMembers from "./discord/updateLedgerGuildMembers";
import welcomeGuildMember from "./discord/welcomeGuildMember";
import getLedgerIdsToUpdateEachPeriod from "./spothub/getLedgerIdsToUpdateEachPeriod";
import findOrCreateLedgerForGuild from "./spothub/findOrCreateLedgerForGuild";

import Cron from "croner";
import { space } from "subscript/parse";
import parseEmojisForMessage from "./discord/parseEmojisForMessage";

let ready_guilds = [];

class DiscordBot {}

async function updateGuildsForPeriod(client, period) {
  const space_ids = await getLedgerIdsToUpdateEachPeriod(period);
  for (const space_id of space_ids) {
    console.log(`UPDATING ledger_id: ${space_id}`);
    await updateLedgerGuildMembers(client, space_id);
  }
}

async function setupCronJobs(client) {
  Cron("0 * * * * *", async () => {
    console.log("[CRON]", "starting minute tasks");
    await updateGuildsForPeriod(client, "minute");
  });

  Cron("0 0 * * * *", async () => {
    console.log("[CRON]", "starting hour tasks");
    await updateGuildsForPeriod(client, "hour");
  });

  Cron("0 0 0 * * *", async () => {
    console.log("[CRON]", "starting day tasks");
    await updateGuildsForPeriod(client, "day");
  });

  Cron("0 0 0 * * 1", async () => {
    console.log("[CRON]", "starting week tasks");
    await updateGuildsForPeriod(client, "week");
  });

  Cron("0 0 0 1 * *", async () => {
    console.log("[CRON]", "starting month tasks");
    await updateGuildsForPeriod(client, "month");
  });
}

DiscordBot.setupClient = async function () {
  const client = new Client({
    intents: REQUIRED_INTENTS,
    partials: ["CHANNEL"],
  });
  const connect = new Promise((resolve) => {
    client.once("ready", async () => {
      // console.log(`connected as @${process.env.APP_DISCORD_BOT_USERNAME}`);
      ready_guilds = await readyGuilds(client, ready_guilds);
      console.log("[CLIENT]", `Guilds: `, ready_guilds);
      resolve(client);
    });
  });
  client.login(TOKEN);
  await connect;
  return client;
};

DiscordBot.start = async function () {
  const client = new Client({
    intents: REQUIRED_INTENTS,
    partials: ["CHANNEL"],
  });

  client.once("ready", async () => {
    // console.log(`connected as @${process.env.APP_DISCORD_BOT_USERNAME}`);
    ready_guilds = await readyGuilds(client, ready_guilds);
    console.log("[CLIENT]", `Guilds: `, ready_guilds);
  });

  // TODO guildCreate, handle addition to guild
  // TODO guildDelete, handle removal from guild

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
    return handleReaction(client, reaction, user);
  });

  // TODO messageReactionRemove

  client.login(TOKEN);

  await setupCronJobs(client);

  await new Promise((resolve, reject) => {});
};

export default DiscordBot;
