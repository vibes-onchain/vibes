import { DISCORD_EMBED_COLOR } from "../constants";
import formatNumber from "../../lib/formatNumber";
import getGuildStuff from "../discord/getGuildStuff";
import getVibeRoleAliases from "../spothub/getVibeRoleAliases";
import getVibeReactionAliases from "../spothub/getVibeReactionAliases";

function description({
  emojis,
  ledger_id,
  note,
  sending_member,
  receiving_member,
  vibesLedgerSummary,
  guildName,
  vibe_level_ascii,
  vibe_level_action,
  reaction_emoji,
}) {
  return `<@${sending_member.user_id}>  ⟩
${"`"}!${vibe_level_action}${"`"}${vibe_level_ascii}${reaction_emoji}
<@${receiving_member.user_id}>  ⟨
${""} 
*Tx written to ${guildName} Ledger*
**[vibes.app](${process.env.VIBESCAN_BASE_URL}/ledger/${ledger_id})**`;
}

export async function forVibeFeed({
  client,
  guild_id,
  sending_member,
  receiving_member,
  vibesLedgerSummary,
  ledger_id,
  message,
  reaction,
}) {
  const { emojis } = getGuildStuff({ client, guild_id });
  const guildName = client.guilds.cache.find((g) => g.id === guild_id).name;
  const role_alias = await getVibeRoleAliases({ guild_id });
  const reaction_alias = await getVibeReactionAliases({ guild_id });
  let embed_color = "#ffffff";
  let vibe_level_ascii = "";
  let vibe_level_action = `${
    role_alias[sending_member.vibe_level_name] ||
    sending_member.vibe_level_name ||
    "!VIBES"
  }`
    .replace(" ", "-")
    .toUpperCase();
  let reaction_emoji = "✨";
  if (sending_member.vibe_level == 1) {
    embed_color = "#8f9296";
    vibe_level_ascii = "˙";
  } else if (sending_member.vibe_level == 2) {
    embed_color = "#5397d5";
    vibe_level_ascii = "‧⁚";
  } else if (sending_member.vibe_level == 3) {
    embed_color = "#915db1";
    vibe_level_ascii = "⁛⁚";
  } else if (sending_member.vibe_level == 4) {
    embed_color = "#d7823b";
    vibe_level_ascii = "⁚⁛⁚";
  } else if (sending_member.vibe_level == 5) {
    embed_color = "#eac545";
    vibe_level_ascii = "⁛⁚⁛⁚";
  }
  if (reaction) {
    reaction_emoji = "✨";
  }

  return {
    embeds: [
      {
        title: `${vibe_level_ascii}✨ Recorded →`,
        color: embed_color,
        url: message?.url,
        description: description({
          emojis,
          ledger_id,
          sending_member,
          receiving_member,
          vibesLedgerSummary,
          guildName,
          vibe_level_ascii,
          message,
          vibe_level_action,
          reaction_emoji,
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
