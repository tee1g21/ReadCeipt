import { generateFakerData } from "@/utils/generateFakerData";

const { receipts, items } = generateFakerData(50);

export const mockDb = {
  receipts,
  items,
};

export type MockReceipt = (typeof receipts)[0];
export type MockReceiptItems = (typeof items)[0];
