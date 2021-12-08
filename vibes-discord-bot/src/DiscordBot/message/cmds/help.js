import findOrCreateLedgerForGuild from "../../space/findOrCreateLedgerForGuild";

export default async function help({ message, cmd_args }) {
  const guild = message?.member?.guild;
  const space = await findOrCreateLedgerForGuild(
    message.guild.id,
    message.guild.name
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

  const helpMessage = "titel";
  console.log(space);

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
