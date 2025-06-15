"use server";

import { db } from "@/db";
import { image, product } from "@/db/schema";
import { productInsertSchema } from "@/db/schema/product";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

export const updateProduct = async (
    values: z.infer<typeof productInsertSchema>,
    urls: string[],
    productId: number,
) => {
    const validation = productInsertSchema.safeParse(values);
    if (!validation.success) return { error: "Invalid fields" };

    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session?.user) {
        return { error: "Unauthorized or session error" };
    }

    const updatedProduct = await db
        .update(product)
        .set({
            category: values.category,
            productName: values.productName,
            delivery: values.delivery,
            description: values.description,
            price: values.price,
            dimensions: values.dimensions,
            material: values.material,
        })
        .where(eq(product.id, productId))
        .returning({ id: product.id });

    const newProduct = updatedProduct[0];
    if (!newProduct) {
        return { error: "Product not found or update failed" };
    }

    for (const imageUrl of urls) {
        await db.insert(image).values({
            imageUrl: imageUrl,
            productId: newProduct.id,
        });
    }

    redirect("/products")
};
