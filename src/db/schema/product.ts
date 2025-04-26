import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { image } from "./image";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { AllCategories } from "@/lib/const";
import { user } from "./user";
import { cartItem } from "./cartItem";

export const categoryEnum = pgEnum("category_enum", AllCategories);

export const product = pgTable("product", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	userId: uuid("user_id"),
	category: categoryEnum().notNull(),
	productName: varchar("product_name", { length: 255 }).notNull(),
	delivery: varchar("delivery", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	price: varchar("price").notNull(),
	dimensions: varchar("dimensions", { length: 255 }).notNull(),
	material: varchar("material", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
	isDeleted: boolean("is_deleted").notNull().default(false),
});

export const productRelations = relations(product, ({ one, many }) => ({
	user: one(user, {
		fields: [product.userId],
		references: [user.id],
	}),
	image: many(image),
	cartItems: many(cartItem),
}));

export const productInsertSchema = createInsertSchema(product, {
	category: z.enum(AllCategories, {
		required_error: "Select category.",
		invalid_type_error: "Invalid category selected.",
	}),
	productName: (schema) =>
		schema
			.min(5, { message: "Product name must be at least 5 characters." })
			.max(20, { message: "Product name must be less than 20 characters." }),
	delivery: (schema) =>
		schema
			.min(1, { message: "Delivery is required." })
			.refine((val) => parseFloat(val) <= 1000, {
				message: "Delivery must be less than 20 days.",
			}),
	description: (schema) =>
		schema
			.min(10, { message: "Description must be at least 10 characters." })
			.max(100, { message: "Description must be less than 100 characters." }),
	price: (schema) =>
		schema
			.min(1, { message: "Price is required." })
			.refine((val) => !isNaN(parseFloat(val)) && isFinite(Number(val)), {
				message: "Price must be a valid number.",
			})
			.refine((val) => parseFloat(val) > 0, {
				message: "Price must be a positive number.",
			})
			.refine((val) => parseFloat(val) <= 1000, {
				message: "Price must be less than or equal to 1000.",
			}),
	dimensions: (schema) =>
		schema.min(1, { message: "Dimesions are required." }).max(255),
	material: (schema) =>
		schema.min(1, { message: "Material is required." }).max(255),
});
export type ProductInsertType = z.infer<typeof productInsertSchema>;

export const productSelectSchema = createSelectSchema(product);
export type ProductSelectType = z.infer<typeof productSelectSchema>;
