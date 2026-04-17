import { eq, desc, like, and, or, sql } from "drizzle-orm";
import { db } from "../client";
import { receipts, Receipt, receiptItems, ReceiptItem } from "../schema";

export function getReceiptById(id: string): Receipt | undefined {
  return db.select().from(receipts).where(eq(receipts.id, id)).limit(1).get();
}

export function getReceiptItems(receiptId: string): ReceiptItem[] {
  return db
    .select()
    .from(receiptItems)
    .where(eq(receiptItems.receiptId, receiptId))
    .all();
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
  limit = 30,
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

  return db
    .select()
    .from(receipts)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .orderBy(desc(receipts.dateTimestamp))
    .limit(limit)
    .offset(offset)
    .all();
}
