import { create } from "zustand";

export type ReceiptId = string | number;

export interface Receipt {
  id: ReceiptId;
  storeName?: string;
  total?: number;
  date?: string;
  [key: string]: unknown;
}

interface ReceiptStore {
  receipts: Receipt[];
  isProcessing: boolean;
  setProcessing: (status: boolean) => void;
  addReceipt: (newReceipt: Receipt) => void;
  deleteReceipt: (id: ReceiptId) => void;
  clearAll: () => void;
}

export const useReceiptStore = create<ReceiptStore>((set) => ({
  // 1. The State (The Data)
  receipts: [],
  isProcessing: false,

  // 2. The Actions (Functions to change the data)

  // Call this when your Python backend starts processing the image
  setProcessing: (status) => set({ isProcessing: status }),

  // Call this when Gemini returns the clean JSON data
  addReceipt: (newReceipt) =>
    set((state) => ({
      // This takes the existing receipts array and adds the new one to the front
      receipts: [newReceipt, ...state.receipts],
    })),

  // Call this if the user wants to delete a scanned receipt
  deleteReceipt: (id) =>
    set((state) => ({
      receipts: state.receipts.filter((receipt) => receipt.id !== id),
    })),

  // Optional: A quick function to clear everything during testing
  clearAll: () => set({ receipts: [] }),
}));
