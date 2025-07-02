import { SQLocalKysely } from "sqlocal/kysely";
import { Kysely, Migrator } from "kysely";
import { InitialMigrationProvider } from "./migration";
import type { Schema } from "./schema";

export const initDB = async () => {
  // setup db
  const { dialect } = new SQLocalKysely("database.sqlite3");
  const db = new Kysely<Schema>({ dialect });

  // migration
  await new Migrator({
    db: db,
    provider: new InitialMigrationProvider(),
  }).migrateToLatest();

  return db;
};
