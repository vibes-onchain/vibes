import DiscordGuild from "../../models/DiscordGuild";
import updateGuildMember from "../../discord/updateGuildMember";
import messageVibeFeedChannel from "../../discord/messageVibeFeedChannel";
import recountSpaceVibes from "../../space/recountSpaceVibes";
import findOrCreateLedgerForGuild from "../../space/findOrCreateLedgerForGuild";

export default async function vibedistro({ client, message, cmd_args }) {
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
  const space = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const users_vibes = await recountSpaceVibes(space.id);
  for (const [user_id, vibes] of Object.entries(users_vibes)) {
    await updateGuildMember({
      client,
      guild,
      member,
      vibes,
      frenly_labels: space.meta?.frenly_labels,
      frenly_paren: space.meta?.frenly_paren,
    });
  }
  const vibedust_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";
  const vibes_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibes") || "✨";
  await message.channel.send(
    `Vibes have been refreshed ${vibedust_emoji} ${vibes_emoji}`
  );

  const vibecheckEmbed = {
    color: 0x00eeee,
    title: `${vibedust_emoji}${vibedust_emoji} Vibes Distributed ${vibedust_emoji}${vibedust_emoji}`,
    url: `https://www.spot.space/${space.id}`,
    description:
      "Get lots more vibe analytics on ***spot.space***, click the vibedust to view more!",
    image: {
      url: "https://media.giphy.com/media/dWCaFhKKq3K8TryllR/giphy.gif",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };

  await messageVibeFeedChannel(guild, {
    embeds: [vibecheckEmbed],
  });
}
