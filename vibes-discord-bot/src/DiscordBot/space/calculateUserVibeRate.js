import parseVibeRate from "./parseVibeRate";
import { evaluate as ssEval } from "subscript";

export default function calculateUserVibeRate(
  vibe_rate_str,
  { user_id, user_vibes }
) {
  const vibe_rates = parseVibeRate(vibe_rate_str);
  const vibedust = user_vibes[user_id];
  for (const tier of vibe_rates) {
    const passed = ssEval(tier[0], { vibedust });
    if (passed) {
      return tier[1];
    }
  }
  return 0;
}
