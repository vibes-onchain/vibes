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
}) {
  return `:arrow_right: ${":sparkles:"} @${
    receiving_member.username
  } – u got vibes ${":sparkles:"} from @${sending_member.username} ${
    note ? `\nfor "${note}"` : ""
  }
    :pancakes: @${
      sending_member.username
    } has a **\`VIBESTACK\`** of ${formatNumber(
    sending_member.vibestack,
    "decimal0f"
  )}
    :clipboard:Full Tx log – **[vibescan.io](${
      process.env.VIBESCAN_BASE_URL
    }/ledger/${ledger_id})**`;
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
  return {
    embeds: [
      {
        color: DISCORD_EMBED_COLOR,
        url: process.env.VIBES_LIVE_BASE_URL,
        title: `${":sparkles:"}  **!vibes**  ${":sparkles:"}`,
        description: description({
          emojis,
          ledger_id,
          sending_member,
          receiving_member,
          vibesLedgerSummary,
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
//         description: `:clipboard: ${':sparkles:'} **[vibescan.io](${process.env.VIBESCAN_BASE_URL}/ledger/${ledger_id})** @${sending_member.username} :arrow_right: @${receiving_member.username}`,
//       },
//     ],
//   };
// }
