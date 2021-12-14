import messageVibeFeedChannel from "../discord/messageVibeFeedChannel";
import setVibeRate from "../spothub/setVibeRate";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";

export default async function setviberate({ client, message, cmd_args }) {
  const member = message.member;
  const guild = member.guild;
  const space = await findOrCreateLedgerForGuild(
    guild.id,
    guild.name
  );
  if (
    !member.roles.cache.some((role) => role.name === "[Can Control Vibes Bot]")
  ) {
    await message.channel.send(
      "You're not in the role [Can Control Vibes Bot], so you can't run this command."
    );
    return;
  }
  const viberate_str = cmd_args.join(" ");
  await setVibeRate(space.id, viberate_str, member.user_id);

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
    url: `https://www.vibes.live/ledger/${space.id}`,
    description: `Set to ${viberate_str} Get lots more vibe analytics on ***vibes.live***, click the vibedust to view more!`,
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
    url: `https://www.vibes.live/ledger/${space.id}`,
    description: `Set to ${viberate_str} Get lots more vibe analytics on ***vibes.live***, click the vibedust to view more!`,
    thumbnail: {
      url: "https://media1.giphy.com/media/3owzW5c1tPq63MPmWk/giphy.gif?cid=ecf05e47aqgiqppc36lyfbzyuax1w8wf27k01hbkl875lf1f&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  await message.channel.send({ embeds: [viberateEmbed] });
}
