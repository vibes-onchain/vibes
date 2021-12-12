import parseEmojisForMessage from "../discord/parseEmojisForMessage";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";

export default async function help({ message, cmd_args }) {
  const guild = message?.member?.guild;
  const member = message?.member;
  const space = await findOrCreateLedgerForGuild(
    guild.id,
    guild.name
  );


  const helpMessage = await parseEmojisForMessage(message, cmd_args, `**I AM VIBES BOT vibesEmoji :robot:**
    :eyes: i help you show people's vibes  vibesEmoji \n
    **DURING A NEW VIBE PERIOD**
    :timer: u get a new **\`VIBESTACK\`** at bgn of each **\`VIBEPERIOD\`** 
    vibedustEmoji  use this react wen fren has **\`!VIBES\`**
    susvibesEmoji   use this react wen fren has **\`!susvibes\`** \n
    **AT THE END OF A VIBE PERIOD**
    :arrow_right:  vibedustEmoji  ur whole **\`VIBESTACK\`**:pancakes: distros as **\`VIBEDUST\`** based on who you gave \`!VIBES\`
    :arrow_left:  vibedustEmoji  u get **\`VIBEDUST\`** based on who gave you **\`!VIBES\`** vibesEmoji  you and their \`VIBESTACK\`:pancakes:
    :mechanical_arm: ur **\`VIBELEVEL\`** is calculated by ranking your **\`VIBEDUST\`** in community\n
    **HOW VIBE LEVELS WORK**
    **\`VIBELEVEL\`** **\`BOOST\`** **\`VIBEDUST % ILE\`**
    vibesEmoji  \`Frenly Vibe\` <:Blank:850603065760284722> <:Blank:850603065760284722> <:Blank:850603065760284722> 1x  15.87% - 69.15% 
    rareEmoji  \`Rare Vibe\`  2x   69.15% - 84.15% 
    epicEmoji  \`Epic Vibe\`   3x   84.15% - 93.32% 
    legendaryEmoji  \`Legend Vibe\`   4x   93.32% - 97.72% 
    ogEmoji  \`OG Vibe\`   5x   97.72% - 99.99%
    :rocket: ur **\`VIBELEVEL\`** will **\`!BOOST\`** ur **\`VIBESTACK\`** before each new **\`VIBEPERIOD\`**\n
    **DEEP VIBES**
    :clipboard: full tx logs on vibescan.io – **vibescan.io/[targetedUser.vibescanID]**
    :eyes: full profiles on vibes.live – **vibes.live/[targetedUser.VibesLiveID]**`)
    ;

  const helpEmbed = {
    color: 0x00eeee,
    title: `**wat vibes bot?**`,
    url: `https://www.vibesbot.gg`,
    description: `${helpMessage}`,
    thumbnail: {
      url: "https://media0.giphy.com/media/1fnwSUTsHRyGXEYMos/giphy.gif?cid=ecf05e47b7vkmx00wquadbiunwj71or7xxm1b44iti4zdaxo&rid=giphy.gif&ct=g",
    },
    fields: [
      {
        name: 'I AM VIBES BOT vibesEmoji',
        value: '`Rare Vibe`\n2x\n69.15% - 84.15% ',
        inline: true
      },
      {
        name: 'I AM VIBES BOT vibesEmoji',
        value: '`Rare Vibe`\n2x\n69.15% - 84.15% ',
        inline: true
      }, {
        name: 'I AM VIBES BOT vibesEmoji',
        value: '`Rare Vibe`\n2x\n69.15% - 84.15% ',
        inline: true
      },
    ],

    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  const helpMessageChannel = await parseEmojisForMessage(message, cmd_args, `see vibeFeed for vibedustEmoji Wat VibesBot? vibedustEmoji`);
  const vibeFeedChannel = message.guild.channels.cache.find(channel => channel.name === "vibe-feed");

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

  if (vibeFeedChannel) {
    await vibeFeedChannel?.send({ embeds: [helpEmbed] }).catch(e => {
      console.log(e);
    });
  }
  
  await message.channel.send({ embeds: [helpEmbedChannel] }).catch(e => {
    console.log(e);
  });

  // await message.author.send({ embeds: [helpEmbed] }).catch(e => {
  //   console.log(e);
  // });
}
