import SqlDb from "../../lib/SqlDb";

export default async function () {
  const dbs_r = await SqlDb.dbAdminQuery(
    `SELECT pg_database FROM pg_database WHERE datname = '${process.env.APP_PG_DATABASE}'`
  );
  if (dbs_r.rowCount === 0) {
    await SqlDb.dbAdminQuery(
      `create database ${process.env.APP_PG_DATABASE};`
    );
  }
  return true;
}
