import { useState, useEffect } from "react";
import { seedDatabase } from "@/db/seed";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@/db/client";
import { receipts } from "@/db/schema";
import migrations from "@/db/drizzle/migrations";

export function useInitializeDatabase() {
  const [dbReady, setDbReady] = useState(false);
  const { success: dbLoaded, error: dbError } = useMigrations(db, migrations);

  useEffect(() => {
    async function setupDatabase() {
      if (dbLoaded) {
        try {
          if (__DEV__) {
            await seedDatabase();
            const result = await db.select().from(receipts).limit(1);
            console.log(
              "First receipt in database:",
              JSON.stringify(result[0], null, 2),
            );
          }
          setDbReady(true);
        } catch (error) {
          console.error("Database setup failed:", error);
        }
      }
    }

    setupDatabase();
  }, [dbLoaded]);

  return { dbReady, dbError };
}
