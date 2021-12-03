import _ from "lodash";
import { parse as ssParse, evaluate as ssEval } from "subscript";
import moment from "moment";
import updateGuildMember from "../message/updateGuildMember";
import Space from "spotspace/lib/Space";

export default class DiscordGuild {
  static ALLOWED_VIBE_PERIODS = ["minute", "hour", "day", "week", "month"];

  static getKey({ guild_id }) {
    return `discord:${guild_id}`;
  }

  static async findOneRecord({ guild_id }) {
    return DevKeyValue.findOne({
      where: {
        key: this.getKey({ guild_id }),
      },
    });
  }

  static async findOrCreateRecord({ guild_id }) {
    let record = await this.findOneRecord({ guild_id });
    if (!record) {
      record = await DevKeyValue.create({
        key: this.getKey({ guild_id }),
        value: {},
      });
    }
    return record;
  }

  static async findOne({ guild_id }) {
    const record = await this.findOneRecord({ guild_id });
    if (record) {
      return new DiscordGuild(guild_id, record.value);
    }
    return null;
  }

  static async findOrCreate({ guild_id }) {
    const record = await this.findOrCreateRecord({ guild_id });
    return new DiscordGuild(guild_id, record.value);
  }

  static async saveRecord({ guild_id, values }) {
    const record = await this.findOrCreateRecord({ guild_id });
    record.value = values;
    record.changed("value", true);
    return record.save();
  }

  constructor(guild_id, values = {}) {
    this.id = guild_id;
    this.values = values;
    return this;
  }

  async save() {
    await this.constructor.saveRecord({
      guild_id: this.id,
      values: this.values,
    });
    return this;
  }

  async reload() {
    const guild = await findOrCreate({ guild_id: this.id });
    this.values = guild.values;
  }

  setVibePeriod(period) {
    if (this.constructor.ALLOWED_VIBE_PERIODS.includes(period)) {
      this.values = {
        ...this.values,
        vibe_period: period,
      };
    } else {
      throw new Error(`vibe period ${period} not allowed`);
    }
  }

  async saveVibePeriod(period, user_id) {
    if (this.constructor.ALLOWED_VIBE_PERIODS.includes(period)) {
      this.values = {
        ...this.values,
        vibe_period: period,
      };
    } else {
      throw new Error(`vibe period ${period} not allowed`);
    }
    const space = await DiscordGuild.findOrCreateSpace(this.id);
    const entry = SpaceLedgerEntry.build({
      space_id: space.id,
      type: "Set Vibe Period",
      value: {
        by_user_id: user_id,
        vibe_period: period,
        // ... can put cause here
      },
      authored_on: new Date(),
    });
    await entry.save();
    await this.save();
  }

  static parseVibeRate(str) {
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

  setVibeRate(str) {
    const vibe_rate = this.constructor.parseVibeRate(str);
    this.values = {
      ...this.values,
      vibe_rate,
    };
  }

  async saveVibeRate(str, user_id) {
    const vibe_rate = this.constructor.parseVibeRate(str);
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

  static async findOrCreateSpace(guild_id, guild_name) {
    const [space, _was_created] = await Space.findOrCreate({
      where: { meta: { discord_guild_id: guild_id } },
      defaults: {
        // name: guild_name,
        meta: { discord_guild_id: guild_id },
      },
    });
    if (guild_name) {
      space.name = guild_name;
    }
    space.meta = { ...space.meta, discord_guild_id: guild_id };
    await space.save();
    return space;
  }

  async saveVibe({ from_user_id, user_id, reason }) {
    const space = await DiscordGuild.findOrCreateSpace(this.id);
    const entry = SpaceLedgerEntry.build({
      space_id: space.id,
      type: "Vibe",
      value: {
        from_user_id: from_user_id,
        user_id: user_id,
        reason: reason,
      },
      authored_on: new Date(),
    });
    await entry.save();
  }

  async saveBadVibe({ from_user_id, user_id, reason }) {
    const space = await DiscordGuild.findOrCreateSpace(this.id);
    const entry = SpaceLedgerEntry.build({
      space_id: space.id,
      type: "BadVibe",
      value: {
        from_user_id: from_user_id,
        user_id: user_id,
        reason: reason,
      },
      authored_on: new Date(),
    });
    await entry.save();
  }

  async saveSetVibes({ by_user_id, user_id, vibes = 1, reason }) {
    const space = await DiscordGuild.findOrCreateSpace(this.id);
    const entry = SpaceLedgerEntry.build({
      space_id: space.id,
      type: "Set Vibe Dust",
      value: {
        by_user_id: by_user_id,
        user_id: user_id,
        vibes: vibes,
        reason: reason,
      },
      authored_on: new Date(),
    });
    await entry.save();
  }

  static calculateUserVibeRate(vibe_rate_str, { user_id, user_vibes }) {
    const vibe_rates = DiscordGuild.parseVibeRate(vibe_rate_str);
    const vibedust = user_vibes[user_id];
    for (const tier of vibe_rates) {
      const passed = ssEval(tier[0], { vibedust });
      if (passed) {
        return tier[1];
      }
    }
    return 0;
  }

  static distributeVibeDust({
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
      const from_user_vibe_rate = DiscordGuild.calculateUserVibeRate(
        current_rate,
        { user_vibes, user_id: from_user_id }
      );
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

  async recountVibes() {
    const space = await this.constructor.findOrCreateSpace(this.id);
    return await this.constructor.recountSpaceVibes(space.id);
  }

  static async recountSpaceVibes(space_id) {
    const entries = await SpaceLedgerEntry.findAll({
      where: { space_id: space_id },
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

  static async getSpaceIdsToUpdateEachPeriod(period) {
    return []; // TODO
    const q = `select distinct on(space_id) space_id, value
    from spotspace.space_ledger_entries
    where type = 'Set Vibe Period' and value->>'vibe_period' = '${period}'
    order by space_id, global_seq_number desc;`;
    const r = await SqlDb.query(q);
    const space_ids = r.map((r) => r.space_id);
    return space_ids;
  }

  static async updateSpaceGuildUsers(client, space_id) {
    const space = await Space.findOne({ where: { id: space_id } });
    const guild_id = space.meta?.discord_guild_id;
    if (guild_id) {
      const guild = await client.guilds.cache.find((g) => g.id === guild_id);
      const users_vibes = await DiscordGuild.recountSpaceVibes(space_id);
      for (const [member_id, member] of guild.members.cache) {
        if (Object.keys(users_vibes).indexOf(member.user.id) === -1) {
          await updateGuildMember({
            client,
            guild,
            user_id: member.user?.id,
            vibes: 0,
            frenly_labels: space.meta?.frenly_labels,
            frenly_paren: space.meta?.frenly_paren,
          });
        }
      }
      for (const [user_id, vibes] of Object.entries(users_vibes)) {
        await updateGuildMember({
          client,
          guild,
          user_id,
          vibes,
          frenly_labels: space.meta?.frenly_labels,
          frenly_paren: space.meta?.frenly_paren,
        });
      }
    }
  }

  static async messageVibeFeedChannel(guild, message) {
    const feedChannel = guild.channels.cache.find(
      (i) => i.name === "vibe-feed"
    );
    await feedChannel.send(message).catch((e) => {
      console.log(e);
    });
  }
}
