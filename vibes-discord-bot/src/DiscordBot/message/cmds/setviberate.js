import DiscordGuild from "../../models/DiscordGuild";
import messageVibeFeedChannel from "../messageVibeFeedChannel";

export default async function setviberate({ client, message, cmd_args }) {
  const member = message.member;
  const guild = member.guild;

  if (
    !member.roles.cache.some((role) => role.name === "__CanControlFrenlyBot__")
  ) {
    await message.channel.send(
      "You're not in the role __CanControlFrenlyBot__, so you can't run this command."
    );
    return;
  }
  const dg = await DiscordGuild.findOrCreate({ guild_id: guild.id });
  const viberate_str = cmd_args.join(" ");
  await dg.saveVibeRate(viberate_str, member.user_id);
  const vibedust_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";
  const vibes_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibes") || "✨";
  await message.channel.send(
    `Community vibe rate has been updated. ${vibedust_emoji} When the vibeperiod ends, vibes will be distributed. ${vibes_emoji}`
  );
  let viberateEmbed = {
    color: 0x00eeee,
    title: `${vibedust_emoji}${vibedust_emoji}  Vibe Rate Changed  ${vibedust_emoji}${vibedust_emoji}`,
    url: `https://www.spot.space/${space.id}`,
    description: `Set to ${viberate_str} Get lots more vibe analytics on ***spot.space***, click the vibedust to view more!`,
    image: {
      url: "https://media1.giphy.com/media/3owzW5c1tPq63MPmWk/giphy.gif?cid=ecf05e47aqgiqppc36lyfbzyuax1w8wf27k01hbkl875lf1f&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  await messageVibeFeedChannel(guild, { embeds: [viberateEmbed] });

  viberateEmbed = {
    color: 0x00eeee,
    title: `${vibedust_emoji}${vibedust_emoji}  Vibe Rate Changed  ${vibedust_emoji}${vibedust_emoji}`,
    url: `https://www.spot.space/${space.id}`,
    description: `Set to ${viberate_str} Get lots more vibe analytics on ***spot.space***, click the vibedust to view more!`,
    thumbnail: {
      url: "https://media1.giphy.com/media/3owzW5c1tPq63MPmWk/giphy.gif?cid=ecf05e47aqgiqppc36lyfbzyuax1w8wf27k01hbkl875lf1f&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  await message.channel.send({ embeds: [viberateEmbed] });

  console.log(dg.values);
}
