import { generateFakerData } from "@/utils/generateFakerData";

const { receipts, items } = generateFakerData(50);

export const mockDb = {
  receipts,
  items,
};
