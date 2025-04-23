import ProductDetails from "@/components/product-details";
import { getProductById } from "@/data/product";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const productId = (await params).id;

	const product = await getProductById(productId);

	if (!product) return "Product not found";

	return (
		<>
			<ProductDetails product={product} />
		</>
	);
}
