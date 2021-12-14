
import moment from 'moment';
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
  let current_period = null;
  let current_time = null;
  let user_vibes = {};
  let pending_vibes = {};

  for (const entry of entries) {
    if (current_time === null) {
      current_time = entry.authored_on;
    }
    if (entry.type === "Reset Vibe Dust") {
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
      pending_vibes = {};
    }
    if (entry.type === "Set Vibe Period") {
      current_period = entry.value.vibe_period;
    }
    if (entry.type === "Set Vibe Rate") {
      current_rate = entry.value.vibe_rate;
    }
    if (entry.type === "Set Vibe Dust") {
      user_vibes[entry.receiver.id] = entry.value.vibe_dust;
    }
    if (entry.type === "Vibe") {
      pending_vibes[entry.sender.id] ||= {};
      pending_vibes[entry.sender.id][entry.receiver.id] ||= {
        good: 0,
        bad: 0,
      };
      pending_vibes[entry.sender.id][entry.receiver.id].good++;
    }
    if (entry.type === "Bad Vibe") {
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
  const vibe_dust_mean = ss.mean(Object.values(user_vibes));
  const vibe_dust_sd = ss.standardDeviation(Object.values(user_vibes));

  const facts = Object.entries(user_vibes).reduce(
    (acc, [user_id, vibe_dust]) => {
      const vibe_dust_zscore = ss.zScore(
        vibe_dust,
        vibe_dust_mean,
        vibe_dust_sd
      );
      const vibe_dust_percentile =
        ss.cumulativeStdNormalProbability(vibe_dust_zscore);
      let vibeLevel;
      for (const role of [...BAD_VIBE_ROLES, ...GOOD_VIBE_ROLES]) {
        const key = role.when[0];
        const keys_value = (() => {
          if (key === "vibe_dust") {
            return vibe_dust;
          } else if (key === "vibe_dust_zscore") {
            return vibe_dust_zscore;
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
        vibe_dust,
        vibedust: vibe_dust,
        vibe_dust_zscore,
        vibe_dust_percentile,
        vibeLevel
      };
      return acc;
    },
    {}
  );
  return facts;
}
