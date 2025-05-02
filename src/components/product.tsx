import { ProductSelectType } from "@/db/schema/product";
import Link from "next/link";
import Image from "next/image";
import { ImageSelectType } from "@/db/schema/image";
// import { getQueryClient } from "@/lib/get-query-client";
// import { getProductById } from "@/actions/product";

export function Product({
	product,
}: {
	product: ProductSelectType & { image: ImageSelectType[] };
}) {
	// const queryClient = getQueryClient();

	return (
		<Link
			href={`/products/${product.id}`}
			className="flex flex-col overflow-hidden"
			// onMouseEnter={async () => {
			// 	await queryClient.prefetchQuery({
			// 		queryKey: ["product", product.id],
			// 		queryFn: () => getProductById(product.id),
			// 	})
			// 	console.log("prefetching product", product.id);
			// }}
		>
			<Image
				src={product.image[0].imageUrl}
				alt="Selected Image"
				width={200}
				height={200}
				className="w-full h-full aspect-square object-cover"
			/>
			<div className="flex justify-between p-2">
				<div className="text-xl">{product.productName}</div>
				<div className="flex gap-4 font-medium">{product.price} €</div>
			</div>
		</Link>
	);
}
