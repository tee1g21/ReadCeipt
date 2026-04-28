import { z } from "zod";

const baseReceiptSchema = z.object({
  merchant: z
    .string()
    .nullable()
    .describe("Store or restaurant name. Null if missing."),
  address: z
    .string()
    .nullable()
    .describe("Physical address of merchant. Null if missing."),
  date: z
    .string()
    .nullable()
    .describe(
      "Date of purchase in YYYY-MM-DD format. MUST be null if not explicitly printed.",
    ),
  time: z
    .string()
    .nullable()
    .describe(
      "Time of purchase in HH:MM format (24-hour). MUST be null if not explicitly printed.",
    ),
  categoryId: z
    .enum([
      "groceries",
      "dining",
      "retail",
      "utilities",
      "health",
      "entertainment",
      "education",
      "travel",
      "other",
    ])
    .describe("Categorize the overall receipt"),
  subtotal: z
    .number()
    .nullable()
    .describe(
      "Total before tax and discounts. MUST be null if not explicitly printed.",
    ),
  discounts: z
    .number()
    .nullable()
    .describe(
      'Sum of all applied discounts. Infer this from negative line items or "savings" text. Return as a positive absolute number. Null if no discounts exist.',
    ),
  tax: z
    .number()
    .nullable()
    .describe("Explicitly printed tax or VAT amount. MUST be null if missing."),
  vatNumber: z
    .string()
    .nullable()
    .describe(
      "The Merchant's VAT/Tax registration number if printed. MUST be null if missing.",
    ),
  totalAmount: z
    .number()
    .nullable()
    .describe("The final total paid. MUST be null if not explicitly printed."),
  items: z
    .array(
      z.object({
        name: z.string().describe("Name of the item"),
        quantity: z.number().describe("Total quantity purchased"),
        unitPrice: z.number().describe("Price per single unit"),
        totalPrice: z
          .number()
          .describe("Total price for this line item (quantity * unitPrice)"),
      }),
    )
    .describe(
      "List of items. Identical items must be grouped together. DO NOT include discounts in this array.",
    ),
});

export const receiptSchema = baseReceiptSchema.transform((data) => {
  const calculatedItemsSum = data.items.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );

  const safeDiscounts = data.discounts || 0;
  const safeTax = data.tax || 0;

  const finalSubtotal =
    data.subtotal !== null ? data.subtotal : calculatedItemsSum;

  let finalTotal = data.totalAmount;
  if (finalTotal === null) {
    finalTotal = finalSubtotal - safeDiscounts + safeTax;
  }

  const mathIsPerfect =
    finalSubtotal === calculatedItemsSum &&
    finalTotal === finalSubtotal - safeDiscounts + safeTax;

  return {
    ...data,
    subtotal: Number(finalSubtotal.toFixed(2)),
    discounts: Number(safeDiscounts.toFixed(2)),
    tax: Number(safeTax.toFixed(2)),
    totalAmount: Number(finalTotal.toFixed(2)),
    _meta: {
      isMathVerified: mathIsPerfect,
      calculatedItemsSum: Number(calculatedItemsSum.toFixed(2)),
    },
  };
});
