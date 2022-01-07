const Sequelize = require("sequelize");
const { Client } = require("pg");
const pg = require("pg");
const fs = require("fs");
const _ = require("lodash");

pg.types.setTypeParser(1082, "text", function (text) {
  return text;
});
pg.types.setTypeParser(1184, "text", function (text) {
  return text;
});
pg.types.setTypeParser(1114, "text", function (text) {
  return text;
});

const DEFAULT_PG_CONFIG = {
  host: process.env.APP_PG_HOST,
  user: process.env.APP_PG_USERNAME,
  database: process.env.APP_PG_DATABASE,
  password: process.env.APP_PG_PASSWORD,
  port: process.env.APP_PG_PORT,
  max: process.env.APP_PG_CONNECTION_POOL_LIMIT,
  ssl: process.env.APP_PG_SSL,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
  waitForConnections: true,
  multipleStatements: true,
  queueLimit: 0,
};

function pgConfigToConnStr(conf) {
  var r = "postgres://";
  r += conf.user;
  if (conf.password) {
    r += ":" + conf.password;
  }
  r += "@" + conf.host;
  r += ":" + conf.port;
  r += "/" + conf.database;
  return r;
}

function pgConnStrToConfig(connStr, use_ssl = 0) {
  const sql = { driver: "pg" };
  const url = connStr.replace(/^postgres:\/\//, "");
  const re = /^(?:([^:@]+)(?::|)([^@]*?)@|)(.+):(.+)\/(.+)$/;
  const m = url.match(re);
  if (m[1] && m[1].length) {
    sql.user = m[1];
  } else {
    sql.user = process.env.USER;
  }
  if (m[2] && m[2].length) {
    sql.password = m[2];
  } else {
    delete sql.password;
  }
  sql.host = m[3];
  sql.port = m[4];
  sql.database = m[5];
  sql.ssl = use_ssl == true;
  return sql;
}

const PG_CONN_STR = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : pgConfigToConnStr(DEFAULT_PG_CONFIG);
const PG_CONFIG = process.env.DATABASE_URL
  ? pgConnStrToConfig(process.env.DATABASE_URL, process.env.APP_PG_SSL)
  : DEFAULT_PG_CONFIG;

// let _connectionPool;

// function getConnectionPool() {
//   if (!_connectionPool) {
//     _connectionPool = new Pool({ ...PG_CONFIG });
//   }
//   return _connectionPool;
// }

const PG_CONN_OPTIONS = {
  dialect: "postgres",
  dialectOptions: {
    useUTC: true, // for reading from database
    ssl:
      process.env.APP_PG_SSL == true
        ? {
          require: true,
          rejectUnauthorized:
            process.env.APP_PG_SSL_ALLOW_SELF_SIGNED == true ? false : true,
        }
        : null,
  },
  timezone: "+00:00", // for writing to database
  pool: {
    min: 0,
    max: 5,
    idle: 60 * 1000,
    acquire: 60 * 1000,
  },
};

function _setupSequelize() {
  return new Sequelize(
    PG_CONN_STR,
    _.merge({}, PG_CONN_OPTIONS, {
      logging: function (r) {
        return process.env.APP_LOG_SQL ? SqlLogger.info(r) : null;
      },
      dialectOptions: {
        prependSearchPath: true,
      },
    })
  );
}

let _sequelize = _setupSequelize();

// const _sequelize = new Sequelize('sqlite::memory:');
export default class SqlDb {
  static connection_info = {
    driver: "pg",
    ...PG_CONFIG,
  };

  static setupSequelize() {
    _setupSequelize();
  }
  static sequelize = _sequelize;

  static connection_str = PG_CONN_STR;

  static async dbAdminQuery(sql) {
    const client = new Client({ ...PG_CONFIG, database: "postgres" });
    await client.connect();
    const r = await client.query(sql);
    await client.end();
    return r;
  }

  static async direct_query(sql) {
    return this.sequelize.query(sql);
  }

  static async query(sql, replacements = {}) {
    return this.sequelize
      .query(sql, {
        replacements,
        raw: true,
        type: Sequelize.QueryTypes.SELECT,
      })
      .then(function (results) {
        if (results.length > 0) {
          return results;
        } else {
          return [];
        }
      })
      .catch((e) => {
        throw e;
      });
  }

  static readSql(queryName) {
    const fn = `${__dirname}/../sql/${queryName}.sql`;
    return fs.readFileSync(fn, "utf8");
  }

  static async querySql(queryName, replacements) {
    return query(readSql(queryName), replacements);
  }

  static async promiseWrite(q, replacements = {}) {
    return SqlDb.query(q, {
      replacements,
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
      useMaster: true,
    })
      .then(function (results) {
        if (results.length > 0) {
          return results;
        } else {
          return [];
        }
      })
      .catch((e) => {
        throw e;
      });
  }

  static async promiseRead(q, replacements = {}) {
    return SqlDb.query(q, {
      replacements,
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
    })
      .then(function (results) {
        if (results.length > 0) {
          return results;
        } else {
          return [];
        }
      })
      .catch((e) => {
        throw e;
      });
  }

  static async ensureSchema(schema) {
    const q = `
      CREATE SCHEMA IF NOT EXISTS ${schema};
    `;
    const res = await SqlDb.promiseWrite(q);
    return res;
  }
}
