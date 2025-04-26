"use server";

import { db } from "@/db";
import { image, product } from "@/db/schema";
import { productInsertSchema } from "@/db/schema/product";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export const createProduct = async (
	values: z.infer<typeof productInsertSchema>,
	urls: string[]
) => {
	const validation = productInsertSchema.safeParse(values);
	if (!validation.success) return { error: "Invalid fields" };

	const supabase = await createClient();
	const { data: { session }, error } = await supabase.auth.getSession();

	if (error || !session?.user) {
		return { error: "Unauthorized or session error" };
	}

	const [newProduct] = await db
		.insert(product)
		.values({
			userId: session.user.id,
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
