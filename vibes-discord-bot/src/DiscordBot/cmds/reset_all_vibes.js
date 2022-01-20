import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import LedgerEntry from "spothub/lib/LedgerEntry";
import updateAllGuildMembers from "../multi/updateAllGuildMembers";
import sendQuickCommandResponse from "../discord/sendQuickCommandResponse";
import canControlVibesBot from "../discord/canControlVibesBot";
import AppCache from ':/lib/AppCache';

export default async function reset_all_vibes({ client, command, message }) {
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

  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;

  const entry = LedgerEntry.build({
    ledger_id,
    type: "Reset All Vibes",
    sender: {
      type: "discord_guild_member",
      id: message_member.id,
    },
    value: {},
    authored_on: new Date(),
  });
  await entry.save();
  await AppCache.del(`ledger_latest_entries-${ledger_id}`);

  await sendQuickCommandResponse({ command });

  await updateAllGuildMembers({ client, guild_id });

  return true;
}
