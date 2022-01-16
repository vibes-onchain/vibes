import { DISCORD_EMBED_COLOR } from "../constants";

import getGuildStuff from "../discord/getGuildStuff";

export function forVibeFeed({
  client,
  guild_id,
  sending_member,
  receiving_member,
  vibestack,
  ledger_id,
}) {
  const { emojis } = getGuildStuff({ client, guild_id });
  return {
    embeds: [
      {
        color: DISCORD_EMBED_COLOR,
        title: `:sparkles: :rocket: ${':sparkles:'} Go Brrrr! ${':sparkles:'} ${':sparkles:'}`,
        url: `${process.env.VIBES_LIVE_BASE_URL}/ledger/${ledger_id}`,
        description: `@${receiving_member.username} now has ${vibestack}${':pancakes:'} vibestack
       :eyes: peep **[vibes.app](http://www.vibes.app/ledger/${ledger_id}/discord_member-${receiving_member.member_id})** to see what @${receiving_member.username} received
       :clipboard: Full Tx log – **[vibescan.io](${process.env.VIBESCAN_BASE_URL}/ledger/${ledger_id}/entries)**`,
        thumbnail: {
          url: "https://media4.giphy.com/media/azGJUrx592uc0/giphy.gif?cid=ecf05e47lrktsdr15ncs416w0n3bil6h37wy9h3zq1br5p6y&rid=giphy.gif&ct=g",
        },
      },
    ],
  };
}

export const forCommandReply = forVibeFeed;

// const dmEmbed = {
//   title: `:sparkles: :rocket: You now have ${vibestack} ${':pancakes:'} vibestack in ${message.guild.name} ${':sparkles:'} ${':sparkles:'}`,
//   url: `${process.env.VIBES_LIVE_BASE_URL}/ledger/${ledger_id}`,
//   description: `:eyes: peep **[vibes.app](http://www.vibes.app/ledger/${ledger_id}/profile/discord_member-${targetedUser.member_id})** to see your profile
//   :clipboard: Full Tx log – **[vibescan.io](${process.env.VIBESCAN_BASE_URL}/ledger/${ledger_id}/entries)**`,
//   thumbnail: vibeFeedEmbed.thumbnail,
// };
// await member.send({ embeds: [dmEmbed] });