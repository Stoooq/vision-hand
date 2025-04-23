"only server";

import { db } from "@/db";

export const getAllProducts = async () => {
	try {
		const products = await db.query.product.findMany({
			with: {
				image: true,
			},
		});
		return products;
	} catch {
		return null;
	}
};

export const getProductById = async (id: string) => {
	try {
		const productId = parseInt(id, 10);
		const product = await db.query.product.findFirst({
			where: (product, { eq }) => eq(product.id, productId),
			with: {
				image: true,
			},
		});
		return product;
	} catch {
		return null;
	}
};
