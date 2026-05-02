PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_receipts` (
	`id` text PRIMARY KEY NOT NULL,
	`merchant` text,
	`address` text,
	`date_timestamp` integer,
	`category_id` text DEFAULT 'other' NOT NULL,
	`subtotal` real NOT NULL,
	`discounts` real DEFAULT 0,
	`total_amount` real NOT NULL,
	`image_uri` text,
	`viewed_at_timestamp` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_receipts`("id", "merchant", "address", "date_timestamp", "category_id", "subtotal", "discounts", "total_amount", "image_uri", "viewed_at_timestamp", "created_at", "updated_at") SELECT "id", "merchant", "address", "date_timestamp", "category_id", "subtotal", "discounts", "total_amount", "image_uri", "viewed_at_timestamp", "created_at", "updated_at" FROM `receipts`;--> statement-breakpoint
DROP TABLE `receipts`;--> statement-breakpoint
ALTER TABLE `__new_receipts` RENAME TO `receipts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;