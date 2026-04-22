import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { mockDb } from "@/db/mockDb";

export function useDashboardStats() {
  const [stats, setStats] = useState(() => calculateStats());

  function calculateStats() {
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

    const recentActivity = [...mockDb.receipts]
      .filter((r) => r.viewedAtTimestamp !== null)
      .sort((a, b) => (b.viewedAtTimestamp || 0) - (a.viewedAtTimestamp || 0))
      .slice(0, 3);

    return {
      currentMonthSpend,
      totalScanned: mockDb.receipts.length,
      topCategoryId,
      recentActivity,
    };
  }

  useFocusEffect(
    useCallback(() => {
      setStats(calculateStats());
    }, []),
  );

  return stats;
}
