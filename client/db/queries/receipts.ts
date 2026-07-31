import { eq, desc, like, and, or, sql, gte } from "drizzle-orm";
import { db } from "../client";
import { receipts, receiptItems, Receipt } from "../schema";

export function getReceiptsFromDateQuery(dateTimestamp: number) {
  return db
    .select({
      totalAmount: receipts.totalAmount,
      dateTimestamp: receipts.dateTimestamp,
    })
    .from(receipts)
    .where(gte(receipts.dateTimestamp, dateTimestamp));
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
  const filters = [];

  if (categoryId && categoryId !== "all") {
    filters.push(eq(receipts.categoryId, categoryId));
  }

  if (searchQuery && searchQuery.trim() !== "") {
    const query = `%${searchQuery}%`;
    filters.push(
      or(
        like(receipts.merchant, query),
        like(receipts.address, query),
        like(receipts.categoryId, query),
        like(sql`CAST(${receipts.totalAmount} AS TEXT)`, query),
      ),
    );
  }

  const filteredReceipts = db
    .select()
    .from(receipts)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .orderBy(desc(receipts.dateTimestamp))
    .offset(offset);

  if (limit) {
    return filteredReceipts.limit(limit).all();
  }

  return filteredReceipts.all();
}

export async function deleteReceipt(receiptId: string) {
  try {
    await db.delete(receipts).where(eq(receipts.id, receiptId));
    console.log("Receipt deleted:", receiptId);
  } catch (error) {
    console.error("Failed to delete receipt:", error);
  }
}

export async function markReceiptAsViewed(receiptId: string) {
  try {
    await db
      .update(receipts)
      .set({ viewedAtTimestamp: Date.now() })
      .where(eq(receipts.id, receiptId));
    console.log("Receipt marked as viewed:", receiptId);
  } catch (error) {
    console.error("Failed to mark receipt as viewed:", error);
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
  receipt: ReceiptInsertData,
  items: ReceiptItemInsertData[],
): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.insert(receipts).values(receipt);
    if (items.length > 0) {
      await tx.insert(receiptItems).values(items);
    }
  });
}
