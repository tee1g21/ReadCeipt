import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { getReceiptsFromDateQuery } from "@/db/queries/receipts";

export function useMonthlyReceipts(startDateTimestamp: number) {
  const query = getReceiptsFromDateQuery(startDateTimestamp);
  const { data } = useLiveQuery(query);
  return data || [];
}
