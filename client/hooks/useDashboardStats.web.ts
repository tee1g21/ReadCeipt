import { useMemo } from "react";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { mockDb } from "@/db/mockDb";

export function useDashboardStats() {
  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    let currentMonthSpend = 0;
    const categoryCounts: Record<string, number> = {};

    mockDb.receipts.forEach((receipt) => {
      if (
        isWithinInterval(new Date(receipt.dateTimestamp), {
          start: monthStart,
          end: monthEnd,
        })
      ) {
        currentMonthSpend += receipt.totalAmount;
      }

      categoryCounts[receipt.categoryId] =
        (categoryCounts[receipt.categoryId] || 0) + 1;
    });

    let topCategoryId: string | null = null;
    let maxCount = 0;
    for (const [category, count] of Object.entries(categoryCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topCategoryId = category;
      }
    }

    return {
      currentMonthSpend,
      totalScanned: mockDb.receipts.length,
      topCategoryId,
    };
  }, []);

  return stats;
}
