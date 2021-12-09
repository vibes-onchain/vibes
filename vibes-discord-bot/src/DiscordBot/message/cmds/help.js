import findOrCreateLedgerForGuild from "../../space/findOrCreateLedgerForGuild";

export default async function help({ message, cmd_args }) {
  const guild = message?.member?.guild;
  const member = message?.member;
  const space = await findOrCreateLedgerForGuild(
    guild.id,
    guild.name
  );
  const vibedust_emoji =
    guild?.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";

  const vibesEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "vibes"
  );
  const badvibes_emoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "badvibes"
  );
  const rareVibeEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "rarevibe"
  );
  const epicVibeEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "epicvibe"
  );
  const legendaryVibeEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "legendaryvibe"
  );
  const ogVibeEmoji = guild?.emojis.cache.find(
    (emoji) => emoji.name === "ogvibe"
  );
  const vibeFeedChannel = message.guild.channels.cache.find(channel => channel.name === "vibe-feed");
  const nameToEmoji = {
    vibedustEmoji: vibedust_emoji,
    vibesEmoji: vibesEmoji,
    ogEmoji: ogVibeEmoji,
    rareEmoji: rareVibeEmoji,
    legendaryEmoji: legendaryVibeEmoji,
    epicEmoji: epicVibeEmoji,
    badvibesEmoji: badvibes_emoji,
    vibeSender: member,
    vibeFeed: `<#${vibeFeedChannel.id}>`
  };

  const helpMessage = `**I AM VIBES BOT vibesEmoji :robot:** \n
    :eyes: i help you show people's vibes  vibesEmoji \n
    **DURING A NEW VIBE PERIOD**\n
    :timer: u get a new **\`VIBESTACK\`** at bgn of each **\`VIBEPERIOD\`** \n
    vibedustEmoji  use this react wen fren has **\`!VIBES\`** \n
    susvibesEmoji   use this react wen fren has **\`!susvibes\`** \n
    **AT THE END OF A VIBE PERIOD**\n
    :arrow_right:  vibedustEmoji  ur whole **\`VIBESTACK\`**:pancakes: distros as **\`VIBEDUST\`** based on who you gave \`!VIBES\`\n
    :arrow_left:  vibedustEmoji  u get **\`VIBEDUST\`** based on who gave you **\`!VIBES\`** vibesEmoji  you and their \`VIBESTACK\`:pancakes:\n
    :mechanical_arm: ur **\`VIBELEVEL\`** is calculated by ranking your **\`VIBEDUST\`** in community\n
    **HOW VIBE LEVELS WORK**\n
    **\`VIBELEVEL\`**                   **\`BOOST\`**            **\`VIBEDUST % ILE\`**\n
    vibesEmoji  \`Frenly Vibe\`           1x                      15.87% - 69.15% \n
    rareEmoji  \`Rare Vibe\`              2x                      69.15% - 84.15% \n
    epicEmoji  \`Epic Vibe\`              3x                      84.15% - 93.32% \n
    legendaryEmoji  \`Legend Vibe\`          4x                      93.32% - 97.72% \n
    ogEmoji  \`OG Vibe\`                   5x                      97.72% - 99.99%\n
    :rocket: ur **\`VIBELEVEL\`** will **\`!BOOST\`** ur **\`VIBESTACK\`** before each new **\`VIBEPERIOD\`**\n
    **DEEP VIBES**\n
    :clipboard: full tx logs on vibescan.io – **vibescan.io/[targetedUser.vibescanID]**\n
    :eyes: full profiles on vibes.live – **vibes.live/[targetedUser.VibesLiveID]**`.replace(
    /\b(?:vibedustEmoji|vibesEmoji|ogEmoji|rareEmoji|legendaryEmoji|epicEmoji|badvibesEmoji|vibeSender)\b/gi,
    (matched) => nameToEmoji[matched]
  );

  const helpEmbed = {
    color: 0x00eeee,
    title: `**wat vibes bot?**`,
    url: `https://www.vibesbot.gg`,
    description: `${helpMessage}`,
    thumbnail: {
      url: "https://media0.giphy.com/media/1fnwSUTsHRyGXEYMos/giphy.gif?cid=ecf05e47b7vkmx00wquadbiunwj71or7xxm1b44iti4zdaxo&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  const helpMessageChannel = `see vibeFeed for vibedustEmoji Wat VibesBot? vibedustEmoji`.replace(
    /\b(?:vibedustEmoji|vibesEmoji|ogEmoji|rareEmoji|legendaryEmoji|epicEmoji|badvibesEmoji|vibeSender|vibeFeed)\b/gi,
    (matched) => nameToEmoji[matched]
  );

  const helpEmbedChannel = {
    color: 0x00eeee,
    title: `**wat vibes bot?**`,
    url: `https://www.vibesbot.gg`,
    description: `${helpMessageChannel}`,
    thumbnail: {
      url: "https://media2.giphy.com/media/BzM7MRs96dYpLSeUTy/giphy.gif?cid=ecf05e47yk8rvloiy4yh52cdlyzqoil3ksr606xmluc3p6ox&rid=giphy.gif&ct=ts",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };

  await vibeFeedChannel.send({ embeds: [helpEmbed] }).catch(e => {
    console.log(e);
  });

  await message.channel.send({ embeds: [helpEmbedChannel] }).catch(e => {
    console.log(e);
  });

  // await message.author.send({ embeds: [helpEmbed] }).catch(e => {
  //   console.log(e);
  // });
}
