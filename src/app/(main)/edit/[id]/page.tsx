import EditProductForm from "@/components/edit-product-form";
import { db } from "@/db";

export default async function EditProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const productId = parseInt((await params).id, 10);

	const product = await db.query.product.findFirst({
		where: (product, { eq }) => eq(product.id, productId),
        with: {
			image: true,
		},
	});

    if (!product) {
        return <div>No product</div>
    }

	return <EditProductForm product={product} productId={productId} />;
}
