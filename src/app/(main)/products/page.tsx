import Pagination from "./_components/pagination";
// import Image from "next/image";
import ProductList from "./_components/product-list";
import { getQueryClient } from "@/lib/get-query-client";
import { getAllProducts } from "@/actions/product";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function ProductsPage() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["products"],
		queryFn: () => getAllProducts(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="w-full bg-[#f8f8f8] pb-8">
				{/* <Image
					src="/Handmade.jpg"
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-auto max-h-96 object-cover mb-8"
					alt="handmade image"
				/> */}

				<div className="max-w-6xl mx-auto">
					<div className="mt-8">
						{/* <Filters /> */}
					</div>
					<ProductList />
					<div className="mt-8">
						<div className="flex justify-center gap-8">
							<Pagination pages={["1", "2", "3", "4", "5"]} activePage="1" />
						</div>
					</div>
				</div>
			</div>
		</HydrationBoundary>
	);
}
