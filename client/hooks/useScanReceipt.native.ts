import { useState } from "react";
import * as FileSystem from "expo-file-system";
import {
  insertReceipt,
  ReceiptInsertData,
  ReceiptItemInsertData,
} from "@/db/queries/receipts";
import { parseDateTimeToTimestamp } from "@/lib/formatDate";

interface ScanReceiptResponse {
  success: boolean;
  data: {
    merchant: string | null;
    address: string | null;
    date: string | null;
    time: string | null;
    categoryId: string;
    subtotal: number;
    discounts: number;
    totalAmount: number;
    items: {
      name: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }[];
  };
}

export function useScanReceipt() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scanReceipt = async (
    receiptId: string,
    capturedImage: { uri: string; base64?: string },
  ): Promise<{ receiptId: string } | null> => {
    setIsLoading(true);
    setError(null);

    let permanentImageUri: string | null = null;

    try {
      // Ensure base64 is available
      if (!capturedImage.base64) {
        throw new Error("Image base64 data is missing");
      }

      // Step 1: Move image to permanent storage
      const docsDir = (FileSystem as unknown as { documentDirectory: string })
        .documentDirectory;
      const receiptDir = `${docsDir}receipts/`;
      await FileSystem.makeDirectoryAsync(receiptDir, { intermediates: true });
      permanentImageUri = `${receiptDir}${receiptId}.jpg`;
      await FileSystem.moveAsync({
        from: capturedImage.uri,
        to: permanentImageUri,
      });

      // Step 2: Call API
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;

      if (!apiUrl || !apiKey) {
        throw new Error("API configuration missing");
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          image: `data:image/jpeg;base64,${capturedImage.base64}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const apiError = errorData.error || `API error: ${response.status}`;

        if (__DEV__) {
          console.error("API Error:", apiError);
        }
        throw new Error("Failed to process receipt");
      }

      const apiResponse: ScanReceiptResponse = await response.json();

      if (!apiResponse.success || !apiResponse.data) {
        if (__DEV__) {
          console.error("Invalid API response:", apiResponse);
        }
        throw new Error("Failed to process receipt");
      }

      // Step 3: Parse API response and prepare DB insert
      const receiptData = apiResponse.data;
      const dateTimestamp = parseDateTimeToTimestamp(
        receiptData.date,
        receiptData.time,
      );

      const receipt: ReceiptInsertData = {
        id: receiptId,
        merchant: receiptData.merchant,
        address: receiptData.address,
        dateTimestamp,
        categoryId: receiptData.categoryId,
        subtotal: receiptData.subtotal,
        discounts: receiptData.discounts,
        totalAmount: receiptData.totalAmount,
        imageUri: permanentImageUri,
      };

      const items: ReceiptItemInsertData[] = receiptData.items.map((item) => ({
        id: crypto.randomUUID(),
        receiptId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      }));

      // Step 4: Insert into database
      await insertReceipt(receipt, items);

      setIsLoading(false);
      return { receiptId };
    } catch (err) {
      // Clean up image file on error
      if (permanentImageUri) {
        try {
          await FileSystem.deleteAsync(permanentImageUri, {
            idempotent: true,
          });
        } catch {
          // Ignore cleanup errors
        }
      }

      const errorMessage =
        err instanceof Error ? err.message : "Failed to process receipt";
      setError(errorMessage);
      setIsLoading(false);

      if (__DEV__) {
        console.error("Scan receipt error:", err);
      }

      return null;
    }
  };

  return { scanReceipt, isLoading, error };
}
