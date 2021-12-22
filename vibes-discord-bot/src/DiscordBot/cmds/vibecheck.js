import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getTargetMember from "../message/getTargetMember";
import getEmojis from "../discord/getEmojis";
import getMemberDetails from "../multi/getMemberDetails";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import formatNumber from "../../lib/formatNumber";
import getVibeFeed from "../discord/getVibeFeed";

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
    member_id: member.id,
  });

  const vibesLedgerSummary = await getVibesLedgerSummary({ guild_id });

  const profilePath = `ledger/${space.id}/profile/discord_member-${targetedUser.member_id}`;

  const vibeLevelEmoji = targetedUser.vibeLevel
    ? emojis[targetedUser.vibeLevel.replace(/ /, "").toLowerCase()]
    : ":seedling:";

  const vibecheckEmbed = {
    color: 0x00eeee,
    title: `${emojis.vibes} **vibes of @${targetedUser.username}** ${emojis.vibes}`,
    url: `${process.env.VIBES_LIVE_BASE_URL}/${profilePath}`,
    description: `:eyes: see full profile at **[Vibes](${
      process.env.VIBES_LIVE_BASE_URL
    }/${profilePath})**

      ${vibeLevelEmoji} \`VIBELEVEL\` – ${vibeLevelEmoji} ${
      targetedUser.vibeLevel || "Has no level"
    } with ${targetedUser.vibedust}${emojis.vibedust} (${formatNumber(
      targetedUser.vibedust_percentile,
      "percent2f"
    )})
      :pancakes: \`VIBESTACK\` – ${
        targetedUser.vibestack
      } good until \`VIBEPERIOD\` ends ${
      vibesLedgerSummary.vibe_period_remaining
    }
      
      :clipboard: Full Tx log – **[vibescan.io](${
        process.env.VIBESCAN_BASE_URL
      }/${profilePath}/entries)**
      
      :pig_nose: _requested by @${commandingUser.username}_
      `,
    // TODO /* :mechanical_arm: \`BOOSTS\` – [=${targetedUser.vibeLevelBoost}*${targetedUser.stakeMoBoost}] ${targetedUser.vibeLevelBoost}x for ${targetedUser.vibeLevel} Vibe Level and ${targetedUser.stakeMoBoost}x for ${targetedUser.stakeMo} Months Staked ${targetedUser.stakeMoBoost} */}
    thumbnail: {
      url: "https://media3.giphy.com/media/L3RMqVU2LRnSLQVO2a/giphy.gif?cid=ecf05e47902q2hpged7tqv0ytxoxveomvuwvqy5sdetze0bu&rid=giphy.gif&ct=g",
    },
    // footer: {
    //   text: `Powered by Vibes`,
    //   icon_url: "${process.env.VIBES_LIVE_BASE_URL}/vibes-hand.png",
    // },
  };
  const vibeFeedChannel = await getVibeFeed({ client, guild_id });

  await message.channel.send(
    `see <#${vibeFeedChannel.id}> for ${emojis.vibedust} Vibe Check ${emojis.vibedust}`
  );
  await vibeFeedChannel?.send({ embeds: [vibecheckEmbed] });
}
