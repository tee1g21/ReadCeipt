import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// Receipts Table
export const receipts = sqliteTable("receipts", {
  id: text("id").primaryKey(),

  merchant: text("merchant").notNull(),
  address: text("address"),

  dateTimestamp: integer("date_timestamp").notNull(),
  categoryId: text("category_id").notNull().default("other"),

  subtotal: real("subtotal").notNull(),
  discounts: real("discounts").default(0),
  totalAmount: real("total_amount").notNull(),

  imageUri: text("image_uri"),

  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Receipt Items Table
export const receiptItems = sqliteTable("receipt_items", {
  id: text("id").primaryKey(),

  receiptId: text("receipt_id")
    .notNull()
    .references(() => receipts.id, { onDelete: "cascade" }),

  name: text("name").notNull(),

  quantity: real("quantity").notNull().default(1),
  unitPrice: real("unit_price").notNull(),
  totalPrice: real("total_price").notNull(),
});
