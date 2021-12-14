import getMemberDetails from "../multi/getMemberDetails";
import getTargetMember from "../message/getTargetMember";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import setVibeDust from "../spothub/setVibeDust";
import canControlVibesBot from "../discord/canControlVibesBot";
import getEmojis from "../discord/getEmojis";
import getVibeFeed from "../discord/getVibeFeed";
import updateGuildMember from "../multi/updateGuildMember";

export default async function setvibedust({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;

  if (
    !(await canControlVibesBot({
      client,
      guild_id: guild.id,
      member_id: message.member?.id,
    }))
  ) {
    return;
  }

  const member = await getTargetMember({ message, cmd_args });
  if (!member) {
    await message_member.send(
      "ERROR: !setvibedust must specify receiver and amount"
    );
    return;
  }
  if (cmd_args.length <= 1) {
    await message_member.send(
      "ERROR: !setvibedust must specify receiver and amount"
    );
    return;
  }

  const vibe_dust = parseFloat(cmd_args[1]);

  const space = await findOrCreateLedgerForGuild(guild.id, guild.name);
  await setVibeDust({
    ledger_id: space.id,
    by_member_id: message.member.id,
    member_id: member.id,
    vibe_dust: vibe_dust,
  });

  const emojis = await getEmojis({ client, guild_id: guild.id });

  const targetedUser = await getMemberDetails({
    client,
    guild_id: guild.id,
    member_id: member.id,
  });

  const vibeFeedEmbed = {
    color: 0x00eeee,
    title: `:sparkles: :rocket: ${emojis.vibedust} Go Brrrr! ${emojis.vibes} ${emojis.vibes}`,
    url: `https://www.vibes.live/ledger/${space.id}`,
    description: `@${targetedUser.username} now has ${vibe_dust}${emojis.vibedust} vibedust
   :eyes: peep **[vibes.live](http://www.vibes.live/ledger/${space.id}/discord_member-${targetedUser.member_id})** to see what @${targetedUser.username} received
   :clipboard: Full Tx log – **[vibescan.io](http://vibescan.io/ledger/${space.id}/entries)**`,
    thumbnail: {
      url: "https://media4.giphy.com/media/azGJUrx592uc0/giphy.gif?cid=ecf05e47lrktsdr15ncs416w0n3bil6h37wy9h3zq1br5p6y&rid=giphy.gif&ct=g",
    },
  };
  const vibeFeed = await getVibeFeed({ client, guild_id: guild.id });
  await vibeFeed?.send({ embeds: [vibeFeedEmbed] });

  const channelEmbed = {
    ...vibeFeedEmbed,
  };
  if (vibeFeed.id !== message.channel.id) {
    await message.channel.send({ embeds: [channelEmbed] });
  }

  const dmEmbed = {
    title: `:sparkles: :rocket: You now have ${vibe_dust} ${emojis.vibedust} vibedust in ${message.guild.name} ${emojis.vibes} ${emojis.vibes}`,
    url: `https://www.vibes.live/ledger/${space.id}`,
    description: `:eyes: peep **[vibes.live](http://www.vibes.live/ledger/${space.id}/profile/discord_member-${targetedUser.member_id})** to see your profile
    :clipboard: Full Tx log – **[vibescan.io](http://vibescan.io/ledger/${space.id}/entries)**`,
    thumbnail: vibeFeedEmbed.thumbnail,
  };
  await member.send({ embeds: [dmEmbed] });

  await updateGuildMember({
    client,
    guild_id: guild.id,
    member_id: member.id,
  });
}
