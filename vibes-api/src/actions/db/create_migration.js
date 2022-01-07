import DbMigrate from "db-migrate";
import Skeleton from "db-migrate/lib/skeleton";
import Migration from "db-migrate/lib/migration";
import SqlDb from "../../lib/SqlDb";
import fs from "fs-extra";

function compileMigrationTemplate(name) {
  return `
  var logger = require("../logger.js");
  var dbm = require("db-migrate");
  var type = dbm.dataType;
  var seed;
  var fs = require("fs");
  var path = require("path");

  exports.up = function(db, callback) {
    var filePath = path.join(
      __dirname + "/sqls/${name}-up.sql"
    );
    return new Promise( function( resolve, reject ) {
      fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (err) return reject(err);
        logger('received data: ' + data);
        resolve(data);
      });
    })
    .then(function(data) {
      return db.runSql(data);
    });
  };

  exports.down = function(db, callback) {
    var filePath = path.join(
      __dirname + "/sqls/${name}-down.sql"
    );
    return new Promise( function( resolve, reject ) {
      fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (err) return reject(err);
        logger('received data: ' + data);
        resolve(data);
      });
    })
    .then(function(data) {
      return db.runSql(data);
    });
  };
  `;
}

export default async function ({ name, db }) {
  if (!db) {
    console.log('must specific db');
    return false;
  }
  const migrator = DbMigrate.getInstance(true, {
    cwd: `${__dirname}/../../../dbs/${db}`,
    env: "default",
    config: {
      default: {...SqlDb.connection_info, schema: db },
      "sql-file": true,
    },
  });
  migrator.internals.argv._ = [name];
  await migrator.create(name);
  const skel = new Skeleton(migrator.internals);
  const title = migrator.internals.argv.title;
  const dir = migrator.internals.argv["migrations-dir"];
  const date = migrator.internals.runTimestamp;
  const fn = skel.formatName(title, date);
  const migration_fp = `${dir}/${fn}.js`;
  fs.writeFileSync(migration_fp, compileMigrationTemplate(fn));
}
