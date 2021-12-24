import findOrCreateLedgerForGuild from "../spothub/findOrCreateLedgerForGuild";
import getVibesLedgerSummary from "../spothub/getVibesLedgerSummary";
import sendResponse from "../discord/sendResponse";

export default async function help({ client, message, command }) {
  const member = message ? message.member : command.member;

  const guild = member?.guild;
  const guild_id = guild.id;

  const ledger = await findOrCreateLedgerForGuild(guild.id, guild.name);
  const ledger_id = ledger.id;

  // const vibesLedgerSummary = await getVibesLedgerSummary({
  //   guild_id: guild.id,
  // });

  await sendResponse({
    client,
    guild_id,
    message,
    command,
    response: "help",
    ledger_id,
  });

  return true;
}
