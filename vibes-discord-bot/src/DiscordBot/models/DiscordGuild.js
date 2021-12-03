import _ from "lodash";
import Space from "spotspace/lib/Space";
export default class DiscordGuild {
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
}
