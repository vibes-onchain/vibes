import getTargetMember from "../getTargetMember";
import updateGuildMember from "../../discord/updateGuildMember";
import DiscordGuild from "../../models/DiscordGuild";
import messageVibeFeedChannel from "../../discord/messageVibeFeedChannel";
import findOrCreateSpaceForGuild from "../../space/findOrCreateSpaceForGuild";
import Random from ":/lib/Random";

export default async function setvibedust({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;

  if (
    !message_member.roles.cache.some(
      (role) => role.name === "__CanControlFrenlyBot__"
    )
  ) {
    await message.channel.send(
      "You're not in the role __CanControlFrenlyBot__, so you can't run this command."
    );
    return;
  }

  const member = await getTargetMember({ message, cmd_args });
  if (!member) {
    console.log("receiver not found");
    return;
  }
  if (cmd_args.length <= 1) {
    console.log("no vibes specified");
    return;
  }
  const vibes = parseFloat(cmd_args[1]);
  console.log({ vibes });

  const space = await findOrCreateSpaceForGuild(guild.id, guild.name);
  const entry = SpaceLedgerEntry.build({
    space_id: space.id,
    type: "Set Vibe Dust",
    value: {
      by_user_id: message.member.user.id,
      user_id: member.user.id,
      vibes: vibes,
    },
    authored_on: new Date(),
  });
  await entry.save();
  // console.log({ member });

  const vibedust_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";
  let setvibedustEmbed = {
    color: 0x00eeee,
    title: `${vibedust_emoji}${vibedust_emoji}  Vibe Dust Set  ${vibedust_emoji}${vibedust_emoji}`,
    url: `https://www.spot.space/${space.id}`,
    description: `${message_member} set ${member}'s ${vibedust_emoji} to ${vibes}\nTo get lots more vibe analytics on ***spot.space***, click the vibedust to view more!`,
    image: {
      url: "https://media4.giphy.com/media/azGJUrx592uc0/giphy.gif?cid=ecf05e47lrktsdr15ncs416w0n3bil6h37wy9h3zq1br5p6y&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  const dg = await DiscordGuild.findOrCreate({ guild_id: guild.id });
  await messageVibeFeedChannel(guild, { embeds: [setvibedustEmbed] });
  setvibedustEmbed = {
    color: 0x00eeee,
    title: `${vibedust_emoji}${vibedust_emoji}  Vibe Dust Set  ${vibedust_emoji}${vibedust_emoji}`,
    url: `https://www.spot.space/${space.id}`,
    description: `${message_member} set ${member}'s ${vibedust_emoji} to ${vibes}\nTo get lots more vibe analytics on ***spot.space***, click the vibedust to view more!`,
    thumbnail: {
      url: "https://media4.giphy.com/media/azGJUrx592uc0/giphy.gif?cid=ecf05e47lrktsdr15ncs416w0n3bil6h37wy9h3zq1br5p6y&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  await message.channel.send({ embeds: [setvibedustEmbed] });
  await updateGuildMember({
    client: client,
    guild: guild,
    member: member,
    vibes: vibes,
    user_id: member.user.id,
    frenly_labels: space.meta?.frenly_labels,
    frenly_paren: space.meta?.frenly_paren,
  });
}
