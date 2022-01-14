import { DISCORD_EMBED_COLOR } from "../constants";
import formatNumber from "../../lib/formatNumber";
import getGuildStuff from "../discord/getGuildStuff";

export function forVibeFeed({
  client,
  guild_id,
  sending_member,
  receiving_member,
  vibesLedgerSummary,
  ledger_id,
}) {
  const { emojis } = getGuildStuff({ client, guild_id });
  const profilePath = `ledger/${ledger_id}/profile/discord_member-${receiving_member.member_id}`;

  const vibeLevelEmoji = (() => {
    if (receiving_member.vibe_level_name === "Sus Vibe") {
      return ":warning:";
    } else if (receiving_member.vibe_level_name === "OG Vibe") {
      return ":yellow_square:";
    } else if (receiving_member.vibe_level_name === "Legendary Vibe") {
      return ":orange_square:";
    } else if (receiving_member.vibe_level_name === "Epic Vibe") {
      return ":purple_square:";
    } else if (receiving_member.vibe_level_name === "Rare Vibe") {
      return ":blue_square:";
    } else if (receiving_member.vibe_level_name === "Frenly Vibe") {
      return ":green_square:";
    } else {
      return ":green_square:";
    }
  })();

  return {
    embeds: [
      {
        color: DISCORD_EMBED_COLOR,
        title: `${":sparkles:"} **vibes of @${
          receiving_member.username
        }** ${":sparkles:"}`,
        url: `${process.env.VIBES_LIVE_BASE_URL}/${profilePath}`,
        description: `:eyes: see full profile at **[Vibes](${
          process.env.VIBES_LIVE_BASE_URL
        }/${profilePath})**
    
          <@${receiving_member.user_id}>
    
          :rocket: \`VIBE LEVEL \` ${vibeLevelEmoji} ${
          receiving_member.vibe_level_name || "Has no level"
        } (${formatNumber(receiving_member.vibestack_percentile, "percent2f")})
          :pancakes: \`VIBE STACK \` ${formatNumber(
            receiving_member.vibestack,
            "decimal0f"
          )}
          :sparkler: \`VIBE DUST  \` ${formatNumber(
            receiving_member.vibedust,
            "decimal0f"
          )} today
          
          :clipboard: Full Tx log at **[vibescan.io](${
            process.env.VIBESCAN_BASE_URL
          }/${profilePath}/entries)**
          
          :detective: _requested by <@${sending_member.user_id}>_
          `,
        thumbnail: {
          url: "https://media3.giphy.com/media/L3RMqVU2LRnSLQVO2a/giphy.gif?cid=ecf05e47902q2hpged7tqv0ytxoxveomvuwvqy5sdetze0bu&rid=giphy.gif&ct=g",
        },
        // image: process.env.VIBES_SHARE_BASE_URL && {
        //   url: `${process.env.VIBES_SHARE_BASE_URL}/{profilePath}/shareable`,
        // },
      },
    ],
  };
}

export const forCommandReply = forVibeFeed;
