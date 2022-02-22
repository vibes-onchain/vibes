import reduceVibesLedger from "./reduceVibesLedger";
import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";
import calculateUserVibeRate from "./calculateUserVibeRate";

export default async function getVibesUserDetails({ guild_id, member_id }) {
  const ledger = await findOrCreateLedgerForGuild(guild_id);
  const ledger_id = ledger.id;
  const reduced = await reduceVibesLedger({ ledger_id });
  const vibedust = calculateUserVibeRate(
    reduced.current_rate,
    reduced?.profiles[member_id]
  );
  if (reduced?.profiles[member_id]) {
    // console.log(reduced?.profiles[member_id]);
    return {
      ...reduced?.profiles[member_id],
      vibedust,
    };
  } else {
    return {
      vibestack: 0,
      vibedust: vibedust || 0,
      vibeLevel: 'Unknown Vibes',
      vibe_level_name: 'Unknown Vibes',
      vibe_level: 0,
      nicknameParen: null,
    };
  }
}
