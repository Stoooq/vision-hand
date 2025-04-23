// import { integer, pgTable } from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";
// import { cart } from "./cart";
// import { product } from "./product";

// export const cartItem = pgTable("cart_item", {
//     id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
//     cartId: integer("cart_id")
//         .notNull()
//         .references(() => cart.id, { onDelete: "cascade" }),
//     productId: integer("product_id")
//         .notNull()
//         .references(() => product.id, { onDelete: "cascade" }),
//     quantity: integer("quantity").notNull().default(1),
// });

// export const cartItemRelations = relations(cartItem, ({ one }) => ({
//     cart: one(cart, {
//         fields: [cartItem.cartId],
//         references: [cart.id],
//     }),
//     product: one(product, {
//         fields: [cartItem.productId],
//         references: [product.id],
//     }),
// }));