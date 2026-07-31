import { useState } from "react";
import * as Crypto from "expo-crypto";
import { File, Directory, Paths } from "expo-file-system";
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

  const scanReceipt = async (capturedImage: {
    uri: string;
    base64?: string;
  }): Promise<{ receiptId: string } | null> => {
    setIsLoading(true);
    setError(null);

    const receiptId = Crypto.randomUUID();
    let permanentImageUri: string | null = null;

    try {
      console.log("[Scan] Starting receipt scan...");

      // Ensure base64 is available
      if (!capturedImage.base64) {
        throw new Error("Image base64 data is missing");
      }
      console.log(
        "[Scan] Base64 available, size:",
        capturedImage.base64.length,
      );

      // Step 1: Move image to permanent storage
      console.log("[Scan] Creating receipts directory...");
      const receiptsDir = new Directory(Paths.document, "receipts");
      if (!receiptsDir.exists) {
        receiptsDir.create();
      }
      console.log("[Scan] Directory ready:", receiptsDir.uri);

      console.log("[Scan] Moving image to permanent storage...");
      const sourceFile = new File(capturedImage.uri);
      const destFile = new File(receiptsDir, `${receiptId}.jpg`);
      await sourceFile.move(destFile);
      permanentImageUri = destFile.uri;
      console.log("[Scan] Image moved to:", permanentImageUri);

      // Step 2: Call API
      console.log("[Scan] Calling API...");
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;

      if (!apiUrl || !apiKey) {
        throw new Error("API configuration missing");
      }
      console.log("[Scan] API URL:", apiUrl);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 30 second timeout

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          image: capturedImage.base64,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("[Scan] API Response status:", response.status);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const apiError = errorData.error || `API error: ${response.status}`;

        if (__DEV__) {
          console.error("API Error:", apiError);
        }
        throw new Error(apiError);
      }

      console.log("[Scan] Parsing API response...");
      const apiResponse: ScanReceiptResponse = await response.json();
      console.log("[Scan] API response success:", apiResponse.success);

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
        id: Crypto.randomUUID(),
        receiptId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      }));

      // Step 4: Insert into database
      console.log("[Scan] Inserting into database...");
      await insertReceipt(receipt, items);
      console.log("[Scan] Database insert complete!");

      setIsLoading(false);
      console.log("[Scan] Success! Receipt ID:", receiptId);
      return { receiptId };
    } catch (err) {
      // Clean up image file on error
      if (permanentImageUri) {
        try {
          const file = new File(permanentImageUri);
          file.delete();
        } catch {
          // Ignore cleanup errors
        }
      }

      const errorMessage =
        err instanceof Error ? err.message : "Failed to process receipt";
      setError(errorMessage);
      setIsLoading(false);

      // if (__DEV__) {
      //   console.error("Scan receipt error:", err);
      // }

      return null;
    }
  };

  return { scanReceipt, isLoading, error };
}
