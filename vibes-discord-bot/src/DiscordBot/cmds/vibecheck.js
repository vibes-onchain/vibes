import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getTargetMember from "../message/getTargetMember";
import getEmojis from "../discord/getEmojis";
import getMemberDetails from "../multi/getMemberDetails";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import formatNumber from "../../lib/formatNumber";
import getVibeFeed from "../discord/getVibeFeed";

const disable_in_channel_messages = true

export default async function vibecheck({
  client,
  command,
  message,
  cmd_args,
}) {
  const message_member = message ? message.member : command.member;
  const guild = message_member.guild;
  const guild_id = guild.id;

  const target_member = command
    ? cmd_args.find((i) => i.name === "fren").member
    : await getTargetMember({ message, cmd_args });
  if (!target_member) {
    return { error: "receiver not found" };
  }

  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;

  const emojis = await getEmojis({ client, guild_id });

  const sending_member = await getMemberDetails({
    client,
    guild_id,
    member_id: message_member.id,
  });
  const receiving_member = await getMemberDetails({
    client,
    guild_id,
    member_id: target_member.id,
  });

  const vibesLedgerSummary = await getVibesLedgerSummary({ guild_id });

  const profilePath = `ledger/${ledger.id}/profile/discord_member-${receiving_member.member_id}`;

  const vibeLevelEmoji = (() => {
    if (receiving_member.vibeLevel === 'Sus Vibe') {
      return ':warning:';
    } else if (receiving_member.vibeLevel === 'OG Vibe') {
      return ':yellow_square:';
    } else if (receiving_member.vibeLevel === 'Legendary Vibe') {
      return ':orange_square:';
    } else if (receiving_member.vibeLevel === 'Epic Vibe') {
      return ':purple_square:';
    } else if (receiving_member.vibeLevel === 'Rare Vibe') {
      return ':blue_square:';
    } else if (receiving_member.vibeLevel === 'Frenly Vibe') {
      return ':green_square:';
    } else {
      return ':green_square:';
    }
  })();

  const vibecheckEmbed = {
    color: 0x00eeee,
    title: `${":sparkles:"} **vibes of @${
      receiving_member.username
    }** ${":sparkles:"}`,
    url: `${process.env.VIBES_LIVE_BASE_URL}/${profilePath}`,
    description: `:eyes: see full profile at **[Vibes](${
      process.env.VIBES_LIVE_BASE_URL
    }/${profilePath})**

      :rocket: \`VIBE LEVEL \` ${vibeLevelEmoji} ${
      receiving_member.vibeLevel || "Has no level"
    } (${formatNumber(receiving_member.vibestack_percentile, "percent2f")})
      :pancakes: \`VIBE STACK \` ${receiving_member.vibestack}
      :sparkler: \`VIBE DUST  \` ${receiving_member.vibedust} today
      
      :clipboard: Full Tx log at **[vibescan.io](${
        process.env.VIBESCAN_BASE_URL
      }/${profilePath}/entries)**
      
      :detective: _requested by @${sending_member.username}_
      `,
    // TODO /* :mechanical_arm: \`BOOSTS\` – [=${receiving_member.vibeLevelBoost}*${receiving_member.stakeMoBoost}] ${receiving_member.vibeLevelBoost}x for ${receiving_member.vibeLevel} Vibe Level and ${receiving_member.stakeMoBoost}x for ${receiving_member.stakeMo} Months Staked ${receiving_member.stakeMoBoost} */}
    thumbnail: {
      url: "https://media3.giphy.com/media/L3RMqVU2LRnSLQVO2a/giphy.gif?cid=ecf05e47902q2hpged7tqv0ytxoxveomvuwvqy5sdetze0bu&rid=giphy.gif&ct=g",
    },
    image: process.env.VIBES_SHARE_BASE_URL && {
      url: `${process.env.VIBES_SHARE_BASE_URL}/{profilePath}/shareable`,
    },
  };
  const vibeFeedChannel = await getVibeFeed({ client, guild_id });

  if (!disable_in_channel_messages && message?.channel?.id !== vibeFeedChannel.id) {
    await message?.channel?.send(
      `see <#${
        vibeFeedChannel.id
      }> for ${":sparkles:"} Vibe Check ${":sparkles:"}`
    );
  }
  await vibeFeedChannel?.send({ embeds: [vibecheckEmbed] });

  return true;
}
