import { useMemo } from "react";
import { startOfMonth, subMonths, format } from "date-fns";
import { useMonthlyReceipts } from "./useMonthlyReceipts";

export interface MonthData {
  label: string;
  amount: number;
}

export function useMonthlyBreakdown() {
  const currentMonthTimestamp = startOfMonth(new Date()).getTime();

  const startDate = useMemo(() => {
    const anchorDate = new Date(currentMonthTimestamp);
    return startOfMonth(subMonths(anchorDate, 6));
  }, [currentMonthTimestamp]);

  const rawReceipts = useMonthlyReceipts(startDate.getTime());

  return useMemo(() => {
    const baseDate = new Date(currentMonthTimestamp);
    const monthMap = new Map<
      string,
      { label: string; amount: number; date: Date }
    >();

    for (let i = 6; i >= 0; i--) {
      const date = subMonths(baseDate, i);
      const key = format(date, "MMM yyyy");

      monthMap.set(key, {
        label: format(date, "MMM"),
        amount: 0,
        date: date,
      });
    }

    rawReceipts.forEach((receipt) => {
      const receiptDate = new Date(receipt.dateTimestamp);
      const key = format(receiptDate, "MMM yyyy");

      const monthData = monthMap.get(key);
      if (monthData) {
        monthData.amount += receipt.totalAmount;
      }
    });

    const lastSevenMonths = Array.from(monthMap.values());

    const firstMonthWithDataIndex = lastSevenMonths.findIndex(
      (m) => m.amount > 0,
    );

    const activeMonths =
      firstMonthWithDataIndex !== -1
        ? lastSevenMonths.slice(firstMonthWithDataIndex)
        : lastSevenMonths.slice(-1);

    const startYear = format(activeMonths[0].date, "yyyy");
    const endYear = format(baseDate, "yyyy");
    const chartYear =
      startYear === endYear ? startYear : `${startYear}–${endYear}`;

    return {
      monthlyBreakdown: activeMonths.map(({ label, amount }) => ({
        label,
        amount,
      })),
      chartYear,
    };
  }, [rawReceipts, currentMonthTimestamp]);
}
