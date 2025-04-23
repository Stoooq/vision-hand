// import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
// import { product } from "./product";
// import { relations } from "drizzle-orm";

// export const category = pgTable("category", {
//     id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
//     name: varchar("name", { length: 255 }).notNull().unique(),
// });

// export const categoryRelations = relations(category, ({ many }) => ({
//     products: many(product),
// }));