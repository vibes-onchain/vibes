import Ledger from "spothub/lib/Ledger";
import LedgerEntry from "spothub/lib/LedgerEntry";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import canControlVibesBot from "../discord/canControlVibesBot";
import updateAllGuildMembers from "../multi/updateAllGuildMembers";
import sendQuickCommandResponse from "../discord/sendQuickCommandResponse";
import getVibeFeed from "../discord/getVibeFeed";

export default async function new_vibes_ledger({
  client,
  command,
  message,
  cmd_args,
}) {
  const member = message ? message.member : command.member;
  const guild = member.guild;
  const guild_id = guild.id;

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

  const ledger = await Ledger.findOne({
    where: { meta: { "vibes:discord_guild_id": guild_id } },
  });
  if (!ledger) {
    return true;
  }
  const le = LedgerEntry.build({
    ledger_id: ledger.id,
    type: "Set Ledger Metadata",
    value: {
      key: "vibes:discord_guild_id",
      value: '',
    },
  });
  await le.save();

  const l2 = await findOrCreateLedgerForGuild(guild_id, guild.name);

  const vibeFeed = await getVibeFeed({ client, guild_id });
  await vibeFeed.send(
    `Vibes has disassociated from Spot Ledger ${ledger.id}
Vibes will now use Spot Ledger ${l2.id}`
  );

  await updateAllGuildMembers({ client, guild_id: guild.id });

  return true;
}
