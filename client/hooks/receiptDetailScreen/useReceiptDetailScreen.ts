import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { Receipt, receipts, ReceiptItem, receiptItems } from "@/db/schema";

export function useReceiptDetailScreen(receiptId: string): {
  receipt: Receipt | undefined;
  items: ReceiptItem[];
} {
  const { data: receiptData } = useLiveQuery(
    db.select().from(receipts).where(eq(receipts.id, receiptId)).limit(1),
  );

  const { data: itemsData } = useLiveQuery(
    db.select().from(receiptItems).where(eq(receiptItems.receiptId, receiptId)),
  );

  return { receipt: receiptData?.[0], items: itemsData || [] };
}
