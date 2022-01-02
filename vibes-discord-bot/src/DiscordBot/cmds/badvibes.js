import getTargetMember from "../message/getTargetMember";
import saveBadVibe from "../spothub/saveBadVibe";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import getMemberDetails from "../multi/getMemberDetails";
import sendResponse from "../discord/sendResponse";

export default async function badvibes({ client, message, command, cmd_args }) {
  const message_member = message ? message.member : command.member;

  const guild = message_member.guild;
  const guild_id = guild.id;

  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;

  const target_member = command
    ? cmd_args.find((i) => i.name === "fren").member
    : await getTargetMember({ message, cmd_args });
  if (!target_member) {
    return { error: "receiver not found" };
  }

  if (target_member.user.id === message_member.user.id) {
    return { error: `you can only vibe with others` };
  }

  const note = command
    ? cmd_args.find((i) => i.name === "note")?.value
    : cmd_args.slice(1).join(" ");

  await saveBadVibe({
    ledger_id: ledger_id,
    from_member_id: message_member.id,
    member_id: target_member.id,
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
    member_id: target_member.id,
  });

  const vibesLedgerSummary = await getVibesLedgerSummary({
    guild_id,
  });

  await sendResponse({
    client,
    guild_id,
    message,
    command,
    response: "badvibes",
    ledger_id,
    sending_member,
    receiving_member,
    note,
    vibesLedgerSummary,
  });

  return true;
}
