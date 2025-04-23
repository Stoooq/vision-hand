import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
// import { user } from "./user";
// import { category } from "./category";
import { image } from "./image";
// import { cartItem } from "./cartItem";
import { createInsertSchema } from 'drizzle-zod';
import { z } from "zod";

// export const product = pgTable("product", {
//     id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
//     productName: varchar("product_name", { length: 255 }).notNull(),
//     delivery: varchar("delivery", { length: 255 }).notNull(),
//     description: varchar("description", { length: 255 }).notNull(),
//     price: integer("price").notNull(),
//     dimensions: varchar("dimensions", { length: 255 }).notNull(),
//     material: varchar("material", { length: 255 }).notNull(),
//     createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
//     userId: integer("user_id")
//         .notNull()
//         .references(() => user.id, { onDelete: "cascade" }),
//     categoryId: integer("category_id")
//         .notNull()
//         .references(() => category.id, { onDelete: "set null" }),
// });

// export const productRelations = relations(product, ({ one, many }) => ({
//     user: one(user, {
//         fields: [product.userId],
//         references: [user.id],
//     }),
//     category: one(category, {
//         fields: [product.categoryId],
//         references: [category.id],
//     }),
//     images: many(image),
//     cartItems: many(cartItem),
// }));

export const product = pgTable("product", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	productName: varchar("product_name", { length: 255 }).notNull(),
	delivery: varchar("delivery", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	price: integer("price").notNull(),
	dimensions: varchar("dimensions", { length: 255 }).notNull(),
	material: varchar("material", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const productRelations = relations(product, ({ many }) => ({
	image: many(image),
}));

const productInsertSchema = createInsertSchema(product);
export type ProductSchema = z.infer<typeof productInsertSchema>;