import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({ url: ":memory:" });
export const db = drizzle(client);
