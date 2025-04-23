"use server";

import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteProduct = async (productId: number) => {
    await db.update(product).set({ isDeleted: true }).where(eq(product.id, productId));

    return { success: "Product Deleted" };
};
