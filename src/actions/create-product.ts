"use server";

import { db } from "@/db";
import { product } from "@/db/schema";
import { newProductSchema } from "@/schemas";
import { z } from "zod"

export const createProduct = async (values: z.infer<typeof newProductSchema>) => {
    const validation = newProductSchema.safeParse(values)

    if (!validation.success) return { error: "Invalid fields" };
    console.log(values)

    await db.insert(product).values({
        category: values.category,
        productName: values.productName,
        delivery: values.delivery,
        description: values.description,
        price: Number(values.price),
        dimensions: values.dimensions,
        material: values.material,
    })

	return { success: "Notification created" };
};
