import { db } from "@/db/client";
import { receipts } from "@/db/schema";
import { sum, count, desc, between, isNotNull } from "drizzle-orm";
import { startOfMonth, endOfMonth } from "date-fns";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";

export function useDashboardStats() {
  const [stats, setStats] = useState(() => calculateStats());

  function calculateStats() {
    const now = new Date();
    const monthStart = startOfMonth(now).getTime();
    const monthEnd = endOfMonth(now).getTime();

    const spendResult = db
      .select({ totalSpend: sum(receipts.totalAmount) })
      .from(receipts)
      .where(between(receipts.dateTimestamp, monthStart, monthEnd))
      .get();

    const scannedResult = db
      .select({ totalScanned: count(receipts.id) })
      .from(receipts)
      .get();

    const topCategoryResult = db
      .select({ categoryId: receipts.categoryId })
      .from(receipts)
      .groupBy(receipts.categoryId)
      .orderBy(desc(count(receipts.id)))
      .limit(1)
      .get();

    const recentActivity = db
      .select()
      .from(receipts)
      .where(isNotNull(receipts.viewedAtTimestamp))
      .orderBy(desc(receipts.viewedAtTimestamp))
      .limit(3)
      .all();

    return {
      currentMonthSpend: Number(spendResult?.totalSpend) || 0,
      totalScanned: scannedResult?.totalScanned || 0,
      topCategoryId: topCategoryResult?.categoryId || null,
      recentActivity: recentActivity || [],
    };
  }

  useFocusEffect(
    useCallback(() => {
      setStats(calculateStats());
    }, []),
  );

  return stats;
}
