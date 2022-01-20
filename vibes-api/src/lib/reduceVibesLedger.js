import moment from "moment";
import LedgerEntry from "spothub/lib/LedgerEntry";
import * as ss from "simple-statistics";
import { GOOD_VIBE_ROLES, BAD_VIBE_ROLES } from "./constants";
import { parse as ssParse, evaluate as ssEval } from "subscript";
import _ from "lodash";

export function parseVibeRate(str) {
  if (str === null || typeof str === undefined) {
    return [[1], 0];
  }

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
    const m = rule_str.match(/^(.*)\s+?(?:then)?\s+?(.*)$/i);
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
          ["vibestack_zscore", "vibestack_percentile", "vibestack"].indexOf(
            i
          ) === -1
      );
      if (unknownTokens.length > 0) {
        throw new Error("unknown variable used");
      }
      const n = m[2].match(numberMatcher);
      if (n === null || typeof n === undefined) {
        throw new Error("vibe rate not a number");
      }
      const value = parseFloat(n[0]);
      rules.push([guard, value]);
    } else {
      const n = rule_str.match(numberMatcher);
      if (n === null || typeof n === undefined) {
        throw new Error("vibe rate not a number");
      }
      const value = parseFloat(n[0]);
      rules.push([[1], value]);
    }
  }
  return rules;
}

export function calculateUserVibeRate(vibe_rate_str, user_attrs) {
  const vibe_rates = parseVibeRate(vibe_rate_str);
  for (const tier of vibe_rates) {
    const passed = ssEval(tier[0], { ...user_attrs });
    if (passed) {
      return tier[1];
    }
  }
  return 0;
}

export function distributeVibeDust({
  current_rate,
  current_period,
  current_time,
  user_vibes,
  pending_vibes,
}) {
  if (!current_rate) {
    return user_vibes;
  }
  // console.log('DISTRIBUTING', current_time, pending_vibes)
  for (const from_user_id of Object.keys(pending_vibes)) {
    const from_user_vibe_rate = calculateUserVibeRate(current_rate, {
      vibedust: user_vibes[from_user_id],
    });
    const pending_vibes_sent = pending_vibes[from_user_id];
    let total_pending_vibes = 0;
    for (const vibes of Object.values(pending_vibes_sent)) {
      total_pending_vibes =
        total_pending_vibes + vibes.good || 0 + vibes.bad || 0;
    }
    let net_vibes = {};
    for (const [to_user_id, vibes] of Object.entries(pending_vibes_sent)) {
      net_vibes =
        (from_user_vibe_rate * (vibes.good || 0 - vibes.bad || 0)) /
        total_pending_vibes;
      user_vibes[to_user_id] = (user_vibes[to_user_id] || 0) + net_vibes;
    }
  }
  // console.log({user_vibes});
  return user_vibes;
}

export default async function reduceVibesLedger({ ledger_id }) {
  if (!ledger_id) {
    return {};
  }

  let current_rate = null;
  let current_period = "day";
  let current_time = null;
  let user_vibes = {};
  let pending_vibes = {};
  let latest_entry_id = null;

  let entries;
  entries = await LedgerEntry.findAll({
    where: { ledger_id: ledger_id },
    after: latest_entry_id,
  });

  for (const entry of entries) {
    if (current_time === null) {
      current_time = entry.authored_on;
      // console.log("STARTING AT", current_time);
    }
    if (entry.type === "Reset Vibestacks" || entry.type === "Reset All Vibes") {
      pending_vibes = {};
      user_vibes = {};
    }
    if (
      current_rate &&
      current_period &&
      moment(current_time)
        .endOf(current_period)
        .isSameOrBefore(moment(entry.authored_on))
    ) {
      user_vibes = distributeVibeDust({
        current_rate,
        current_period,
        current_time,
        user_vibes,
        pending_vibes,
      });
      // console.log("MOVING TO", current_time);
      // console.log({user_vibes});
      pending_vibes = {};
    }
    // if (entry.type === "Set Vibe Period") {
    //   current_period = entry.value.vibe_period;
    // }
    if (entry.type === "Set Vibenomics") {
      current_rate = entry.value.vibenomics;
    }
    if (entry.type === "Set Vibestack" || entry.type === "Set User Vibes") {
      user_vibes[entry.receiver.id] = entry.value.vibestack;
    }
    if (entry.type === "Vibe") {
      pending_vibes[entry.sender.id] ||= {};
      pending_vibes[entry.sender.id][entry.receiver.id] ||= {
        good: 0,
        bad: 0,
      };
      pending_vibes[entry.sender.id][entry.receiver.id].good++;
    }
    if (entry.type === "BadVibe") {
      pending_vibes[entry.sender.id] ||= {};
      pending_vibes[entry.sender.id][entry.receiver.id] ||= {
        good: 0,
        bad: 0,
      };
      pending_vibes[entry.sender.id][entry.receiver.id].bad++;
    }
    current_time = entry.authored_on;
    latest_entry_id = entry.id;
    // console.log(entry.dataValues);
    // console.log({
    //   current_rate,
    //   current_period,
    //   current_time,
    //   user_vibes,
    //   pending_vibes,
    // });
  }

  user_vibes = distributeVibeDust({
    current_rate,
    current_period,
    current_time,
    user_vibes,
    pending_vibes,
  });
  const vibestack_mean = Object.values(user_vibes).length
    ? ss.mean(Object.values(user_vibes))
    : 0;
  const vibestack_sd = Object.values(user_vibes).length
    ? ss.standardDeviation(Object.values(user_vibes))
    : 0;

  const profiles = Object.entries(user_vibes).reduce(
    (acc, [user_id, vibestack]) => {
      const vibestack_score = ss.zScore(
        vibestack,
        vibestack_mean,
        vibestack_sd
      );
      const vibestack_percentile =
        ss.cumulativeStdNormalProbability(vibestack_score);
      let vibe_level, vibe_level_name;
      for (const role of [...BAD_VIBE_ROLES, ...GOOD_VIBE_ROLES]) {
        const key = role.when[0];
        const keys_value = (() => {
          if (key === "vibestack") {
            return vibestack;
          } else if (key === "vibestack_score") {
            return vibestack_score;
          }
        })();
        const op = role.when[1];
        const value = role.when[2];
        if (role.when) {
          if (op === "<") {
            if (keys_value < value) {
              vibe_level_name = role.name;
              vibe_level = role.level;
              break;
            }
          } else if (op === ">") {
            if (keys_value > value) {
              vibe_level_name = role.name;
              vibe_level = role.level;
              break;
            }
          }
        }
      }
      acc[user_id] = {
        vibestack,
        vibestack_score,
        vibestack_percentile,
        vibeLevel: vibe_level_name,
        vibe_level_name,
        vibe_level,
      };
      return acc;
    },
    {}
  );
  return {
    current_rate,
    current_period,
    profiles,
  };
}
