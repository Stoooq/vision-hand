import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const product = pgTable("product", {
	category: varchar({ length: 255 }).notNull(),
	productName: varchar({ length: 255 }).notNull(),
	delivery: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	price: integer().notNull(),
  dimensions: varchar({ length: 255 }).notNull(),
	material: varchar({ length: 255 }).notNull(),
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
