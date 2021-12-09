import getTargetMember from "../getTargetMember";
import messageVibeFeedChannel from "../../discord/messageVibeFeedChannel";
import saveVibe from "../../space/saveVibe";
import findOrCreateLedgerForGuild from "../../space/findOrCreateLedgerForGuild";

export default async function vibes({ client, message, cmd_args }) {
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
      "fren. i am not allowed to !vibe someone without reasons! enter some reasons after the @user in your command. or you can use vibe dust emoji to react to a post. \n\n!vibe <@member> <reason for vibin>"
    );
    return;
  }
  const vibedust_emoji =
    guild.emojis.cache.find((emoji) => emoji.name === "vibedust") || "✨";

  const reason = cmd_args.slice(1).join(" ");
  await saveVibe({
    ledger_id: space.id,
    from_user_id: message_member.user.id,
    user_id: member.user.id,
    reason,
  });
  await messageVibeFeedChannel(guild,
    `${vibedust_emoji} from ${message_member} to ${member}`
  );
}
