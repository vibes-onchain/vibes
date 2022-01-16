import parseVibeRate from "./parseVibeRate";
import LedgerEntry from 'spothub/lib/LedgerEntry';
import AppCache from ':/lib/AppCache';

export default async function setVibenomics(ledger_id, str, user_id) {
  const vibe_rate = parseVibeRate(str);
  const entry = LedgerEntry.build({
    ledger_id,
    type: "Set Vibenomics",
    sender: {
      type: 'discord_guild_member',
      id: user_id
    },
    value: {
      by_user_id: user_id,
      vibenomics: str,
      // ... can put cause here
    },
    authored_on: new Date(),
  });
  await entry.save();
  await AppCache.del(`ledger_latest_entries-${ledger_id}`);
}
