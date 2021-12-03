import { parse as ssParse, evaluate as ssEval } from "subscript";
import parseVibeRate from "./parseVibeRate";

export default async function saveVibeRate(str, user_id) {
  const vibe_rate = parseVibeRate(str);
  this.values = {
    ...this.values,
    vibe_rate,
  };
  const space = await DiscordGuild.findOrCreateSpace(this.id);
  const entry = SpaceLedgerEntry.build({
    space_id: space.id,
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
