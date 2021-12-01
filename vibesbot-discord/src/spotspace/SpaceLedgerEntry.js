export default class SpaceLedgerEntry extends Model {
  constructor({
    id,
    space_id,
    type,
    value,
    sender_id,
    receiver_id,
    authored_on,
    meta,
  }) {
    this.id = id;
    this.space_id = space_id;
    this.type = type;
    this.value = value;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.authored_on = authored_on;
    this.meta = meta;
  }
}
