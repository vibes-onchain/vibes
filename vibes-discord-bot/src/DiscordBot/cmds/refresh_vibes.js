import canControlVibesBot from "../discord/canControlVibesBot";
import updateAllGuildMembers from "../multi/updateAllGuildMembers";
import sendQuickCommandResponse from "../discord/sendQuickCommandResponse";
import AppCache from ':/lib/AppCache';
import Ledger from "spothub/lib/Ledger";

export default async function refresh_vibes({
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

  await sendQuickCommandResponse({ command });

  await AppCache.del(`ledger_for_guild-${guild.id}`);
  const ledger = await Ledger.findOne({
    where: { meta: { "vibes:discord_guild_id": guild.id } },
  });
  if (ledger) {
    const ledger_id = ledger.id;
    await AppCache.del(`ledger-${ledger_id}`);
    await AppCache.del(`ledger_latest_entries-${ledger_id}`);
  }
  await updateAllGuildMembers({ client, guild_id: guild.id });

  return true;
}
