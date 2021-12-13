import getTargetMember from "../message/getTargetMember";
import updateGuildMember from "../discord/updateGuildMember";
import messageVibeFeedChannel from "../discord/messageVibeFeedChannel";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import setVibeDust from "../spothub/setVibeDust";
import canControlVibesBot from "../discord/canControlVibesBot";
import getEmojis from "../discord/getEmojis";

export default async function setvibedust({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;

  if (
    !canControlVibesBot({
      client,
      guild_id: guild.id,
      member_id: message_member.id,
    })
  ) {
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

  const space = await findOrCreateLedgerForGuild(guild.id, guild.name);
  await setVibeDust({
    ledger_id: space.id,
    by_discord_member_id: message.member.id,
    discord_member_id: member.id,
    vibe_dust: vibes,
  });

  const emojis = getEmojis({ client, guild_id: guild.id });

  let setvibedustEmbed = {
    color: 0x00eeee,
    title:
      `:sparkles: :rocket: ${emojis.vibedust} Go Brrrr! ${emojis.vibes} ${emojis.vibes}`,
    url: `https://www.vibes.live/ledger/${space.id}`,
    description: 
      `${emojis.vibedust} new vibedust has been generated for some members
   :eyes: peep [\`vibes.live\`]() to see what you received
   :clipboard:Full Tx log – **[vibescan.io](http://vibescan.io/ledger/${space.id}/entries)**`,
    image: {
      url: "https://media4.giphy.com/media/azGJUrx592uc0/giphy.gif?cid=ecf05e47lrktsdr15ncs416w0n3bil6h37wy9h3zq1br5p6y&rid=giphy.gif&ct=g",
    },
    // footer: {
    //   text: `Powered by Spot`,
    //   icon_url: "https://i.imgur.com/1c0avUE.png",
    // },
  };
  await messageVibeFeedChannel(guild, { embeds: [setvibedustEmbed] });
  await message.channel.send({ embeds: [setvibedustEmbed] });
  await member.send(`:arrow_right: ${emojis.vibedust}  \`GENVIBEDUST\` – u got [interactingUser.lastGebVibe.vibedustRecieved] vibedust ${emojis.vibedust}  from this gen event 
  :eyes: peep ur updated vibes at vibes.live/[interactingUser.VibesLiveID]
  
  :clipboard: Full Tx log – **vibescan.io/[interactingUser.vibescanID]**"""`);
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
