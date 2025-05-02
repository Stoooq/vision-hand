"use server";

import { db } from "@/db";

export const getAllProducts = async () => {
	const products = await db.query.product.findMany({
		where: (product, { eq }) => eq(product.isDeleted, false),
		with: {
			image: true,
		},
	});
	return products;
};

export const getProductById = async (id: number) => {
	try {
		const product = await db.query.product.findFirst({
			where: (product, { eq }) => eq(product.id, id),
			with: {
				image: true,
			},
		});
		return product;
	} catch {
		return null;
	}
};
