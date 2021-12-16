import getTargetMember from "../message/getTargetMember";
import saveVibe from "../spothub/saveVibe";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import getEmojis from "../discord/getEmojis";
import getVibeFeed from "../discord/getVibeFeed";
import getMemberDetails from "../multi/getMemberDetails";

export default async function vibes({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;
  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const member = await getTargetMember({ message, cmd_args });
  if (!member) {
    console.log("receiver not found");
    return;
  }

  if (member.user.id === message_member.user.id) {
    // await message.channel.send(
    // `@${target_user.username} you can only vibe others`
    // );
    return;
  }

  // if (cmd_args.length < 2) {
  //   await message.channel.send(
  //     "fren. i am not allowed to !vibe someone without reasons! enter some reasons after the @user in your command. or you can use vibe dust emoji to react to a post. \n\n!vibe <@member> <reason for vibin>"
  //   );
  //   return;
  // }

  const reason = cmd_args.slice(1).join(" ");
  await saveVibe({
    ledger_id: ledger.id,
    from_member_id: message_member.id,
    member_id: member.id,
    reason,
  });

  const vibeFeed = await getVibeFeed({ client, guild_id: guild.id });
  const emojis = await getEmojis({ client, guild_id: guild.id });

  const senderDetails = await getMemberDetails({
    client,
    guild_id: guild.id,
    member_id: message_member.id,
  });

  const vibesLedgerSummary = await getVibesLedgerSummary({
    guild_id: guild.id,
  });

  const vibesFeedEmbed = {
    color: 0x00eeee,
    url: `https://www.vibesbot.gg`,
    title: `${emojis.vibes}  **!vibes**  ${emojis.vibes}`,
    description: `:arrow_right: ${emojis.vibedust} @${
      member.user.username
    } – u got vibes ${emojis.vibes} from @${message_member.user.username} ${
      reason ? `\nfor "${reason}"` : ""
    }
      :pancakes: @${message_member.user.username} has a **\`VIBESTACK\`** of ${
      senderDetails.vibestack
    } this **\`VIBEPERIOD\`** [vibe.live](${
      process.env.VIBES_LIVE_BASE_URL
    }/ledger/${ledger.id}/profile/discord_member-${message_member.id})
      :timer: **\`VIBEPERIOD\`** ends ${
        vibesLedgerSummary.vibe_period_remaining
      }
      :clipboard:Full Tx log – **[vibescan.io](${
        process.env.VIBESCAN_BASE_URL
      }/ledger/${ledger.id})**`,
    // thumbnail: {
    //   url: "https://media2.giphy.com/media/BzM7MRs96dYpLSeUTy/giphy.gif?cid=ecf05e47yk8rvloiy4yh52cdlyzqoil3ksr606xmluc3p6ox&rid=giphy.gif&ct=ts",
    // },
    // footer: {
    //   text: `Powered by Spot`,
    //   icon_url: "https://i.imgur.com/1c0avUE.png",
    // },
  };
  await vibeFeed?.send({ embeds: [vibesFeedEmbed] }).catch((e) => {
    console.log(e);
  });

  if (vibeFeed.id !== message.channel.id) {
    const vibesChannelEmbed = {
      color: 0x00eeee,
      // url: parseEmojisForMessage(message, cmd_args, `https://www.vibesbot.gg`),
      description: `:clipboard: ${emojis.vibedust} **[vibescan.io](${process.env.VIBESCAN_BASE_URL}/ledger/${ledger.id})** @${message_member.user.username} :arrow_right: @${member.user.username}`,
    };

    await message.channel.send({ embeds: [vibesChannelEmbed] }).catch((e) => {
      console.log(e);
    });
  }
}
