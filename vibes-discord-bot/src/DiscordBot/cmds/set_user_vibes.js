import getMemberDetails from "../multi/getMemberDetails";
import getTargetMember from "../message/getTargetMember";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import setVibestack from "../spothub/setVibestack";
import canControlVibesBot from "../discord/canControlVibesBot";
import updateGuildMember from "../multi/updateGuildMember";
import updateAllGuildMembers from "../multi/updateAllGuildMembers";
import sendResponse from "../discord/sendResponse";
import sendQuickCommandResponse from "../discord/sendQuickCommandResponse";

export default async function set_user_vibes({
  client,
  command,
  message,
  cmd_args,
}) {
  const message_member = message ? message.member : command.member;

  const guild = message_member.guild;
  const guild_id = guild.id;

  if (
    !(await canControlVibesBot({
      client,
      guild_id,
      member_id: message_member?.id,
    }))
  ) {
    return { error: "you must be a vibesbot admin" };
  }

  const target_member = command
    ? cmd_args.find((i) => i.name === "user").member
    : await getTargetMember({ message, cmd_args });
  if (!target_member) {
    await message_member.send(
      "ERROR: !set_user_vibes must specify receiver and amount"
    ).catch(e => { console.log(1, e)});
    return;
  }
  if (cmd_args.length <= 1) {
    await message_member.send(
      "ERROR: !set_user_vibes must specify receiver and amount"
    ).catch(e => { console.log(2, e)});
    return;
  }

  await sendQuickCommandResponse({ command });

  const vibestack = command
    ? parseFloat(cmd_args.find((i) => i.name === "vibestack")?.value)
    : parseFloat(cmd_args[1]);

  if (command) {
  }

  const ledger = await findOrCreateLedgerForGuild(guild_id, guild.name);
  const ledger_id = ledger.id;

  await setVibestack({
    ledger_id,
    by_member_id: message_member.id,
    member_id: target_member.id,
    vibestack,
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

  await sendResponse({
    client,
    guild_id,
    message,
    command,
    response: "set_user_vibes",
    ledger_id,
    sending_member,
    receiving_member,
    vibestack,
  });

  try {
    await updateGuildMember({
      client,
      guild_id: guild.id,
      member_id: target_member.id,
    });
    await updateAllGuildMembers({
      client,
      guild_id: guild.id,
    });
  } catch (e) {
    console.log(e);
  }

  return true;
}
