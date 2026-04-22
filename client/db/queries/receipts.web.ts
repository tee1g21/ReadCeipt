import { mockDb } from "../mockDb";
import { Receipt } from "../schema";

export function getReceiptsFromDate(dateTimestamp: number) {
  return mockDb.receipts
    .filter((r) => r.dateTimestamp >= dateTimestamp)
    .map((r) => ({
      totalAmount: r.totalAmount,
      dateTimestamp: r.dateTimestamp,
    }));
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

export async function markReceiptAsViewed(receiptId: string): Promise<void> {
  const receipt = mockDb.receipts.find((r) => r.id === receiptId);
  if (receipt) {
    receipt.viewedAtTimestamp = Date.now();
  }
}
