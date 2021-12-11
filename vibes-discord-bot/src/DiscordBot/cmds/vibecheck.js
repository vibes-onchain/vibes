import parseEmojisForMessage from "../discord/parseEmojisForMessage";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getTargetMember from '../message/getTargetMember';

export default async function vibecheck({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;

  const member = await getTargetMember({ message, cmd_args });
  if (!member) {
    console.log("receiver not found");
    return;
  }

  const space = await findOrCreateLedgerForGuild(
    guild.id,
    guild.name
  );

  const vibedust_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";

  const vibecheckEmbed = {
    color: 0x00eeee,
    title: await parseEmojisForMessage(message, `vibesEmoji **vibes of [targetedUser.username]** vibesEmoji `),
    url: `https://www.vibes.live/ledger/${space.id}`,
    description:
      await parseEmojisForMessage(message, `:eyes: _see full profile at Vibes – **vibes.live/[targetedUser.VibesLiveID]**_

      [targetedUser.vibeLevelEmoji]\`VIBELEVEL\` – [targetedUser.vibeLevelEmoji] [targetedUser.vibeLevel] – [targetedUser.vibedust] ([targetedUser.vibeDustPercentile]%)
      :mechanical_arm:\`BOOSTS\` – [=[targetedUser.vibeLevelBoost]*[targetedUser.stakeMoBoost]] [targetedUser.vibeLevelBoost]x for [targetedUser.vibeLevel] Vibe Level and [targetedUser.stakeMoBoost]x for [targetedUser.stakeMo] Months Staked [targetedUser.stakeMoBoost] 
      :pancakes:\`VIBESTACK\` – [targetedUser.vibestack] good until \`VIBEPERIOD\` ends in [vibeperiodRemaining?]
      
      :clipboard: Full Tx log – **vibescan.io/[targetedUser.vibescanID]**
      
      :pig_nose: _requested by [commandingUser.@username]_
      `),
    thumbnail: {
      url: "https://media3.giphy.com/media/L3RMqVU2LRnSLQVO2a/giphy.gif?cid=ecf05e47902q2hpged7tqv0ytxoxveomvuwvqy5sdetze0bu&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  const vibeFeedChannel = message.guild.channels.cache.find(channel => channel.name === "vibe-feed");

  await message.channel.send(await parseEmojisForMessage(message, `see vibeFeed for vibedustEmoji Vibe Check vibedustEmoji`));
  await vibeFeedChannel.send({ embeds: [vibecheckEmbed] });
}
