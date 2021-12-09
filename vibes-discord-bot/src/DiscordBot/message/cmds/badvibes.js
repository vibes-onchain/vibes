import getTargetMember from "../getTargetMember";
import messageVibeFeedChannel from "../../discord/messageVibeFeedChannel";
import saveBadVibe from "../../space/saveBadVibe";


export default async function badvibes({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;
  const space = await findOrCreateLedgerForGuild(
    guild.id,
    guild.name
  );
  const member = await getTargetMember({ message, cmd_args });
  if (!member) {
    console.log("receiver not found");
    return;
  }

  if (member.user.id === message_member.user.id) {
    // await message.channel.send(
    //   `@${target_user.username} you can only vibe others`
    // );
    return;
  }

  if (cmd_args.length < 2) {
    await message.channel.send(
      "fren. i am not allowed to !badvibe someone without reasons! enter some reasons after the @user in your command. or you can use badvibes emoji to react to a post. \n\n!badvibe <@member> <reason for vibe>"
    );
    return;
  }
  const badvibes_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "badvibes") || "✨";
  const reason = cmd_args.slice(1).join(" ");

  await saveBadVibe({
    ledger_id: space.id,
    from_user_id: message_member.user.id,
    user_id: member.user.id,
    reason,
  });



  await messageVibeFeedChannel(guild,
    `${badvibes_emoji} from ${message_member} to ${member}`
  );
}
