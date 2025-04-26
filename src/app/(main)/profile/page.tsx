import { getAllProductsByUserId } from "@/data/product";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
	const supabase = await createClient();
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (error || !session?.user) {
		return <div>Unauthorized</div>;
	}

	const products = await getAllProductsByUserId(session?.user.id);

	return (
		<>
			<div className="w-full bg-[#f8f8f8] py-8">
				<div className="max-w-6xl mx-auto">
					<div className="mt-8 p-6 bg-zinc-100">
						<div className="w-[200px] h-[200px] bg-zinc-400 rounded-full" />
					</div>
					<div className="flex justify-between items-end mt-8 border-b-1 border-zinc-200">
						<div className="text-6xl">{session.user.email}</div>
						<div>Opinions: 4.7</div>
					</div>
					<div className="text-3xl mt-8">Products</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8">
						{products?.map((product) => (
							<Link
								href={`/products/${product.id}`}
								key={product.id}
								className="flex flex-col overflow-hidden"
							>
								<Image
									src={product.image[0].imageUrl}
									alt="Selected Image"
									width={200}
									height={200}
									className="w-full h-full aspect-square object-contain"
								/>
								<div className="p-2 border-1 border-gray-200 bg-white">
									<div className="font-semibold">{product.productName}</div>
									<div className="flex gap-4 text-muted-foreground">
										<div>Price: {product.price} €</div>
										<span>|</span>
										<div>Delivery: {product.delivery} days</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
