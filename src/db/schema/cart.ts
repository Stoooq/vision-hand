import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { cartItem } from "./cartItem";

export const cart = pgTable("cart", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" })
        .unique(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const cartRelations = relations(cart, ({ one, many }) => ({
    user: one(user, {
        fields: [cart.userId],
        references: [user.id],
    }),
    items: many(cartItem),
}));