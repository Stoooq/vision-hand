import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { product } from "./product";
import { user } from "./user";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const comment = pgTable("comment", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    productId: integer("product_id")
        .notNull()
        .references(() => product.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    userName: varchar("user_name", { length: 255 }).notNull(),
    content: varchar("content", { length: 1024 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const commentRelations = relations(comment, ({ one }) => ({
    product: one(product, {
        fields: [comment.productId],
        references: [product.id],
    }),
    user: one(user, {
        fields: [comment.userId],
        references: [user.id],
    }),
}));

export const commentInsertSchema = createInsertSchema(comment);
export type CommentInsertType = z.infer<typeof commentInsertSchema>;

export const commentSelectSchema = createSelectSchema(comment);
export type CommentSelectType = z.infer<typeof commentSelectSchema>;