export default async function recountLedgerVibes(space_id) {
  const entries = await LedgerEntry.findAll({
    where: { ledger_id: space_id },
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
      user_vibes = DiscordGuild.distributeVibeDust({
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
      user_vibes[entry.value.user_id] = entry.value.vibes;
    }
    if (entry.type === "Vibe") {
      pending_vibes[entry.value.from_user_id] ||= {};
      pending_vibes[entry.value.from_user_id][entry.value.user_id] ||= {
        good: 0,
        bad: 0,
      };
      pending_vibes[entry.value.from_user_id][entry.value.user_id].good++;
    }
    if (entry.type === "BadVibe") {
      pending_vibes[entry.value.from_user_id] ||= {};
      pending_vibes[entry.value.from_user_id][entry.value.user_id] ||= {
        good: 0,
        bad: 0,
      };
      pending_vibes[entry.value.from_user_id][entry.value.user_id].bad++;
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
  user_vibes = DiscordGuild.distributeVibeDust({
    current_rate,
    current_period,
    current_time,
    user_vibes,
    pending_vibes,
  });
  return user_vibes;
}