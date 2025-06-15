import ProductDetails from "@/components/product-details";
import { db } from "@/db";
import { createClient } from "@/utils/supabase/server";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const productId = parseInt((await params).id, 10)

	const product = await db.query.product.findFirst({
		where: (product, { eq }) => eq(product.id, productId),
		with: {
			image: true,
			comments: true,
		},
	})

	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!product) {
		return <div>No product found</div>;
	}

	if (!user) {
		return <div>Please log in to view product details</div>;
	}

	return (
		<>
			<ProductDetails product={product} productId={productId} user={user} />
		</>
	);
}
