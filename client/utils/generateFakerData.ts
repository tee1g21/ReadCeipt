import { faker } from "@faker-js/faker";
import { CATEGORY_LIST } from "@/context/useCategories";
import { Receipt, ReceiptItem } from "@/db/schema";

export function generateFakerData(numReceipts = 50) {
  const receipts: Receipt[] = [];
  const items: ReceiptItem[] = [];

  for (let i = 0; i < numReceipts; i++) {
    const receiptId = faker.string.uuid();
    const numItems = faker.number.int({ min: 1, max: 10 });
    let calculatedSubtotal = 0;

    for (let j = 0; j < numItems; j++) {
      const quantity = faker.number.int({ min: 1, max: 3 });
      const unitPrice = faker.number.float({
        min: 1.5,
        max: 50.0,
        fractionDigits: 2,
      });
      const totalPrice = Number((quantity * unitPrice).toFixed(2));

      calculatedSubtotal += totalPrice;

      items.push({
        id: faker.string.uuid(),
        receiptId,
        name: faker.commerce.productName(),
        quantity,
        unitPrice,
        totalPrice,
      });
    }

    const hasDiscount =
      faker.helpers.maybe(() => true, { probability: 0.2 }) ?? false;
    const discounts = hasDiscount
      ? Number(
          faker.number
            .float({
              min: 0.5,
              max: calculatedSubtotal * 0.1,
              fractionDigits: 2,
            })
            .toFixed(2),
        )
      : 0;

    const totalAmount = Number((calculatedSubtotal - discounts).toFixed(2));
    const now = new Date().toISOString();

    receipts.push({
      id: receiptId,
      merchant: faker.company.name(),
      address: faker.location.streetAddress(),
      dateTimestamp: faker.date.recent({ days: 180 }).getTime(),
      categoryId: faker.helpers.arrayElement(CATEGORY_LIST.map((c) => c.id)),
      subtotal: Number(calculatedSubtotal.toFixed(2)),
      discounts,
      totalAmount,
      imageUri: `https://picsum.photos/seed/${receiptId}/400/600`,
      createdAt: now,
      updatedAt: now,
    });
  }

  return { receipts, items };
}
