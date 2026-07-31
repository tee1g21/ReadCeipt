import { mockDb } from "../mockDb";
import { Receipt } from "../schema";

export function getReceiptsFromDate(dateTimestamp: number) {
  return mockDb.receipts
    .filter((r) => (r.dateTimestamp ?? 0) >= dateTimestamp)
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
      const inMerchant = r.merchant?.toLowerCase().includes(query) ?? false;
      const inAddress = r.address?.toLowerCase().includes(query) ?? false;
      const inCategory = r.categoryId.toLowerCase().includes(query);
      const inAmount = r.totalAmount.toString().includes(query);

      return inMerchant || inAddress || inCategory || inAmount;
    });
  }

  filtered.sort((a, b) => (b.dateTimestamp ?? 0) - (a.dateTimestamp ?? 0));

  const end = limit !== undefined ? offset + limit : undefined;
  return filtered.slice(offset, end);
}

export async function deleteReceipt(receiptId: string): Promise<void> {
  const index = mockDb.receipts.findIndex((r) => r.id === receiptId);
  if (index !== -1) {
    mockDb.receipts.splice(index, 1);
  }
}

export async function markReceiptAsViewed(receiptId: string): Promise<void> {
  const receipt = mockDb.receipts.find((r) => r.id === receiptId);
  if (receipt) {
    receipt.viewedAtTimestamp = Date.now();
  }
}

export interface ReceiptInsertData {
  id: string;
  merchant: string | null;
  address: string | null;
  dateTimestamp: number | null;
  categoryId: string;
  subtotal: number;
  discounts: number;
  totalAmount: number;
  imageUri: string;
}

export interface ReceiptItemInsertData {
  id: string;
  receiptId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export async function insertReceipt(
  _receipt: ReceiptInsertData,
  _items: ReceiptItemInsertData[],
): Promise<void> {
  // Web demo uses mock data only, scanning is not available
}
