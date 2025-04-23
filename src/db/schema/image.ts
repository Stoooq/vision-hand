import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { product } from "./product";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const image = pgTable("image", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    productId: integer("product_id").notNull(),
});

export const imageRelations = relations(image, ({ one }) => ({
    product: one(product, {
        fields: [image.productId],
        references: [product.id],
    }),
}));

const imageInsertSchema = createInsertSchema(image);
export type ImageSchema = z.infer<typeof imageInsertSchema>;