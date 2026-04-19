import { mockDb } from "../mockDb";
import { Receipt, ReceiptItem } from "../schema";

export function getReceiptById(id: string): Receipt | undefined {
  return mockDb.receipts.find((receipt) => receipt.id === id);
}

export function getReceiptItems(receiptId: string): ReceiptItem[] {
  return mockDb.items.filter((item) => item.receiptId === receiptId);
}

export interface FetchReceiptsParams {
  categoryId?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export function getFilteredReceipts({
  categoryId,
  searchQuery,
  limit,
  offset = 0,
}: FetchReceiptsParams): Receipt[] {
  let filtered = [...mockDb.receipts];

  if (categoryId && categoryId !== "all") {
    filtered = filtered.filter((r) => r.categoryId === categoryId);
  }

  if (searchQuery && searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((r) => {
      const inMerchant = r.merchant.toLowerCase().includes(query);
      const inAddress = r.address?.toLowerCase().includes(query) ?? false;
      const inCategory = r.categoryId.toLowerCase().includes(query);
      const inAmount = r.totalAmount.toString().includes(query);

      return inMerchant || inAddress || inCategory || inAmount;
    });
  }

  filtered.sort((a, b) => b.dateTimestamp - a.dateTimestamp);

  const end = limit !== undefined ? offset + limit : undefined;
  return filtered.slice(offset, end);
}
