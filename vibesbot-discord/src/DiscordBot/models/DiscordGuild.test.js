import MockDate from "mockdate";

import DiscordGuild from "./DiscordGuild";

test("DiscordGuild", async () => {
  const guild_id = 1000;
  let dg;

  dg = await DiscordGuild.findOne({ guild_id });
  expect(dg).toBe(null);

  dg = await DiscordGuild.findOrCreate({ guild_id });
  expect(dg).not.toBe(null);
  expect(dg.values).toEqual({});

  dg.setVibePeriod("week");
  await dg.save();
  expect(dg.values.vibe_period).toEqual("week");

  expect(() => {
    dg.setVibePeriod("fortnight");
  }).toThrow();

  dg.setVibeRate(
    "case when vibedust_sd > 20 then 100 when vibedust_percentile > .99 then 50 when vibedust > 1000 then 20 when vibedust > 10 then 1 else 0 end"
  );
  expect(dg.values.vibe_rate).toEqual([
    [[">", "vibedust_sd", 20], 100],
    [[">", "vibedust_percentile", 0.99], 50],
    [[">", "vibedust", 1000], 20],
    [[">", "vibedust", 10], 1],
    [[1], 0],
  ]);
});

test("DiscordGuild.parseVibeRate", async () => {
  let r;
  const ex1 =
    "case when vibedust_sd > 20 then 100 when vibedust_percentile > .99 then 50 when vibedust > 1000 then 20 when vibedust > 10 then 1 else 0 end";
  r = DiscordGuild.parseVibeRate(ex1);
  expect(r).toEqual([
    [[">", "vibedust_sd", 20], 100],
    [[">", "vibedust_percentile", 0.99], 50],
    [[">", "vibedust", 1000], 20],
    [[">", "vibedust", 10], 1],
    [[1], 0],
  ]);
  const bad_ex1 =
    "percentile > .99 then 50 else if vibedust > 1000 then 20 else if vibedust > 10 then 1 else 0";
  expect(() => DiscordGuild.parseVibeRate(bad_ex1)).toThrow();
  const bad_ex2 =
    "case when vibedust_sd > 20 then 100 hen vibedust_percentile > .99 then 50 when vibedust > 1000 then 20 when vibedust > 10 then 1 else 0 end";
  expect(() => DiscordGuild.parseVibeRate(bad_ex2)).toThrow();
  const bad_ex3 =
    "case when vibedust_sd > 20 then 100 hen vibedust_percentile > .99 then 50 when vibedust > 1000 then 20 when vibedust > 10 then 1 else 0 when 1 == 1 then 2 end";
  expect(() => DiscordGuild.parseVibeRate(bad_ex3)).toThrow();
  const bad_ex4 =
    "case when avibedust_sd > 20 then 100 when vibedust_percentile > .99 then 50 when vibedust > 1000 then 20 when vibedust > 10 then 1 else 0 end";
  expect(() => DiscordGuild.parseVibeRate(bad_ex4)).toThrow();
});

test("DiscordGuild.vibedistro", async () => {
  MockDate.set("2020-01-01 00:00");

  const guild_id = "2020";
  const guild_name = "Test Guild";
  const user1_id = "0001";
  const user2_id = "0002";
  const user3_id = "0003";

  let dg, user_vibes;

  dg = await DiscordGuild.findOrCreate({ guild_id });
  await dg.saveVibePeriod("minute");
  await dg.saveVibeRate("case when vibedust > 0 then 10 else 0 end");

  await dg.saveSetVibes({
    by_user_id: user1_id,
    user_id: user1_id,
    vibes: 100,
  });
  await dg.saveVibe({ from_user_id: user1_id, user_id: user2_id });

  user_vibes = await dg.recountVibes();
  expect(user_vibes).toEqual({ "0001": 100, "0002": 10 });

  MockDate.set("2020-01-01 00:01");

  await dg.saveVibeRate("case when vibedust > 0 then 5 else 0 end");
  await dg.saveVibe({ from_user_id: user2_id, user_id: user3_id });
  await dg.saveVibe({ from_user_id: user2_id, user_id: user3_id });
  await dg.saveVibe({ from_user_id: user3_id, user_id: user1_id });

  MockDate.set("2020-01-01 00:02");

  user_vibes = await dg.recountVibes();
  expect(user_vibes).toEqual({ "0001": 105, "0002": 10, "0003": 5 });

  MockDate.reset();
});
