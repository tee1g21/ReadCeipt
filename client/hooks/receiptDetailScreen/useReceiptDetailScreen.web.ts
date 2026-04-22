import { useMemo } from "react";
import { mockDb } from "@/db/mockDb";
import { Receipt, ReceiptItem } from "@/db/schema";

export function useReceiptDetailScreen(receiptId: string): {
  receipt: Receipt | undefined;
  items: ReceiptItem[];
} {
  return useMemo(() => {
    const receipt = mockDb.receipts.find((r) => r.id === receiptId);
    const items = mockDb.items.filter((item) => item.receiptId === receiptId);

    return { receipt, items };
  }, [receiptId]);
}
