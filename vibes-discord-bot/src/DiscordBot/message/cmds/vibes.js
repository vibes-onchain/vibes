import getTargetMember from "../getTargetMember";
import messageVibeFeedChannel from "../../discord/messageVibeFeedChannel";
import saveVibe from "../../space/saveVibe";
import findOrCreateLedgerForGuild from "../../space/findOrCreateLedgerForGuild";
import parseEmojisForMessage from "../../discord/parseEmojisForMessage";
export default async function vibes({ client, message, cmd_args }) {
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
      "fren. i am not allowed to !vibe someone without reasons! enter some reasons after the @user in your command. or you can use vibe dust emoji to react to a post. \n\n!vibe <@member> <reason for vibin>"
    );
    return;
  }
  const vibedust_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";

  const reason = cmd_args.slice(1).join(" ");
  await saveVibe({
    ledger_id: space.id,
    from_user_id: message_member.user.id,
    user_id: member.user.id,
    reason,
  });


  const vibeFeedChannel = message.guild.channels.cache.find(channel => channel.name === "vibe-feed");

  const vibesChannelEmbed = {
    color: 0x00eeee,
    // url: parseEmojisForMessage(message, `https://www.vibesbot.gg`),
    description: await parseEmojisForMessage(message, `:clipboard: vibedustEmoji **vibescan.io/[tx.vibescanTX]**`),
    // thumbnail: {
    //   url: "https://media2.giphy.com/media/BzM7MRs96dYpLSeUTy/giphy.gif?cid=ecf05e47yk8rvloiy4yh52cdlyzqoil3ksr606xmluc3p6ox&rid=giphy.gif&ct=ts",
    // },
    // footer: {
    //   text: `Powered by Spot`,
    //   icon_url: "https://i.imgur.com/1c0avUE.png",
    // },
  };

  const vibesFeedEmbed = {
    color: 0x00eeee,
    url: `https://www.vibesbot.gg`,
    title: await parseEmojisForMessage(message, `vibesEmoji  **!vibes**  vibesEmoji`),
    description: await parseEmojisForMessage(message, `:right_arrow: vibedustEmoji  [targetedUser.@username] – u got vibes vibesEmoji  from [commandingUser.username]
      for "[tx.vibesReason]"
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

  await message.channel.send({ embeds: [vibesChannelEmbed] }).catch(e => {
    console.log(e);
  });

  await vibeFeedChannel.send({ embeds: [vibesFeedEmbed] }).catch(e => {
    console.log(e);
  });
}
