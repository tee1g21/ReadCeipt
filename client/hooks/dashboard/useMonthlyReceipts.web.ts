import { useMemo } from "react";
import { getReceiptsFromDate } from "@/db/queries/receipts.web";

export function useMonthlyReceipts(startDateTimestamp: number) {
  return useMemo(() => {
    return getReceiptsFromDate(startDateTimestamp);
  }, [startDateTimestamp]);
}
