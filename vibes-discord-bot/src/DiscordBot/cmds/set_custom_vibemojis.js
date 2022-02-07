import LedgerEntry from "spothub/lib/LedgerEntry";
import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import canControlVibesBot from "../discord/canControlVibesBot";
import updateAllGuildMembers from "../multi/updateAllGuildMembers";
import AppCache from ":/lib/AppCache";

export default async function set_custom_vibemojis({
  client,
  command,
  message,
  cmd_args,
}) {
  const member = message ? message.member : command.member;
  const guild = member.guild;

  const value = command
    ? cmd_args.find((i) => i.name === "value").value
    : cmd_args.join(" ");

  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  console.log(value);
  const le = LedgerEntry.build({
    ledger_id: ledger.id,
    type: "Set Ledger Metadata",
    value: {
      key: `vibes:vibe_reaction_aliases`,
      value: value,
    },
  });
  await le.save();

  await message.channel.send("Custom vibemojis added");

  await AppCache.del(`ledger_for_guild-${guild.id}`);
  await updateAllGuildMembers({ client, guild_id: guild.id });

  return true;
}
