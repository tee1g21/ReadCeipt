import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db/client";
import { receipts } from "@/db/schema";
import { sum, count, desc, between } from "drizzle-orm";
import { startOfMonth, endOfMonth } from "date-fns";

export function useDashboardStats() {
  const now = new Date();
  const monthStart = startOfMonth(now).getTime();
  const monthEnd = endOfMonth(now).getTime();

  const { data: currentMonthSpendData } = useLiveQuery(
    db
      .select({
        totalSpend: sum(receipts.totalAmount),
      })
      .from(receipts)
      .where(between(receipts.dateTimestamp, monthStart, monthEnd)),
  );

  const { data: totalScannedData } = useLiveQuery(
    db.select({ totalScanned: count(receipts.id) }).from(receipts),
  );

  const { data: topCategoryData } = useLiveQuery(
    db
      .select({ categoryId: receipts.categoryId })
      .from(receipts)
      .groupBy(receipts.categoryId)
      .orderBy(desc(count(receipts.id)))
      .limit(1),
  );

  return {
    currentMonthSpend: Number(currentMonthSpendData?.[0]?.totalSpend) || 0,
    totalScanned: totalScannedData?.[0]?.totalScanned || 0,
    topCategoryId: topCategoryData?.[0]?.categoryId || null,
  };
}
