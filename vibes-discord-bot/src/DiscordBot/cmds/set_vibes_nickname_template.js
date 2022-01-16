import LedgerEntry from "spothub/lib/LedgerEntry";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import canControlVibesBot from "../discord/canControlVibesBot";
import updateAllGuildMembers from "../multi/updateAllGuildMembers";
import sendQuickCommandResponse from "../discord/sendQuickCommandResponse";
import { Liquid } from "liquidjs";
import AppCache from ':/lib/AppCache';

export default async function set_vibes_nickname_template({
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

  const engine = new Liquid();
  try {
    await engine.parse(template);
  } catch(e) {
    console.log(template);
    return {error: 'invalid template'}
  } 
  await sendQuickCommandResponse({ command });


  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const le = LedgerEntry.build({
    ledger_id: ledger.id,
    type: "Set Ledger Metadata",
    value: {
      key: "vibes:nickname_template",
      value: template,
    },
  });
  await le.save();

  await AppCache.del(`ledger_for_guild-${guild.id}`);
  await updateAllGuildMembers({ client, guild_id: guild.id });

  return true;
}
