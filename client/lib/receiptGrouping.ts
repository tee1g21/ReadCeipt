import { Receipt } from "@/db/schema";
import { getSectionTitle } from "@/lib/formatDate";

export interface ReceiptSection {
  title: string;
  data: Receipt[];
}

export function groupReceiptsByDate(receipts: Receipt[]): ReceiptSection[] {
  const receiptSection: Record<string, Receipt[]> = {};

  receipts.forEach((receipt) => {
    const sectionTitle = getSectionTitle(receipt.dateTimestamp);

    if (!receiptSection[sectionTitle]) {
      receiptSection[sectionTitle] = [];
    }
    receiptSection[sectionTitle].push(receipt);
  });

  const sectionOrder = ["Today", "Yesterday", "This Week"];
  const finalSections: ReceiptSection[] = [];

  // Push predefined ranges first in specific order
  sectionOrder.forEach((title) => {
    if (receiptSection[title]) {
      finalSections.push({ title, data: receiptSection[title] });
      delete receiptSection[title];
    }
  });

  // Push the remaining months/years
  Object.keys(receiptSection).forEach((title) => {
    finalSections.push({ title, data: receiptSection[title] });
  });

  return finalSections;
}
