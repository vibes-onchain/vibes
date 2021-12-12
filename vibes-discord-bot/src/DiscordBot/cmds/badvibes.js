import getTargetMember from "../message/getTargetMember";
import messageVibeFeedChannel from "../discord/messageVibeFeedChannel";
import saveBadVibe from "../spothub/saveBadVibe";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import parseEmojisForMessage from "../discord/parseEmojisForMessage";


export default async function badvibes({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;
  const space = await findOrCreateLedgerForGuild(
    guild.id,
    guild.name
  );
  const member = await getTargetMember({ message, cmd_args });
  if (!member) {
    console.log("receiver not found");
    return;
  }

  if (member.user.id === message_member.user.id) {
    // await message.channel.send(
    //   `@${target_user.username} you can only vibe others`
    // );
    return;
  }

  if (cmd_args.length < 2) {
    await message.channel.send(
      "fren. i am not allowed to !badvibe someone without reasons! enter some reasons after the @user in your command. or you can use badvibes emoji to react to a post. \n\n!badvibe <@member> <reason for vibe>"
    );
    return;
  }
  const badvibes_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "susvibes") || "✨";
  const reason = cmd_args.slice(1).join(" ");

  await saveBadVibe({
    ledger_id: space.id,
    from_user_id: message_member.user.id,
    user_id: member.user.id,
    reason,
  });

  const vibeFeedChannel = message.guild.channels.cache.find(channel => channel.name === "vibe-feed");

  const badVibesChannelEmbed = {
    color: 0x00eeee,
    // url: parseEmojisForMessage(message, cmd_args, `https://www.vibesbot.gg`),
    description: await parseEmojisForMessage(message, cmd_args, `:clipboard: vibedustEmoji **vibescan.io/[tx.vibescanTX]**`),
    // thumbnail: {
    //   url: "https://media2.giphy.com/media/BzM7MRs96dYpLSeUTy/giphy.gif?cid=ecf05e47yk8rvloiy4yh52cdlyzqoil3ksr606xmluc3p6ox&rid=giphy.gif&ct=ts",
    // },
    // footer: {
    //   text: `Powered by Spot`,
    //   icon_url: "https://i.imgur.com/1c0avUE.png",
    // },
  };

  const badVibesFeedEmbed = {
    color: 0x00eeee,
    url: `https://www.vibesbot.gg`,
    title: await parseEmojisForMessage(message, cmd_args, `susvibesEmoji   **!susvibes**  susvibesEmoji`),
    description: await parseEmojisForMessage(message, cmd_args, `:arrow_right: susvibesEmoji targetedUser – u got susvibes susvibesEmoji  from commandingUser
      for [tx.discordPostLink]
      :pancakes: [commandingUser] has a **\`VIBESTACK\`** of [commandingUser.vibestack] this **\`VIBEPERIOD\`** (vibes.live/[commandingUser.VibesLiveId])
      :timer: **\`VIBEPERIOD\`** ends in [vibeperiodRemaining?]
      :clipboard:Full Tx log – **vibescan.io/[tx.vibescanTX]**`
    ),
    // thumbnail: {
    //   url: "https://media2.giphy.com/media/BzM7MRs96dYpLSeUTy/giphy.gif?cid=ecf05e47yk8rvloiy4yh52cdlyzqoil3ksr606xmluc3p6ox&rid=giphy.gif&ct=ts",
    // },
    // footer: {
    //   text: `Powered by Spot`,
    //   icon_url: "https://i.imgur.com/1c0avUE.png",
    // },
  };

  await message.channel.send({ embeds: [badVibesChannelEmbed] }).catch(e => {
    console.log(e);
  });

  await vibeFeedChannel.send({ embeds: [badVibesFeedEmbed] }).catch(e => {
    console.log(e);
  });

}
