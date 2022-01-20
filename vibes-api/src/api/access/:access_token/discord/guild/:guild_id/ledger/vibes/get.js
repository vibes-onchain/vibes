import Ledger from "spothub/lib/Ledger";
import reduceVibesLedger from ":/lib/reduceVibesLedger";

export default async function (req, res) {
  const guild_id = req.params.guild_id;
  const ledger = await Ledger.findOne({
    where: { meta: { "vibes:discord_guild_id": guild_id } },
  });
  if (!ledger) {
    return res.json({ ok: false, id: null, error: ["no ledger found"] });
  }
  const ledger_vibes = await reduceVibesLedger({ledger_id: ledger.id});
  return res.json({ ok: true, id: null, result: { guild_id, ledger, ledger_vibes } });
}
