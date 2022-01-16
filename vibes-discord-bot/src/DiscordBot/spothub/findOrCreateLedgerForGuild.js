import Ledger from "spothub/lib/Ledger";
import LedgerEntry from "spothub/lib/LedgerEntry";
import AppCache from ':/lib/AppCache';

export default async function findOrCreateLedgerForGuild(guild_id, guild_name) {
  let existingLedger;
  existingLedger = await AppCache.get(`ledger_for_guild-${guild_id}`);
  if (existingLedger) {
    return existingLedger;
  }

  existingLedger = await Ledger.findOne({
    where: { meta: { "vibes:discord_guild_id": guild_id } },
  });
  await AppCache.set(`ledger_for_guild-${guild_id}`, existingLedger, {ttl: 2*60});
  if (existingLedger) {
    return existingLedger;
  }

  const ledger = await Ledger.build();
  await ledger.save();
  // console.log("attributes", ledger?.attributes);
  const le = LedgerEntry.build({
    ledger_id: ledger.id,
    type: "Set Ledger Metadata",
    value: {
      key: "vibes:discord_guild_id",
      value: guild_id,
    },
  });
  await le.save();

  const newLedger = await Ledger.findOne({
    where: { meta: { "vibes:discord_guild_id": guild_id } },
  });
  return newLedger;
}
