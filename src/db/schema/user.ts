import { relations } from "drizzle-orm";
import {
	pgEnum,
	pgSchema,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { product } from "./product";
import { cart } from "./cart";

const authSchema = pgSchema("auth");

export const Users = authSchema.table("users", {
	id: uuid("id").primaryKey(),
});

export const roleEnum = pgEnum("role", ["admin", "user"]);

export const user = pgTable("user", {
	id: uuid("id")
		.primaryKey()
		.references(() => Users.id, { onDelete: "set null" }),
	role: roleEnum("role").notNull().default("user"),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many, one }) => ({
	products: many(product),
	cart: one(cart, {
		fields: [user.id],
		references: [cart.userId],
	}),
}));
