"only server";

import { db } from "@/db";

export const getAllProducts = async () => {
	try {
		const products = await db.query.product.findMany({
			where: (product, { eq }) => eq(product.isDeleted, false),
			with: {
				image: true,
			},
		});
		return products;
	} catch {
		return null;
	}
};

export const getAllProductsByUserId = async (userId: string) => {
	try {
		const products = await db.query.product.findMany({
			where: (product, { eq }) => eq(product.userId, userId),
			with: {
				image: true,
			},
		});
		return products;
	} catch {
		return null;
	}
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
