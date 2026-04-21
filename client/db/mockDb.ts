import { generateFakerData } from "@/utils/generateFakerData";
import { Receipt, ReceiptItem } from "./schema";

const { receipts, items } = generateFakerData();

export const mockDb: { receipts: Receipt[]; items: ReceiptItem[] } = {
  receipts,
  items,
};
