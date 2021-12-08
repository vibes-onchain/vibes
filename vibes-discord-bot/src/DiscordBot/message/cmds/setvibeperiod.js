// import DiscordGuild from "../../models/DiscordGuild";
import messageVibeFeedChannel from "../../discord/messageVibeFeedChannel";
import findOrCreateSpaceForGuild from "../../space/findOrCreateSpaceForGuild";
import saveVibePeriod, {
  ALLOWED_VIBE_PERIODS,
} from "../../space/saveVibePeriod";

export default async function setvibeperiod({ client, message, cmd_args }) {
  const member = message.member;
  const guild = message.member?.guild;

  if (!guild) {
    await message.channel.send("only able to set vibe period for a guild");
    return;
  }

  if (
    !member.roles.cache.some((role) => role.name === "__CanControlFrenlyBot__")
  ) {
    await message.channel.send(
      "You're not in the role __CanControlFrenlyBot__, so you can't run this command."
    );
    return;
  }

  console.log({ cmd_args });
  const vibeperiod = cmd_args[0];

  const space = await findOrCreateSpaceForGuild(guild.id, guild.name);
  if (!space) {
    return;
  }

  try {
    await saveVibePeriod(space.id, vibeperiod, member.user.id);
    const vibedust_emoji =
      guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";
    const vibes_emoji =
      guild.emojis.cache.find((emoji) => emoji.name === "vibes") || "✨";

    let vibecheckEmbed = {
      color: 0x00eeee,
      title: `${vibedust_emoji}${vibedust_emoji}  Vibe Period Changed  ${vibedust_emoji}${vibedust_emoji}`,
      url: `https://www.spot.space/${space.id}`,
      description: `Set to ${vibeperiod} Get lots more vibe analytics on ***spot.space***, click the vibedust to view more!`,
      image: {
        url: "https://media1.giphy.com/media/20x6qqJa4Hw7Zmz0bP/giphy.gif?cid=ecf05e470paz52q03nr1g2ez0ctzt1djnblcetq0kloqo343&rid=giphy.gif&ct=g",
      },
      footer: {
        text: `Powered by Spot`,
        icon_url: "https://i.imgur.com/1c0avUE.png",
      },
    };
    await messageVibeFeedChannel(guild, { embeds: [vibecheckEmbed] });
    vibecheckEmbed = {
      color: 0x00eeee,
      title: `${vibedust_emoji}${vibedust_emoji}  Vibe Period Changed  ${vibedust_emoji}${vibedust_emoji}`,
      url: `https://www.spot.space/${space.id}`,
      description: `Set to ${vibeperiod}\nGet lots more vibe analytics on ***spot.space***, click the vibedust to view more!`,
      thumbnail: {
        url: "https://media1.giphy.com/media/20x6qqJa4Hw7Zmz0bP/giphy.gif?cid=ecf05e470paz52q03nr1g2ez0ctzt1djnblcetq0kloqo343&rid=giphy.gif&ct=g",
      },
      footer: {
        text: `Powered by Spot`,
        icon_url: "https://i.imgur.com/1c0avUE.png",
      },
    };
    await message.channel.send({ embeds: [vibecheckEmbed] });
  } catch (e) {
    console.log(e);
    await message.channel.send(
      `Unable to set vibe period to ${vibeperiod}. Please select from: ${ALLOWED_VIBE_PERIODS.join(
        ", "
      )}`
    );
  }
}
