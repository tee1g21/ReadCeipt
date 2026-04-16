import { Platform } from "react-native";
import { count } from "drizzle-orm";
import { receipts, receiptItems } from "./schema";
import { db } from "./client";
import { generateFakerData } from "@/utils/generateFakerData";

export async function seedDatabase() {
  if (Platform.OS === "web") return;

  try {
    const result = await db.select({ value: count() }).from(receipts);
    if (result[0].value > 0) {
      console.log("Mobile Database already contains data. Skipping seed.");
      return;
    }

    console.log("Seeding Mobile Database with dummy data...");

    const { receipts: newReceipts, items: newItems } = generateFakerData(50);

    await db.transaction(async (tx) => {
      await tx.insert(receipts).values(newReceipts);
      await tx.insert(receiptItems).values(newItems);
    });

    console.log(
      `Successfully seeded ${newReceipts.length} receipts on Mobile!`,
    );
  } catch (error) {
    console.error(" Seeding failed:", error);
  }
}
