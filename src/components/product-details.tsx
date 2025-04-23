"use client";

import DropdownText from "@/components/dropdown-text";
import { ImageSchema } from "@/db/schema/image";
import { ProductSchema } from "@/db/schema/product";

export default function ProductPage({
	product,
}: {
	product: ProductSchema & { image: ImageSchema[] };
}) {
	return (
		<>
			<div className="max-w-7xl mx-auto px-4 md:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
					<div className="space-y-4">
						<div className="w-full aspect-square bg-gray-100 overflow-hidden">
							<div className="w-full h-full object-cover" />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="w-full aspect-square bg-gray-100 overflow-hidden">
								<div className="w-full h-full object-cover" />
							</div>
							<div className="w-full aspect-square bg-gray-100 overflow-hidden">
								<div className="flex justify-center items-center w-full h-full object-cover" />
							</div>
						</div>
					</div>

					<div className="flex flex-col">
						<div className="flex items-center justify-between mb-4">
							<div className="font-semibold text-4xl py-2 mb-4">
								{product.productName}
							</div>
							<div className="flex gap-4">
								<button className="p-2 cursor-pointer border-b border-gray-200">
									Edit
								</button>

								<button className="p-2 cursor-pointer border-b border-gray-200">
									Delete
								</button>
							</div>
						</div>

						<DropdownText title={"Description"} text={product.description} />

						<div className="flex w-full gap-24 items-center mb-4 text-muted-foreground">
							<div className="flex items-center flex-1 gap-2">
								<span>Price</span>
								<span className="text-primary text-xl font-bold py-2">
									{product.price}
								</span>
								<span>€</span>
							</div>
							<div className="flex items-center flex-1 gap-2 justify-end">
								<span>Delivery</span>
								<span className="text-primary text-xl font-bold py-2">
									{product.delivery}
								</span>
								<span>days</span>
							</div>
						</div>

						<div className="flex w-full gap-8 items-center mb-4">
							<button className="p-4 border-2 border-black w-full cursor-pointer">
								Add to cart
							</button>
							<button className="p-4 w-full text-white bg-black cursor-pointer">
								Buy now
							</button>
						</div>

						<DropdownText title={"Dimensions"} text={product.dimensions} />

						<DropdownText title={"Material Details"} text={product.material} />
					</div>
				</div>
			</div>
		</>
	);
}
