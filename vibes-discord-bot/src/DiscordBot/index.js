import { Client } from "discord.js";

import { TOKEN, GLOBAL_CMDS, REQUIRED_INTENTS } from "./constants";

import handleCmd from "./message/handleCmd";
import handleMention from "./message/handleMention";
import saveBadVibe from "./spothub/saveBadVibe";
import saveVibe from "./spothub/saveVibe";
import messageVibeFeedChannel from "./discord/messageVibeFeedChannel";
import updateLedgerGuildMembers from "./discord/updateLedgerGuildMembers";
import getLedgerIdsToUpdateEachPeriod from './spothub/getLedgerIdsToUpdateEachPeriod';
import findOrCreateLedgerForGuild from "./spothub/findOrCreateLedgerForGuild";

import Cron from "croner";
import { space } from "subscript/parse";
import parseEmojisForMessage from "./discord/parseEmojisForMessage";

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
    const message = reaction.message;
    const message_member = message.member;
    const guild = message_member.guild;
    const space = await findOrCreateLedgerForGuild(
      guild.id,
      guild.name
    );

    if (reaction.emoji.name == "vibedust") {
      const reactionUsers = Array.from(await reaction.users.fetch());
      const lastReactionUser = reactionUsers.at(-1)[1];

      if (lastReactionUser.id === message_member.user.id) {
        return;
      }

      const reason = message.content;
      await saveVibe({
        ledger_id: space.id,
        from_user_id: lastReactionUser.id,
        user_id: message_member.user.id,
        reason,
      });

      const vibesEmbedFeed = {
        color: 0x00eeee,
        title: await parseEmojisForMessage(message, `vibesEmoji  **!vibes**  vibesEmoji`),
        url: `https://vibes.live/[VibesLiveCommunityID]`,
        description: await parseEmojisForMessage(message, ` :right_arrow: vibedustEmoji  [targetedUser.@username] – u got vibes vibesEmoji  from [commandingUser.username]
          for [tx.discordPostLink]
          :pancakes: [commandingUser] has a **\`VIBESTACK\`** of [commandingUser.vibestack] this **\`VIBEPERIOD\`** (vibes.live/[commandingUser.VibesLiveId])
          :timer: **\`VIBEPERIOD\`** ends in [vibeperiodRemaining?]
          
          :clipboard:Full Tx log – **vibescan.io/[tx.vibescanTX]**`),
        footer: {
          text: `Powered by Spot`,
          icon_url: "https://i.imgur.com/1c0avUE.png",
        },
      };

      const vibeFeedChannel = message.guild.channels.cache.find(channel => channel.name === "vibe-feed");
      // await message.channel.send(await parseEmojisForMessage(message, `:clipboard: susvibesEmoji  **vibescan.io/[tx.vibescanTX]**`)).catch(e => {
      //   console.log(e);
      // });
      await vibeFeedChannel.send({ embeds: [vibesEmbedFeed] }).catch(e => {
        console.log(e);
      });
    } else if (reaction.emoji.name == "susvibes") {
      const reactionUsers = Array.from(await reaction.users.fetch());
      const lastReactionUser = reactionUsers.at(-1)[1];

      if (lastReactionUser.id === message_member.user.id) {
        return;
      }

      const reason = message.content;
      await saveBadVibe({
        ledger_id: space.id,
        from_user_id: lastReactionUser.id,
        user_id: message_member.user.id,
        reason,
      });


      const badVibesEmbedFeed = {
        color: 0x00eeee,
        title: await parseEmojisForMessage(message, `:arrow_right: vibedustEmoji New Vibe Distro! vibedustEmoji  vibedustEmoji`),
        url: `https://vibes.live/[VibesLiveCommunityID]`,
        description: await parseEmojisForMessage(message, `:right_arrow: susvibesEmoji   [targetedUser.@username] – u got susvibes susvibesEmoji   from [commandingUser.username]
        for [tx.discordPostLink]
        :pancakes: [commandingUser] has a **\`VIBESTACK\`** of [commandingUser.vibestack] this **\`VIBEPERIOD\`** (vibes.live/[commandingUser.VibesLiveId])
        :timer: **\`VIBEPERIOD\`** ends in [vibeperiodRemaining?]
        
        :clipboard:Full Tx log – **vibescan.io/[tx.vibescanTX]**`),
        footer: {
          text: `Powered by Spot`,
          icon_url: "https://i.imgur.com/1c0avUE.png",
        },
      };

      const vibeFeedChannel = message.guild.channels.cache.find(channel => channel.name === "vibe-feed");
      await message.channel.send(await parseEmojisForMessage(message, `:clipboard: susvibesEmoji  **vibescan.io/[tx.vibescanTX]**`)).catch(e => {
        console.log(e);
      });
      await vibeFeedChannel.send({ embeds: [badVibesEmbedFeed] }).catch(e => {
        console.log(e);
      });

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
