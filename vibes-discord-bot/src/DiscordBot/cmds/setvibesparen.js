import LedgerEntry from "spothub/lib/LedgerEntry";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import canControlVibesBot from "../discord/canControlVibesBot";
import updateAllGuildMembers from "../multi/updateAllGuildMembers";

export default async function setvibesparen({ client, message, cmd_args }) {
  const message_member = message.member;
  const guild = message_member.guild;

  if (
    !(await canControlVibesBot({
      client,
      guild_id: guild.id,
      member_id: message.member?.id,
    }))
  ) {
    return;
  }

  const space = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const le = LedgerEntry.build({
    ledger_id: space.id,
    type: "Set Ledger Metadata",
    value: {
      key: "vibes:paren",
      value: cmd_args.join(" "),
    },
  });
  await le.save();

  await updateAllGuildMembers({ client, guild_id: guild.id });
}
