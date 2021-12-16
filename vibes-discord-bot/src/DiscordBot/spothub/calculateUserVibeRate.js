import parseVibeRate from "./parseVibeRate";
import { evaluate as ssEval } from "subscript";

export default function calculateUserVibeRate(
  vibe_rate_str,
  user_attrs
) {
  const vibe_rates = parseVibeRate(vibe_rate_str);
  for (const tier of vibe_rates) {
    const passed = ssEval(tier[0], { ...user_attrs });
    if (passed) {
      return tier[1];
    }
  }
  return 0;
}
