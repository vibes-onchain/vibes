export default class Space extends Model {
  constructor({ id, name, meta }) {
    this.id = id;
    this.name = name;
    this.meta = meta;
  }
}
