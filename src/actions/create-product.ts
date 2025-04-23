"use server";

import { db } from "@/db";
import { image, product } from "@/db/schema";
import { newProductSchema } from "@/schemas";
import { z } from "zod";

export const createProduct = async (
	values: z.infer<typeof newProductSchema>,
	urls: string[]
) => {
	const validation = newProductSchema.safeParse(values);

	if (!validation.success) return { error: "Invalid fields" };

	const [newProduct] = await db
		.insert(product)
		.values({
			productName: values.productName,
			delivery: values.delivery,
			description: values.description,
			price: Number(values.price),
			dimensions: values.dimensions,
			material: values.material,
		})
		.returning({ id: product.id });

	for (const imageUrl of urls) {
		await db.insert(image).values({
			imageUrl: imageUrl,
			productId: newProduct.id,
		});
	}

	return { success: "Notification created" };
};
