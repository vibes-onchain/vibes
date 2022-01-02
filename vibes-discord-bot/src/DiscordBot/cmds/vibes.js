import getTargetMember from "../message/getTargetMember";
import saveVibe from "../spothub/saveVibe";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import getMemberDetails from "../multi/getMemberDetails";
import sendResponse from "../discord/sendResponse";

export default async function vibes({ client, message, command, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;
  const guild_id = guild.id;
  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;
  const member = await getTargetMember({ message, cmd_args });
  if (!member) {
    console.log("receiver not found");
    return;
  }

  if (member.user.id === message_member.user.id) {
    // await message.channel.send(
    // `@${target_user.username} you can only vibe others`
    // );
    return;
  }

  // if (cmd_args.length < 2) {
  //   await message.channel.send(
  //     "fren. i am not allowed to !vibe someone without reasons! enter some reasons after the @user in your command. or you can use vibe dust emoji to react to a post. \n\n!vibe <@member> <reason for vibin>"
  //   );
  //   return;
  // }

  const note = cmd_args.slice(1).join(" ");
  await saveVibe({
    ledger_id,
    from_member_id: message_member.id,
    member_id: member.id,
    note,
  });

  const sending_member = await getMemberDetails({
    client,
    guild_id,
    member_id: message_member.id,
  });
  const receiving_member = await getMemberDetails({
    client,
    guild_id,
    member_id: member.id,
  });

  const vibesLedgerSummary = await getVibesLedgerSummary({
    guild_id,
  });

  await sendResponse({
    client,
    guild_id,
    message,
    command,
    response: "vibes",
    ledger_id,
    sending_member,
    receiving_member,
    note,
    vibesLedgerSummary,
  });
}
