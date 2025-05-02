"use client";

import { getAllProducts } from "@/actions/product";
import { Product } from "@/components/product";
import { useQuery } from "@tanstack/react-query";

export default function ProductList() {
	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8">
			{products?.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</div>
	);
}
