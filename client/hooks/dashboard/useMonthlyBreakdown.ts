import { useMemo } from "react";
import { startOfMonth, subMonths, format } from "date-fns";
import { useMonthlyReceipts } from "./useMonthlyReceipts";

export interface MonthData {
  label: string;
  amount: number;
}

export function useMonthlyBreakdown() {
  const startDate = useMemo(() => startOfMonth(subMonths(new Date(), 6)), []);
  const rawReceipts = useMonthlyReceipts(startDate.getTime());

  return useMemo(() => {
    const now = new Date();
    // Generate the last 7 months labels
    const lastSevenMonths = Array.from({ length: 7 }, (_, i) => {
      const date = subMonths(now, 6 - i);
      return {
        date,
        label: format(date, "MMM"),
        amount: 0,
      };
    });

    // Aggregate totals into the months
    rawReceipts.forEach((receipt) => {
      const receiptDate = new Date(receipt.dateTimestamp);
      const monthIndex = lastSevenMonths.findIndex((m) => {
        return (
          receiptDate.getMonth() === m.date.getMonth() &&
          receiptDate.getFullYear() === m.date.getFullYear()
        );
      });

      if (monthIndex !== -1) {
        lastSevenMonths[monthIndex].amount += receipt.totalAmount;
      }
    });

    const startYear = format(lastSevenMonths[0].date, "yyyy");
    const endYear = format(now, "yyyy");
    const chartYear =
      startYear === endYear ? startYear : `${startYear}–${endYear}`;

    return {
      monthlyBreakdown: lastSevenMonths.map(({ label, amount }) => ({
        label,
        amount,
      })),
      chartYear,
    };
  }, [rawReceipts]);
}
