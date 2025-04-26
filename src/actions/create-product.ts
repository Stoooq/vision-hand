"use server";

import { db } from "@/db";
import { image, product } from "@/db/schema";
import { productInsertSchema } from "@/db/schema/product";
import { z } from "zod";

export const createProduct = async (
	values: z.infer<typeof productInsertSchema>,
	urls: string[]
) => {
	const validation = productInsertSchema.safeParse(values);

	if (!validation.success) return { error: "Invalid fields" };

	const [newProduct] = await db
		.insert(product)
		.values({
			userId: 1,
			category: values.category,
			productName: values.productName,
			delivery: values.delivery,
			description: values.description,
			price: values.price,
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
