import DiscordGuild from "../../models/DiscordGuild";
import updateGuildMember from "../../discord/updateGuildMember";
import findOrCreateLedgerForGuild from "../../space/findOrCreateLedgerForGuild";

export default async function vibecheck({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;

  // const member = await getTargetMember({ message, cmd_args });
  // if (!member) {
  //   console.log("receiver not found");
  //   return;
  // }

  // if (member.user.id === message_member.user.id) {
  //   // await message.channel.send(
  //   //   `@${target_user.username} you can only vibe others`
  //   // );
  //   return;
  // }
  const space = await findOrCreateLedgerForGuild(
    guild.id,
    guild.name
  );
  const vibedust_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";

  const vibecheckEmbed = {
    color: 0x00eeee,
    title: `${vibedust_emoji}${vibedust_emoji}  Vibe Check  ${vibedust_emoji}${vibedust_emoji}`,
    url: `https://www.spot.space/${space.id}`,
    description:
      "Get lots more vibe analytics on ***spot.space***, click the vibedust to view more!",
    thumbnail: {
      url: "https://media3.giphy.com/media/L3RMqVU2LRnSLQVO2a/giphy.gif?cid=ecf05e47902q2hpged7tqv0ytxoxveomvuwvqy5sdetze0bu&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };

  await message.channel.send({ embeds: [vibecheckEmbed] });
}
