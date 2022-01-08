import moment from "moment";
import LedgerEntry from "spothub/lib/LedgerEntry";
import distributeVibeDust from "./distributeVibeDust";
import * as ss from "simple-statistics";
import { GOOD_VIBE_ROLES, BAD_VIBE_ROLES } from "../constants";

export default async function reduceVibesLedger({ ledger_id }) {
  const entries = await LedgerEntry.findAll({
    where: { ledger_id: ledger_id },
    order: [["global_seq_number", "ASC"]],
  });
  let current_rate = null;
  let current_period = 'day';
  let current_time = null;
  let user_vibes = {};
  let pending_vibes = {};

  for (const entry of entries) {
    if (current_time === null) {
      current_time = entry.authored_on;
      // console.log("STARTING AT", current_time);
    }
    if (entry.type === "Reset Vibestacks") {
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
    if (entry.type === "Set Vibestack") {
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
  const vibestack_mean = Object.values(user_vibes).length ? ss.mean(Object.values(user_vibes)) : 0;
  const vibestack_sd = Object.values(user_vibes).length ? ss.standardDeviation(Object.values(user_vibes)) : 0;

  const profiles = Object.entries(user_vibes).reduce(
    (acc, [user_id, vibestack]) => {
      const vibestack_score = ss.zScore(
        vibestack,
        vibestack_mean,
        vibestack_sd
      );
      const vibestack_percentile =
        ss.cumulativeStdNormalProbability(vibestack_score);
      let vibeLevel;
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
              vibeLevel = role.name;
              break;
            }
          } else if (op === ">") {
            if (keys_value > value) {
              vibeLevel = role.name;
              break;
            }
          }
        }
      }
      acc[user_id] = {
        vibestack,
        vibestack_score,
        vibestack_percentile,
        vibeLevel,
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
