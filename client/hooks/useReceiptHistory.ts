import { useState, useCallback, useEffect } from "react";
import { getFilteredReceipts } from "@/db/queries/receipts";
import {
  groupReceiptsByDate,
  type ReceiptSection,
} from "@/lib/receiptGrouping";

interface UseReceiptHistoryProps {
  searchQuery: string;
  categoryId: string | undefined;
}

export function useReceiptHistory({
  searchQuery,
  categoryId,
}: UseReceiptHistoryProps) {
  const [groupedReceipts, setGroupedReceipts] = useState<ReceiptSection[]>(
    () => {
      const rawData = getFilteredReceipts({ searchQuery, categoryId });
      return groupReceiptsByDate(rawData);
    },
  );

  useEffect(() => {
    const rawData = getFilteredReceipts({ searchQuery, categoryId });
    setGroupedReceipts(groupReceiptsByDate(rawData));
  }, [searchQuery, categoryId]);

  const refreshHistory = useCallback(() => {
    const rawData = getFilteredReceipts({ searchQuery, categoryId });
    setGroupedReceipts(groupReceiptsByDate(rawData));
  }, [searchQuery, categoryId]);

  return {
    groupedReceipts,
    refreshHistory,
  };
}
