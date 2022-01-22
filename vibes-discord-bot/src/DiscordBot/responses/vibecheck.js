import { DISCORD_EMBED_COLOR } from "../constants";
import formatNumber from "../../lib/formatNumber";
import getGuildStuff from "../discord/getGuildStuff";

function description({
  emojis,
  ledger_id,
  sending_member,
  receiving_member,
  vibesLedgerSummary,
  profilePath,
}) {
  let vibe_level_ascii = "";
  if (sending_member.vibe_level == 1) {
    vibe_level_ascii = "˙";
  } else if (sending_member.vibe_level == 2) {
    vibe_level_ascii = "⁚‧";
  } else if (sending_member.vibe_level == 3) {
    vibe_level_ascii = "⁛⁚";
  } else if (sending_member.vibe_level == 4) {
    vibe_level_ascii = "⁚⁛⁚";
  } else if (sending_member.vibe_level == 5) {
    vibe_level_ascii = "⁛⁚⁛⁚";
  }
  return `<@${sending_member.user_id}> → <@${receiving_member.user_id}>
  ${vibe_level_ascii}*See Vibes profile at* **[vibes.app](${process.env.VIBES_LIVE_BASE_URL}/${profilePath})**`;
}
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
        title: "👀 vibe check ↗",
        color: DISCORD_EMBED_COLOR,
        url: `${process.env.VIBES_LIVE_BASE_URL}/${profilePath}`,
        description: description({
          emojis,
          ledger_id,
          sending_member,
          receiving_member,
          vibesLedgerSummary,
          profilePath,
        }),
      },
    ],
  };
}

export const forCommandReply = forVibeFeed;
