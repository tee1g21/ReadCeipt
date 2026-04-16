import { mockDb } from "@/db/mockDb";
import { useEffect } from "react";

export function useInitializeDatabase() {
  useEffect(() => {
    if (__DEV__) {
      if (mockDb.receipts.length > 0) {
        console.log(
          "First receipt in mock database:",
          JSON.stringify(mockDb.receipts[0], null, 2),
        );
      }
    }
  }, []);

  return { dbReady: true, dbError: null };
}
