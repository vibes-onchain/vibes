export default class Model {
  constructor({}) {}

  async save() {
    // TODO
  }

  static build(args) {
    return new this(args);
  }

  static async findOne({ where }) {
    // TODO
  }

  static async findOneOrCreate({ where, defaults }) {
    let instance = await this.findOne({ where });
    if (instance) {
      return [instance, false];
    }
    instance = new this({ ...defaults });
    await instance.save();
    return [instance, true];
  }

  static get connection() {
    if (this._connection) {
      return this._connection;
    } else if (globals.SPOTSPACE_CONNECTION) {
      return globals.SPOTSPACE_CONNECTION;
    }
  }

  static set connection(_connection) {
    this._connection = _connection;
  }
}
