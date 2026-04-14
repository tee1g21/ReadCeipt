import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@/db/client";
import migrations from "@/db/drizzle/migrations";

export function useAppMigrations() {
  return useMigrations(db, migrations);
}
