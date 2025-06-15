"use server";

import { db } from "@/db";
import { GetProductFilters } from "@/state/productStore";

export const getAllProducts = async (filters?: GetProductFilters) => {
	let orderBy;

	if (filters?.sort === "from expensive to cheap") {
		orderBy = (product, { desc }) => [desc(parseInt(product.price))];
	} else if (filters?.sort === "from cheap to expensive") {
		orderBy = (product, { asc }) => [asc(parseInt(product.price))];
	} else {
		orderBy = (product, { desc }) => [desc(product.createdAt)];
	}

	const products = await db.query.product.findMany({
		limit: filters?.limit,
		orderBy,
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
