import SqlDb from ":/lib/SqlDb";

export default async function () {
  await SqlDb.dbAdminQuery(
    `drop database if exists ${process.env.APP_PG_DATABASE};`
  );
  return true;
}
