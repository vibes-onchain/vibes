import { DISCORD_EMBED_COLOR } from "../constants";
import formatNumber from "../../lib/formatNumber";

import getGuildStuff from "../discord/getGuildStuff";

function description({
  emojis,
  ledger_id,
  note,
  sending_member,
  receiving_member,
  vibesLedgerSummary,
  guildName,
}) {
  let vibe_level_ascii = "";
  if (receiving_member.vibe_level == 1) {
    vibe_level_ascii = "˙";
  } else if (receiving_member.vibe_level == 2) {
    vibe_level_ascii = "⁚‧";
  } else if (receiving_member.vibe_level == 3) {
    vibe_level_ascii = "⁚⁛";
  } else if (receiving_member.vibe_level == 4) {
    vibe_level_ascii = "⁚⁛⁚";
  } else if (receiving_member.vibe_level == 5) {
    vibe_level_ascii = "⁚⁛⁚⁛";
  }
  return `<@${sending_member.user_id}>${"`"}!SUS-VIBES${"`"}<@${
    receiving_member.user_id
  }>
  *${vibe_level_ascii}Tx written to ${guildName} Ledger → **[vibes.app](${
    process.env.VIBESCAN_BASE_URL
  }/ledger/${ledger_id})***`;
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
  const guildName = client.guilds.cache.find((g) => g.id === guild_id).name;

  return {
    embeds: [
      {
        title: "⚠️ !sus-vibes recorded ↺",
        color: "#EE4B2B",
        url: `${process.env.VIBESCAN_BASE_URL}/ledger/${ledger_id}`,
        description: description({
          emojis,
          ledger_id,
          sending_member,
          receiving_member,
          vibesLedgerSummary,
          guildName,
        }),
      },
    ],
  };
}

export const forCommandReply = forVibeFeed;

// export function forChannel({
//   client,
//   guild_id,
//   ledger_id,
//   sending_member,
//   receiving_member,
// }) {
//   const { emojis } = getGuildStuff({ client, guild_id });
//   return {
//     embeds: [
//       {
//         color: DISCORD_EMBED_COLOR,
//         url: process.env.VIBES_LIVE_BASE_URL,
//         description: `:clipboard: ${':warning:'} **[vibescan.io](${process.env.VIBESCAN_BASE_URL}/ledger/${ledger_id})** @${sending_member.username} :arrow_right: @${receiving_member.username}`,
//       },
//     ],
//   };
// }
