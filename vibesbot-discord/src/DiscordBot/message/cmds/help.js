import DiscordGuild from "../../models/DiscordGuild";

export default async function help({ message, cmd_args }) {
  const member = message.member;
  const guild = member.guild;

  const vibedust_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";

  const vibesEmoji = message.guild.emojis.cache.find(
    (emoji) => emoji.name === "vibes"
  );
  const badvibes_emoji = message.guild.emojis.cache.find(
    (emoji) => emoji.name === "badvibes"
  );
  const rareVibeEmoji = message.guild.emojis.cache.find(
    (emoji) => emoji.name === "rarevibe"
  );
  const epicVibeEmoji = message.guild.emojis.cache.find(
    (emoji) => emoji.name === "epicvibe"
  );
  const legendaryVibeEmoji = message.guild.emojis.cache.find(
    (emoji) => emoji.name === "legendaryvibe"
  );
  const ogVibeEmoji = message.guild.emojis.cache.find(
    (emoji) => emoji.name === "ogvibe"
  );
  const space = await DiscordGuild.findOrCreateSpace(guild.id, guild.name);
  let helpMessage = [
    "i live at `fren.ly`",
    `and i work in discord \n my ${vibedust_emoji} and ${badvibes_emoji} do stuffz \n\n`,
    `***HOW I WORK***\n`,
    "1. frenlymods give u sum",
    `${vibedust_emoji}`,
    "\n2. u use",
    `${vibedust_emoji}`,
    "wen you see good vibes and ",
    `${badvibes_emoji} `,
    "wen you see bad vibes\n",
    "3. wen",
    `${vibedust_emoji}`,
    "`expires`, it becomes",
    `${vibesEmoji}`,
    "for who you vibed\n",
    "4. your",
    `${vibedust_emoji}`,
    "results in roles that give you special permissions\n\n",
    "**REACTIONS**\n",
    `${vibedust_emoji} `,
    "wen commenter has frenly vibes\n",
    `${badvibes_emoji} `,
    "wen commenter has bad vibes\n\n",
    `**COMMANDS**\n`,
    "`!vibes @member <reason for vibes>`\n",
    `wen you see good vibes ${vibedust_emoji}\n\n`,
    "`!badvibes @member <reason for bad vibes>`\n",
    `wen you see bad vibes ${badvibes_emoji}\n\n`,
    "`!setvibedust @member <amount>`\n",
    `set a members ${vibedust_emoji}\n\n`,
    "`!setvibeperiod minute|hour|day|week|month|year`\n",
    `set how long it takes for ${vibedust_emoji} to actualize\n\n`,
    "`!setviberate @tim/foy idk how work lol`\n",
    `${badvibes_emoji}\n\n`,
    "`!vibedistro`\n",
    `force distribute ${vibedust_emoji}\n\n`,
    "`!vibecheck`\n",
    `get link to more data on *spot.space* ${ogVibeEmoji}\n\n`,
    "**VIBE ROLE PERMISSIONS**\n",
    `${vibesEmoji}`,
    "` = Frenly can post in #general\n can post reactions in #alpha`\n\n",
    `${rareVibeEmoji}`,
    "` = Rare all above post comments in #alpha post reactions in #gov` \n\n",
    `${epicVibeEmoji}`,
    "` = Epic all above + post comments in #gov` \n\n",
    `${legendaryVibeEmoji}`,
    "` = Lengendary all above + post proposals in #gov` \n\n",
    `${ogVibeEmoji}`,
    "` = OG all above + role = @frenlymods || start a !vote` \n\n",
    `**VIBE ROLE RARITIES**\n`,
    `${vibesEmoji}`,
    "` = Frenly Vibe \t\t 15.87% - 69.15% rank`\n\n",
    `${rareVibeEmoji}`,
    "` = Rare Vibe \t\t 69.15% - 84.15% rank`\n\n",
    `${epicVibeEmoji}`,
    "` = Epic Vibe \t\t 84.15% - 93.32% rank`\n\n",
    `${legendaryVibeEmoji}`,
    "` = Legendary Vibe \t\t 93.32% - 97.72% rank`\n\n",
    `${ogVibeEmoji}`,
    "` = OG Vibe \t\t 97.72% - 99.99% rank`\n\n",
  ].join("");

  const helpEmbed = {
    color: 0x00eeee,
    title: `${vibedust_emoji}${vibedust_emoji}  How Frenly Bot Works  ${vibedust_emoji}${vibedust_emoji}`,
    url: `https://www.spot.space/${space.id}`,
    description: `${helpMessage}\n\n Get lots more vibe analytics on ***spot.space***, click the vibedust to view more!`,
    thumbnail: {
      url: "https://media0.giphy.com/media/1fnwSUTsHRyGXEYMos/giphy.gif?cid=ecf05e47b7vkmx00wquadbiunwj71or7xxm1b44iti4zdaxo&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };

  await message.author.send({ embeds: [helpEmbed] }).catch(e => {
    console.log(e);
  });
}
