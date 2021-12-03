export default async function parseVibeRate(str) {
  const numberMatcher = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

  const m = str.match(/^case\s+(.*)\s+end$/i);
  if (!m) {
    const m = str.match(numberMatcher);
    if (!m) {
      throw new Error("vibe rate not a number");
    }
    return [[[1], parseFloat(m[0])]];
  }

  const rules = [];
  const rule_strs = m[1].split(/\s*?(?:when|else)\s+?/i);
  if (!rule_strs.length >= 1) {
    throw new Error("vibe rate conditions not parsed");
  }
  rule_strs.shift();
  for (const rule_str of rule_strs) {
    const m = rule_str.match(/^(.*)\s+?(?:then)?\s+?(.*)$/);
    if (m) {
      const guard = ssParse(m[1]);
      const tokens = _.flatten(guard).filter((i) => {
        if (!_.isString(i)) {
          return false;
        } else {
          return !i.match(/[!<>+-/*&|]+/);
        }
      });
      const unknownTokens = _.uniq(tokens).filter(
        (i) =>
          ["vibedust_sd", "vibedust_percentile", "vibedust"].indexOf(i) === -1
      );
      if (unknownTokens.length > 0) {
        throw new Error("unknown variable used");
      }
      const n = m[2].match(numberMatcher);
      if (!n) {
        throw new Error("vibe rate not a number");
      }
      const value = parseFloat(n[0]);
      rules.push([guard, value]);
    } else {
      const n = rule_str.match(numberMatcher);
      if (!n) {
        throw new Error("vibe rate not a number");
      }
      const value = parseFloat(n[0]);
      rules.push([[1], value]);
    }
  }
  return rules;
}
