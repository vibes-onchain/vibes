import LedgerEntry from "spothub/lib/LedgerEntry";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import canControlVibesBot from "../discord/canControlVibesBot";
import updateAllGuildMembers from "../multi/updateAllGuildMembers";
import sendQuickCommandResponse from "../discord/sendQuickCommandResponse";
import { Liquid } from "liquidjs";
import AppCache from ":/lib/AppCache";

const TEMPLATES = {
  vibes_comet:
    "{{username | truncate_last}}{% if vibestack < 0 %} ⊖{%endif%}{% if vibestack > 0 %} ✦{%endif%}{% if vibestack < 0 %}{{ vibestack | unsigned | rounded }}{% endif %}{% if vibestack > 0 %}{{ vibestack | rounded }}{% endif %}{% if vibe_level == 1 %}˙{% endif %}{% if vibe_level == 2 %}⁚‧{% endif %}{% if vibe_level == 3 %}⁚⁛{% endif %}{% if vibe_level == 4 %}⁚⁛⁚{% endif %}{% if vibe_level == 5 %}⁚⁛⁚⁛{% endif %}",
  numeric_vibes_comet:
    "{{username | truncate_last}}{% if vibestack < 0 %} ⊖{%endif%}{% if vibestack > 0 %} ✦{%endif%}{% if vibestack < 0 %}{{ vibestack | unsigned | rounded }}{% endif %}{% if vibestack > 0 %}{{ vibestack | rounded }}{% endif %}{% if vibe_level == 1 %}˙{% endif %}{% if vibe_level == 2 %}⁚‧{% endif %}{% if vibe_level == 3 %}⁚⁛{% endif %}{% if vibe_level == 4 %}⁚⁛⁚{% endif %}{% if vibe_level == 5 %}⁚⁛⁚⁛{% endif %}",
};
TEMPLATES.default = TEMPLATES.vibes_comet;
TEMPLATES.numeric = TEMPLATES.numeric_vibes_comet;

export default async function import_vibes_nickname_template({
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

  const preset = command
    ? cmd_args.find((i) => i.name === "preset").value
    : cmd_args.shift();

  const template = TEMPLATE[preset];

  if (!template) {
    return { error: "unknown preset" };
  }

  const engine = new Liquid();
  try {
    await engine.parse(template);
  } catch (e) {
    console.log(template);
    return { error: "invalid template" };
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
