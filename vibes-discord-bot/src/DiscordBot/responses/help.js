import { DISCORD_EMBED_COLOR } from "../constants";

import getGuildStuff from "../discord/getGuildStuff";

function description({ emojis, ledger_id }) {
  return `**I AM VIBES BOT ${emojis.vibes} :robot:**
  :eyes: i help you show people's vibes  ${emojis.vibes} \n
  **DURING A NEW VIBE PERIOD**
  :timer: u get a new **\`VIBESTACK\`** at bgn of each **\`VIBEPERIOD\`** 
  ${emojis.vibedust}  use this react wen fren has **\`!VIBES\`**
  ${emojis.susvibe}   use this react wen fren has **\`!susvibes\`** \n
  **AT THE END OF A VIBE PERIOD**
  :arrow_right:  ${emojis.vibedust}  ur whole **\`VIBESTACK\`**:pancakes: distros as **\`VIBEDUST\`** based on who you gave \`!VIBES\`
  :arrow_left:  ${emojis.vibedust}  u get **\`VIBEDUST\`** based on who gave you **\`!VIBES\`** ${emojis.vibes} and their \`VIBESTACK\`:pancakes:
  :mechanical_arm: ur **\`VIBELEVEL\`** is calculated by ranking your **\`VIBEDUST\`** in community\n
  **HOW VIBE LEVELS WORK**
                    \`   VIBELEVEL              VIBEDUST %ILE  \`
  ${emojis.vibes}          \`Frenly Vibe            15.87% - 69.15%\`
  ${emojis.rarevibe}       \`Rare Vibe              69.15% - 84.15%\`
  ${emojis.epicvibe}       \`Epic Vibe              84.15% - 93.32%\`
  ${emojis.legendaryvibe}  \`Legendary Vibe         93.32% - 97.72%\`
  ${emojis.ogvibe}         \`OG Vibe                97.72% - 99.99%\`
  
  :rocket: ur **\`VIBELEVEL\`** will boost ur **\`VIBESTACK\`** before each new **\`VIBEPERIOD\`**
  
  **DEEP VIBES**
  :clipboard: full tx logs on **[vibescan.io](https://vibescan.io/ledger/${ledger_id}/entries)**
  :eyes: full profiles on **[vibes.live](${process.env.VIBES_LIVE_BASE_URL}/ledger/${ledger_id})**
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

export function forChannel({ client, guild_id }) {
  const { emojis, vibeFeedChannel } = getGuildStuff({ client, guild_id });
  return {
    embeds: [
      {
        color: DISCORD_EMBED_COLOR,
        url: process.env.VIBES_LIVE_BASE_URL,
        description: `see <#${vibeFeedChannel?.id}> for ${emojis.vibedust} Wat VibesBot? ${emojis.vibedust}`,
      },
    ],
  };
}
