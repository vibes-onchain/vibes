import reduceVibesLedger from "./reduceVibesLedger";
import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";
import calculateUserVibeRate from "./calculateUserVibeRate";

export default async function getVibesUserDetails({ guild_id, member_id }) {
  const ledger = await findOrCreateLedgerForGuild(guild_id);
  const ledger_id = ledger.id;
  const reduced = await reduceVibesLedger({ ledger_id });
  // console.log(reduced);
  const vibestack = calculateUserVibeRate(
    reduced.current_rate,
    reduced?.profiles[member_id]
  );
  if (reduced?.profiles[member_id]) {
    return {
      vibestack,
      ...reduced?.profiles[member_id],
    };
  } else {
    return {
      vibedust: null,
      vibeLevel: null,
      nicknameParen: null,
    };
  }
}
