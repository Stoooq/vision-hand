import ProductDetails from "@/components/product-details";
import { createClient } from "@/utils/supabase/server";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const productId = parseInt((await params).id, 10)

	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<>
			<ProductDetails productId={productId} user={user} />
		</>
	);
}
