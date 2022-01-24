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
  vibeLevelEmoji,
  vibe_level_ascii_sender,
  vibe_level_ascii_receiver,
}) {
  return `<@${sending_member.user_id}> →
${"`"}!VIBECHECK${"`"}
${""}
<@${receiving_member.user_id}> ←
${vibeLevelEmoji} ${"`"}${
    receiving_member.vibe_level_name.replace(" Vibe", "").toUpperCase() ||
    "Has no level"
  } ~ ✦${formatNumber(receiving_member.vibestack, "decimal0f")} (${formatNumber(
    receiving_member.vibestack_percentile,
    "percent2f"
  )})${"`"}
${""}
*View full @${receiving_member.username} ledger at* 
**[vibes.app](${process.env.VIBES_LIVE_BASE_URL}/${profilePath})**`;
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
  let embed_color = "";
  let vibe_level_ascii_sender = "";
  let vibe_level_ascii_receiver = "";
  if (sending_member.vibe_level == 1) {
    embed_color = "#8f9296";
    vibe_level_ascii_sender = "˙";
  } else if (sending_member.vibe_level == 2) {
    embed_color = "#5397d5";
    vibe_level_ascii_sender = "‧⁚";
  } else if (sending_member.vibe_level == 3) {
    embed_color = "#915db1";
    vibe_level_ascii_sender = "⁛⁚";
  } else if (sending_member.vibe_level == 4) {
    embed_color = "#d7823b";
    vibe_level_ascii_sender = "⁚⁛⁚";
  } else if (sending_member.vibe_level == 5) {
    embed_color = "#eac545";
    vibe_level_ascii_sender = "⁛⁚⁛⁚";
  }
  if (receiving_member.vibe_level == 1) {
    vibe_level_ascii_receiver = "˙";
  } else if (receiving_member.vibe_level == 2) {
    vibe_level_ascii_receiver = "‧⁚";
  } else if (receiving_member.vibe_level == 3) {
    vibe_level_ascii_receiver = "⁛⁚";
  } else if (receiving_member.vibe_level == 4) {
    vibe_level_ascii_receiver = "⁚⁛⁚";
  } else if (receiving_member.vibe_level == 5) {
    vibe_level_ascii_receiver = "⁛⁚⁛⁚";
  }

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
        title: `${vibe_level_ascii_sender}🔎 Recorded →`,
        color: "#000000",
        url: `${process.env.VIBES_LIVE_BASE_URL}/${profilePath}`,
        description: description({
          emojis,
          ledger_id,
          sending_member,
          receiving_member,
          vibesLedgerSummary,
          profilePath,
          vibeLevelEmoji,
          vibe_level_ascii_sender,
          vibe_level_ascii_receiver,
        }),
      },
    ],
  };
}

export const forCommandReply = forVibeFeed;
