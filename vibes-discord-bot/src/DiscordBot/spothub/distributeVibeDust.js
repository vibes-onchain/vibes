import calculateUserVibeRate from './calculateUserVibeRate';

export default function distributeVibeDust({
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
      user_vibes,
      user_id: from_user_id,
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
