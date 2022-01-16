import { DISCORD_EMBED_COLOR } from "../constants";

import getGuildStuff from "../discord/getGuildStuff";

function description({ emojis, ledger_id }) {
  return `**I AM VIBES BOT :sparkles: :robot:**
  i help you show people's vibes  :sparkles:

  **HOW IT WORKS**
  :sunrise_over_mountains: each day @vibesbot will give you a new bag of vibe dust

  :sparkles: when someone has good vibes:
  \`  \`**\`!vibes @frenName\`**
  \`  \`or react with :sparkles:
  
  :warning: when someone is being uncool
  \`  \`**\`!susvibes @frenName\`** 
  \`  \`or react with :warning:

  :mechanical_arm: @vibesbot keeps track of all the vibe dust you receive and turns it into your vibe stack :pancakes:

  :pancakes: your vibe stack determines your vibe level and how much vibe dust you get the next day

  **VIBE LEVELS**
                    \`   VIBELEVEL              VIBESTACK\`
  :warning:                \`Sus Vibe               negative\`
  :green_square:           \`Frenly Vibe            positive\`
  :blue_square:            \`Rare Vibe              69.15 - 84.15 %tile\`
  :purple_square:          \`Epic Vibe              84.15 - 93.32 %tile\`
  :orange_square:          \`Legendary Vibe         93.32 - 97.72 %tile\`
  :yellow_square:          \`OG Vibe                97.72 - 99.99 %tile\`
  
  **DEEP VIBES**
  :clipboard: full tx logs on **[vibescan.io](https://vibescan.io/ledger/${ledger_id}/entries)**
  :eyes: full profiles on **[vibes.app](${process.env.VIBES_LIVE_BASE_URL}/ledger/${ledger_id})**
  `;
}

export function forVibeFeed({ client, guild_id, ledger_id }) {
  const { emojis } = getGuildStuff({ client, guild_id });
  return {
    embeds: [
      {
        color: DISCORD_EMBED_COLOR,
        title: `**wat vibes bot?**`,
        url: process.env.VIBES_LIVE_BASE_URL,
        description: description({ emojis, ledger_id }),
        thumbnail: {
          url: "https://media0.giphy.com/media/1fnwSUTsHRyGXEYMos/giphy.gif?cid=ecf05e47b7vkmx00wquadbiunwj71or7xxm1b44iti4zdaxo&rid=giphy.gif&ct=g",
        },
      },
    ],
  };
}

export const forCommandReply = forVibeFeed;

// export function forChannel({ client, guild_id }) {
//   const { emojis, vibeFeedChannel } = getGuildStuff({ client, guild_id });
//   return {
//     embeds: [
//       {
//         color: DISCORD_EMBED_COLOR,
//         url: process.env.VIBES_LIVE_BASE_URL,
//         description: `see <#${vibeFeedChannel?.id}> for ${':sparkles:'} Wat VibesBot? ${':sparkles:'}`,
//       },
//     ],
//   };
// }
