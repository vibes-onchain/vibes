import updateLedgerGuildMembers from "../../discord/updateLedgerGuildMembers";
import findOrCreateLedgerForGuild from "../../space/findOrCreateLedgerForGuild";
import LedgerEntry from 'spotspace/lib/LedgerEntry';

export default async function resetvibes({ client, message }) {
  const ledger = await findOrCreateLedgerForGuild(
    message.guild.id,
    message.guild.name
  );
  const entry = LedgerEntry.build({
    ledger_id: ledger.id,
    type: "Reset Vibe Dust",
    value: {
      by_user_id: message.member.user.id,
    },
    authored_on: new Date(),
  });
  await entry.save();

  await updateLedgerGuildMembers(client, ledger.id)
}
