import LedgerEntry from "spothub/lib/LedgerEntry";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import canControlVibesBot from "../discord/canControlVibesBot";
import updateAllGuildMembers from "../multi/updateAllGuildMembers";
import sendQuickCommandResponse from "../discord/sendQuickCommandResponse";

export default async function setvibesparen({
  client,
  command,
  message,
  cmd_args,
}) {
  const member = message ? message.member : command.member;
  const guild = member.guild;

  if (
    !(await canControlVibesBot({
      client,
      guild_id: guild.id,
      member_id: member?.id,
    }))
  ) {
    return;
  }

  const template = command
    ? cmd_args.find((i) => i.name === "template").value
    : cmd_args.join(" ");

  await sendQuickCommandResponse({ command });

  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const le = LedgerEntry.build({
    ledger_id: ledger.id,
    type: "Set Ledger Metadata",
    value: {
      key: "vibes:paren",
      value: template,
    },
  });
  await le.save();

  await updateAllGuildMembers({ client, guild_id: guild.id });

  return true;
}
