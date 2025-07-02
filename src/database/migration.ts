import { type MigrationProvider, type Migration } from "kysely";

export class InitialMigrationProvider implements MigrationProvider {
  public async getMigrations(): Promise<Record<string, Migration>> {
    return {
      "-": {
        async up(db) {
          await db.schema
            .createTable("groceries")
            .addColumn("id", "integer", (col) =>
              col.primaryKey().autoIncrement()
            )
            .addColumn("name", "text", (col) => col.notNull())
            .addColumn("quantity", "integer", (col) => col.notNull())
            .execute();
        },
        async down(db) {
          await db.schema.dropTable("groceries").execute();
        },
      },
    };
  }
}
