import getTargetMember from "../getTargetMember";
import updateGuildMember from "../../discord/updateGuildMember";
import messageVibeFeedChannel from "../../discord/messageVibeFeedChannel";
import findOrCreateLedgerForGuild from "../../spothub/findOrCreateLedgerForGuild";
import Random from ":/lib/Random";
import LedgerEntry from 'spothub/lib/LedgerEntry';
import parseEmojisForMessage from "../../discord/parseEmojisForMessage";

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

  const space = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const entry = LedgerEntry.build({
    ledger_id: space.id,
    type: "Set Vibe Dust",
    value: {
      by_user_id: message.member.user.id,
      user_id: member.user.id,
      vibes: vibes,
    },
    authored_on: new Date(),
  });
  await entry.save();

  let setvibedustEmbed = {
    color: 0x00eeee,
    title: await parseEmojisForMessage(message, `:sparkles: :rocket: vibedustEmoji Go Brrrr! vibesEmoji  vibesEmoji `),
    url: `https://vibes.live/[VibesLiveCommunityID]`,
    description: await parseEmojisForMessage(message, `@everyone

    vibedustEmoji  new vibedust has been generated for some members
   :eyes: peep \`vibes.live\` to see what you received
   :clipboard:Full Tx log – **vibescan.io/[tx.vibescanTX]**`),
    image: {
      url: "https://media4.giphy.com/media/azGJUrx592uc0/giphy.gif?cid=ecf05e47lrktsdr15ncs416w0n3bil6h37wy9h3zq1br5p6y&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  await messageVibeFeedChannel(guild, { embeds: [setvibedustEmbed] });
  setvibedustEmbed = {
    color: 0x00eeee,
    title: await parseEmojisForMessage(message, `:sparkles: :rocket: vibedustEmoji Go Brrrr! vibesEmoji  vibesEmoji `),
    url: `https://vibes.live/[VibesLiveCommunityID]`,
    description: await parseEmojisForMessage(message, ` vibedustEmoji new vibedust has been generated

    :eyes: peep \`vibes.live\` to see what you received
    
    :clipboard:Full Tx log – **vibescan.io/[tx.vibescanTX]**`),
    thumbnail: {
      url: "https://media4.giphy.com/media/azGJUrx592uc0/giphy.gif?cid=ecf05e47lrktsdr15ncs416w0n3bil6h37wy9h3zq1br5p6y&rid=giphy.gif&ct=g",
    },
    footer: {
      text: `Powered by Spot`,
      icon_url: "https://i.imgur.com/1c0avUE.png",
    },
  };
  await message.channel.send({ embeds: [setvibedustEmbed] });
  await member.send(await parseEmojisForMessage(message, `:arrow_right: vibedustEmoji  \`GENVIBEDUST\` – u got [interactingUser.lastGebVibe.vibedustRecieved] vibedust vibedustEmoji  from this gen event 
  :eyes: peep ur updated vibes at vibes.live/[interactingUser.VibesLiveID]
  
  :clipboard: Full Tx log – **vibescan.io/[interactingUser.vibescanID]**"""`));
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
