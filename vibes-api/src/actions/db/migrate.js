import DbMigrate from "db-migrate";
import SqlDb from "../../lib/SqlDb";
import _ from "lodash";

const ALL_DBS = [];

export default async function (opts = {}) {
  const { dir, db } = opts;
  const dbs = db ? [db] : ALL_DBS;

  for (const db of dbs) {
    await SqlDb.ensureSchema(db);
    // handle leak from db-migrate
    const before_process_listeners = {
      uncaughtException: process.listeners("uncaughtException"),
      unhandledRejection: process.listeners("unhandledRejection"),
    };

    const migrator = DbMigrate.getInstance(true, {
      cwd: `${__dirname}/../../../dbs/${db}`,
      env: "default",
      config: {
        default: {...SqlDb.connection_info, schema: db },
      },
    });
    if (dir === "up") {
      await migrator.up(1);
    } else if (dir === "down") {
      await migrator.down(1);
    } else {
      await migrator.up();
    }

    // handle leak from db-migrate
    const after_process_listeners = {
      uncaughtException: process.listeners("uncaughtException"),
      unhandledRejection: process.listeners("unhandledRejection"),
    };
    const addedListeners = {
      uncaughtException: _.differenceWith(
        after_process_listeners.uncaughtException,
        before_process_listeners.uncaughtException
      ),
      unhandledRejection: _.differenceWith(
        after_process_listeners.unhandledRejection,
        before_process_listeners.unhandledRejection
      ),
    };
    for (let key of Object.keys(addedListeners)) {
      for (let listener of addedListeners[key]) {
        process.removeListener(key, listener);
      }
    }
  }
}
