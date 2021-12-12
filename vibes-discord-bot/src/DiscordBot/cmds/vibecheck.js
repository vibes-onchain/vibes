import parseEmojisForMessage from "../discord/parseEmojisForMessage";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getTargetMember from "../message/getTargetMember";
import getEmojis from "../discord/getEmojis";
import getMemberDetails from "../helpers/getMemberDetails";
import getVibesLedgerSummary from '../spothub/getVibesLedgerSummary';

export default async function vibecheck({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;
  const guild_id = guild.id;

  const member = await getTargetMember({ message, cmd_args });
  if (!member) {
    console.log("receiver not found");
    return;
  }

  const space = await findOrCreateLedgerForGuild(guild.id, guild.name);

  const emojis = await getEmojis({ client, guild_id });

  const commandingUser = await getMemberDetails({
    client,
    guild_id,
    member_id: message_member.id,
  });
  const targetedUser = await getMemberDetails({
    client,
    guild_id,
    member_id: message_member.id,
  });

  const vibesLedgerSummary = await getVibesLedgerSummary({ guild_id });

  const profilePath = `ledger/${space.id}/profile/discord_member-${targetedUser.member_id}`;

  const vibecheckEmbed = {
    color: 0x00eeee,
    title: await parseEmojisForMessage(
      message,
      cmd_args,
      `${emojis.vibes} **vibes of @${targetedUser.username}** ${emojis.vibes}`
    ),
    url: `https://www.vibes.live/${profilePath}`,
    description: await parseEmojisForMessage(
      message,
      cmd_args,
      `:eyes: _see full profile at **[Vibes](https://www.vibes.live/${profilePath})**_

      ${targetedUser.vibeLevelEmoji} \`VIBELEVEL\` – ${targetedUser.vibeLevelEmoji} ${targetedUser.vibeLevel} with ${targetedUser.vibedust}${emojis.vibedust} (${targetedUser.vibedustPercentile})
      :pancakes: \`VIBESTACK\` – ${targetedUser.vibestack} good until \`VIBEPERIOD\` ends in ${vibesLedgerSummary.period_remaining}

      :mechanical_arm: \`BOOSTS\` – [=${targetedUser.vibeLevelBoost}*${targetedUser.stakeMoBoost}] ${targetedUser.vibeLevelBoost}x for ${targetedUser.vibeLevel} Vibe Level and ${targetedUser.stakeMoBoost}x for ${targetedUser.stakeMo} Months Staked ${targetedUser.stakeMoBoost} 
      
      :clipboard: Full Tx log – **[vibescan.io](https://vibescane.io/${profilePath}/log)**
      
      :pig_nose: _requested by @${commandingUser.username}_
      `
    ),
    thumbnail: {
      url: "https://media3.giphy.com/media/L3RMqVU2LRnSLQVO2a/giphy.gif?cid=ecf05e47902q2hpged7tqv0ytxoxveomvuwvqy5sdetze0bu&rid=giphy.gif&ct=g",
    },
    // footer: {
    //   text: `Powered by Vibes`,
    //   icon_url: "https://www.vibes.live/vibes-hand.png",
    // },
  };
  const vibeFeedChannel = message.guild.channels.cache.find(
    (channel) => channel.name === "vibe-feed"
  );

  await message.channel.send(
    await parseEmojisForMessage(
      message,
      cmd_args,
      `see vibeFeed for vibedustEmoji Vibe Check vibedustEmoji`
    )
  );
  await vibeFeedChannel?.send({ embeds: [vibecheckEmbed] });
}
