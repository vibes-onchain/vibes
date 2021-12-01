import Space from "./Space";
import SpaceLedgerEntry from "./SpaceLedgerEntry";

const setModelConnection = function (model, connection) {
  model.connection = connection;
};

export default function spotspace(public_key, config) {
  const connection = null; // TODO
  const models = {
    Space: setModelConnection(Space, connection),
    SpaceLedgerEntry: setModelConnection(SpaceLedgerEntry, connection),
  };
  return { connection, models };
}
