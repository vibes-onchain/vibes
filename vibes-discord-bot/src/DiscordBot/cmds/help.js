import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getEmojis from "../discord/getEmojis";
import getVibeFeed from "../discord/getVibeFeed";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";

export default async function help({ client, message, cmd_args }) {
  const guild = message?.member?.guild;
  const member = message?.member;
  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);

  const ledger_id = ledger.id;

  const emojis = await getEmojis({ client, guild_id: guild.id });


  const vibesLedgerSummary = await getVibesLedgerSummary({guild_id: guild.id});
  const vibe_period = vibesLedgerSummary.vibe_period;
  const vibe_period_text = vibesLedgerSummary.vibe_period ?? "OFF";
  const vibe_period_remaining = vibesLedgerSummary.vibe_period_remaining;
  const vibe_stacks = vibesLedgerSummary.vibe_rate ?? "0";

  const helpMessage = `**I AM VIBES BOT ${emojis.vibes} :robot:**
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
    :eyes: full profiles on **[vibes.live](https://www.vibes.live/ledger/${ledger_id})**
    
    **CURRENT SETTINGS**
    :timer: \`!setvibeperiod\` to \`${vibe_period_text}\` ${vibe_period ? `ends ${vibe_period_remaining}` : ''}
    :pancakes: \`!setvibestacks\` to \`${vibe_stacks}\`
    `;
  const helpEmbed = {
    color: 0x00eeee,
    title: `**wat vibes bot?**`,
    url: `https://www.vibesbot.gg`,
    description: `${helpMessage}`,
    thumbnail: {
      url: "https://media0.giphy.com/media/1fnwSUTsHRyGXEYMos/giphy.gif?cid=ecf05e47b7vkmx00wquadbiunwj71or7xxm1b44iti4zdaxo&rid=giphy.gif&ct=g",
    },
    fields: [
      // {
      //   name: "I AM VIBES BOT ${emojis.vibes}",
      //   value: "`${emojis.rarevibe} Rare Vibe`\n2x\n69.15% - 84.15% ",
      //   inline: true,
      // },
      // {
      //   name: "I AM VIBES BOT ${emojis.vibes}",
      //   value: "`Rare Vibe`\n2x\n69.15% - 84.15% ",
      //   inline: true,
      // },
      // {
      //   name: "I AM VIBES BOT ${emojis.vibes}",
      //   value: "`Rare Vibe`\n2x\n69.15% - 84.15% ",
      //   inline: true,
      // },
    ],

    // footer: {
    //   text: `Powered by Spot`,
    //   icon_url: "https://i.imgur.com/1c0avUE.png",
    // },
  };
  const vibeFeedChannel = await getVibeFeed({ client, guild_id: guild.id });
  const helpMessageChannel = `see <#${vibeFeedChannel?.id}> for ${emojis.vibedust} Wat VibesBot? ${emojis.vibedust}`;

  const helpEmbedChannel = {
    color: 0x00eeee,
    url: `https://www.vibesbot.gg`,
    description: `${helpMessageChannel}`,
    // thumbnail: {
    //   url: "https://media2.giphy.com/media/BzM7MRs96dYpLSeUTy/giphy.gif?cid=ecf05e47yk8rvloiy4yh52cdlyzqoil3ksr606xmluc3p6ox&rid=giphy.gif&ct=ts",
    // },
    // footer: {
    //   text: `Powered by Spot`,
    //   icon_url: "https://i.imgur.com/1c0avUE.png",
    // },
  };

  await vibeFeedChannel?.send({ embeds: [helpEmbed] }).catch((e) => {
    console.log(e);
  });

  // TODO send an embed with current vibe ledger settings

  await message.channel.send({ embeds: [helpEmbedChannel] }).catch((e) => {
    console.log(e);
  });

  // await message.author.send({ embeds: [helpEmbed] }).catch(e => {
  //   console.log(e);
  // });
}
