import reduceVibesLedger from './reduceVibesLedger';
import findOrCreateLedgerForGuild from './findOrCreateLedgerForGuild';

export default async function getVibesUserDetails ({guild_id, member_id}) {
  const ledger = await findOrCreateLedgerForGuild(guild_id);
  const ledger_id = ledger.id;
  const summary = await reduceVibesLedger({ledger_id});
  if (summary[member_id]) {
    return {
      ...summary[member_id]
    };
  } else {
    return {
      vibedust: null,
      vibeLevel: null,
      nicknameParen: null
    }
  }
}
