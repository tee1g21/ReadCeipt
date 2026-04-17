import { generateFakerData } from "@/utils/generateFakerData";

const { receipts, items } = generateFakerData();

export const mockDb = {
  receipts,
  items,
};
