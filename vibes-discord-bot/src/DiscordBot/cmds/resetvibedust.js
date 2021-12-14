import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import LedgerEntry from 'spothub/lib/LedgerEntry';
import updateAllGuildMembers from '../multi/updateAllGuildMembers';

export default async function resetvibesdust({ client, message }) {
  const ledger = await findOrCreateLedgerForGuild(
    message.guild.id,
    message.guild.name
  );
  const entry = LedgerEntry.build({
    ledger_id: ledger.id,
    type: "Reset Vibe Dust",
    sender: {
      type: 'discord_guild_member',
      id: message.member.id,
    },
    value: {
    },
    authored_on: new Date(),
  });
  await entry.save();

  await updateAllGuildMembers({client, guild_id: message.guild.id})
}
