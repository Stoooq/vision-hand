"use server";

import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteProduct = async (productId: number) => {
    const existingProduct = await db.query.product.findFirst({
        where: eq(product.id, productId),
    });

    if (!existingProduct) {
        return { error: "Product not found" };
    }

    await db.update(product).set({ isDeleted: true }).where(eq(product.id, productId));

    return { success: "Product Deleted" };
};
