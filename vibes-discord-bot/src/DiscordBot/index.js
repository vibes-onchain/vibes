import { Client } from "discord.js";

import { TOKEN, GLOBAL_CMDS, REQUIRED_INTENTS } from "./constants";

import handleCmd from "./message/handleCmd";
import handleMention from "./message/handleMention";
import saveBadVibe from "./space/saveBadVibe";
import saveVibe from "./space/saveVibe";
import messageVibeFeedChannel from "./discord/messageVibeFeedChannel";
import updateLedgerGuildMembers from "./discord/updateLedgerGuildMembers";
import getLedgerIdsToUpdateEachPeriod from './space/getLedgerIdsToUpdateEachPeriod';
import findOrCreateLedgerForGuild from "./space/findOrCreateLedgerForGuild";

import Cron from "croner";

let bot_guilds = [];

class DiscordBot { }

DiscordBot.start = async function () {
  const client = new Client({
    intents: REQUIRED_INTENTS,
    partials: ["CHANNEL"],
  });

  client.once("ready", async () => {
    // console.log(`connected as @${process.env.APP_DISCORD_BOT_USERNAME}`);
    bot_guilds = client.guilds.cache.reduce((acc, guild) => {
      acc[guild.id] = guild.name;
      return acc;
    }, {});
    for (const [guild_id, guild_name] of Object.entries(bot_guilds)) {
      await findOrCreateLedgerForGuild(guild_id, guild_name);
    }
    console.log(`in guilds`, bot_guilds);
  });

  // guildCreate , handle addition to guild
  // guildDelete, handle removal from guild

  // guildMemberAdd, handle guild member added

  // messageCreate
  // messageReactionAdd
  // messageReactionRemove

  client.on("debug", (msg) => {
    console.log(msg);
  });

  client.on("guildMemberAdd", async (member) => {
    const welcomeEmbed = new Discord.MessageEmbed();

    welcomeEmbed.setColor("#5cf000");
    welcomeEmbed.setTitle("** Welcome to Frenly**");
    welcomeEmbed.setImage("https://i.imgur.com/c76UqNN.gif");

    await member.send(welcomeEmbed);
  });

  client.on("messageCreate", async (message) => {
    // console.log({
    //   message,
    //   member: message.member,
    //   mentions: message.mentions,
    // });
    const bot_role_id = (() => {
      const bot_as_role = message.mentions.roles.find(
        (i) => i.tags?.botId === client.user.id
      )?.id;
      if (bot_as_role) {
        return bot_as_role;
      }
      const bot_as_user = message.mentions.users.find(
        (i) => i.id === client.user.id
      )?.id;
      if (bot_as_user) {
        return bot_as_user;
      }
    })();
    const prefixRoleMention = new RegExp(`^<@&${bot_role_id}>`);
    const prefixUserMention = new RegExp(`^<@!${bot_role_id}>`);
    const prefixAtMention = new RegExp(`^<@${client.user.id}>`);
    if (
      message.content.match(prefixRoleMention) ||
      message.content.match(prefixUserMention) ||
      message.content.match(prefixAtMention)
    ) {
      await handleMention({ message });
    }
    const prefixCmdMention = /^\!([a-zA-Z0-9_]*)\s*(.*)/;
    const cmdM = message.content.match(prefixCmdMention);
    if (cmdM && GLOBAL_CMDS.indexOf(cmdM[1]) !== -1) {
      const cmd = cmdM[1];
      const cmd_args = cmdM[2].split(/[ ]+/);
      await handleCmd({ client, message, cmd, cmd_args });
    }
  });

  client.on("messageReactionAdd", async (reaction, user) => {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await reaction.fetch();
      } catch (error) {
        console.error("Something went wrong when fetching the message:", error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }

    if (reaction.emoji.name == "vibedust") {
      const message = reaction.message;
      const message_member = message.member;
      const guild = message_member.guild;
      const reactionUsers = Array.from(await reaction.users.fetch());
      const lastReactionUser = reactionUsers.at(-1)[1];

      if (lastReactionUser.id === message_member.user.id) {
        return;
      }
      const vibedust_emoji =
        guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";
      const reason = message.content;
      await saveVibe({
        from_user_id: lastReactionUser.id,
        user_id: message_member.user.id,
        reason,
      });
      await messageVibeFeedChannel(guild,
        `${vibedust_emoji} from ${lastReactionUser} to ${message_member}`
      );
    } else if (reaction.emoji.name == "badvibes") {
      const message = reaction.message;
      const message_member = message.member;
      const guild = message_member.guild;

      const reactionUsers = Array.from(await reaction.users.fetch());
      const lastReactionUser = reactionUsers.at(-1)[1];

      if (lastReactionUser.id === message_member.user.id) {
        return;
      }
      const badvibes_emoji =
        guild.emojis.cache.find((emoji) => emoji.name === "badvibes") || "✨";
      const reason = message.content;
      await saveBadVibe({
        from_user_id: lastReactionUser.id,
        user_id: message_member.user.id,
        reason,
      });

      await messageVibeFeedChannel(guild,
        `${badvibes_emoji} from ${lastReactionUser} to ${message_member}`
      );
    } else {
      return;
    }
  });

  client.on("interactionCreate", async (interaction) => {
    console.log({ interaction });
    const member = interaction.options.getMember("target");
    console.log({ member });
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "ping") {
      await interaction.reply("Pong!");
    } else if (commandName === "beep") {
      await interaction.reply("Boop!");
    }
  });

  client.login(TOKEN);

  async function updateSpacesForPeriod(period) {
    const space_ids = await getLedgerIdsToUpdateEachPeriod(period);
    for (const space_id of space_ids) {
      console.log(`UPDATING ledger_id: ${space_id}`);
      await updateLedgerGuildMembers(client, space_id);
    }
  }

  Cron("0 * * * * *", async () => {
    console.log("This will run every minute.");
    await updateSpacesForPeriod("minute");
  });

  Cron("0 0 * * * *", async () => {
    console.log("This will run every hour.");
    await updateSpacesForPeriod("hour");
  });

  Cron("0 0 0 * * *", async () => {
    console.log("This will run every day.");
    await updateSpacesForPeriod("day");
  });

  Cron("0 0 0 * * 1", async () => {
    console.log("This will run every week.");
    await updateSpacesForPeriod("week");
  });

  Cron("0 0 0 1 * *", async () => {
    console.log("This will run every month.");
    await updateSpacesForPeriod("month");
  });

  await new Promise((resolve, reject) => { });
};

export default DiscordBot;
