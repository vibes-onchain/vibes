import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getTargetMember from "../message/getTargetMember";
import getEmojis from "../discord/getEmojis";
import getMemberDetails from "../multi/getMemberDetails";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import sendResponse from "../discord/sendResponse";

const disable_in_channel_messages = true;

export default async function vibecheck({
  client,
  command,
  message,
  cmd_args,
}) {
  const message_member = message ? message.member : command.member;
  const guild = message_member.guild;
  const guild_id = guild.id;

  const target_member = command
    ? cmd_args.find((i) => i.name === "user").member
    : await getTargetMember({ message, cmd_args });
  if (!target_member) {
    return { error: "receiver not found" };
  }

  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;

  const sending_member = await getMemberDetails({
    client,
    guild_id,
    member_id: message_member.id,
  });
  const receiving_member = await getMemberDetails({
    client,
    guild_id,
    member_id: target_member.id,
  });

  const vibesLedgerSummary = await getVibesLedgerSummary({ guild_id });

  await sendResponse({
    client,
    guild_id,
    message,
    command,
    response: "vibecheck",
    ledger_id,
    sending_member,
    receiving_member,
    vibesLedgerSummary,
  });


  return true;
}
