// import { relations } from "drizzle-orm";
// import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
// import { product } from "./product";
// import { cart } from "./cart";

// export const user = pgTable("user", {
//     id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
//     name: varchar("name", { length: 255 }).notNull(),
//     email: varchar("email", { length: 255 }).notNull().unique(),
//     password: varchar("password", { length: 255 }).notNull(),
//     // Consider adding role enum if needed: role: userRoleEnum("role").default('buyer').notNull(),
//     createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
// });

// export const userRelations = relations(user, ({ many, one }) => ({
//     products: many(product),
//     cart: one(cart, {
//         fields: [user.id],
//         references: [cart.userId],
//     }),
// }));