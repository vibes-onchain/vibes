import { parse as ssParse, evaluate as ssEval } from "subscript";
import parseVibeRate from "./parseVibeRate";
import findOrCreateLedgerForGuild from "./findOrCreateLedgerForGuild";

export default async function saveVibeRate(str, user_id) {
  const vibe_rate = parseVibeRate(str);
  this.values = {
    ...this.values,
    vibe_rate,
  };
  const space = await findOrCreateLedgerForGuild(this.id);
  const entry = LedgerEntry.build({
    ledger_id: space.id,
    type: "Set Vibe Rate",
    value: {
      by_user_id: user_id,
      vibe_rate: str,
      // ... can put cause here
    },
    authored_on: new Date(),
  });
  await entry.save();
  await this.save();
}
