import updateGuildMember from "../discord/updateGuildMember";
import messageVibeFeedChannel from "../discord/messageVibeFeedChannel";
import recountLedgerVibes from "../spothub/recountLedgerVibes";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import parseEmojisForMessage from "../discord/parseEmojisForMessage";

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
  const space = await findOrCreateLedgerForGuild(
    guild.id,
    guild.name
  );
  const users_vibes = await recountLedgerVibes(space.id);
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


  const vibeDistroEmbedFeed = {
    color: 0x00eeee,
    title: await parseEmojisForMessage(message, `:arrow_right: vibedustEmoji New Vibe Distro! vibedustEmoji  vibedustEmoji`),
    url: `https://vibes.live/[VibesLiveCommunityID]`,
    description: await parseEmojisForMessage(message, `@everyone

    :hourglass: vibedust vibedustEmoji  has been distro'd for the \`VIBEPERIOD\` that ran from [tx.starttime] to [tx.endtime]
    :vibedust: check DM for your vibestack
    :clipboard:Full Tx log – **vibescan.io/[tx.vibescanTX]**`),
    image: {
      url: "https://media.giphy.com/media/dWCaFhKKq3K8TryllR/giphy.gif",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };

  const vibeDistroEmbedChannel = {
    color: 0x00eeee,
    title: await parseEmojisForMessage(message, `:arrow_right: vibedustEmoji New Vibe Distro! vibedustEmoji  vibedustEmoji `),
    url: `https://vibes.live/[VibesLiveCommunityID]`,
    description: await parseEmojisForMessage(message, `@everyone

    :hourglass: vibedust vibedustEmoji  has been distrod for the \`VIBEPERIOD\` that ran from [tx.starttime] to [tx.endtime]
    :vibedust: check DM for your vibestack
    :clipboard:Full Tx log – **vibescan.io/[tx.vibescanTX]**`),
    thumbnail: {
      url: "https://media.giphy.com/media/dWCaFhKKq3K8TryllR/giphy.gif",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };


  await message.author.send(await parseEmojisForMessage(message, `:arrow_right: vibedustEmoji  \`VIBEDISTRO\` – u got [interactingUser.lastDistro.vibedustRecieved] vibedust vibedustEmoji  for the \`VIBEPERIOD\` that ran from [tx.starttime] to [tx.endtime]

  :eyes: peep your updated vibes at vibes.live/[interactingUser.VibesLiveID]
  
  :clipboard: Full Tx log – **vibescan.io/[interactingUser.vibescanID]**"""`));
  const vibeFeedChannel = message.guild.channels.cache.find(channel => channel.name === "vibe-feed");
  await message.channel.send({ embeds: [vibeDistroEmbedChannel] }).catch(e => {
    console.log(e);
  });
  await vibeFeedChannel.send({ embeds: [vibeDistroEmbedFeed] }).catch(e => {
    console.log(e);
  });
}
