export default async function getSpaceIdsToUpdateEachPeriod(period) {
  return []; // TODO
  const q = `select distinct on(space_id) space_id, value
    from spotspace.space_ledger_entries
    where type = 'Set Vibe Period' and value->>'vibe_period' = '${period}'
    order by space_id, global_seq_number desc;`;
  const r = await SqlDb.query(q);
  const space_ids = r.map((r) => r.space_id);
  return space_ids;
}
