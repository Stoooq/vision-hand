import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<>
			<div className="max-w-7xl mx-auto px-4 md:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
					<div className="space-y-4">
						<div className="relative w-full">
							<div className="aspect-square bg-gray-100" />
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="relative w-full">
								<div className="aspect-square bg-gray-100" />
							</div>

							<div className="relative w-full">
								<div className="aspect-square bg-gray-100" />
							</div>
						</div>
					</div>

					<div className="flex flex-col">
						<div className="flex justify-between mb-4">
							<div className="pb-2 w-1/2">
								<div className="text-muted-foreground">
									<Skeleton className="w-1/2 h-[24px]" />
									{/* {product.category.toUpperCase()} */}
								</div>
								<div className="font-semibold text-4xl">
									<Skeleton className="w-full h-[40px]" />
									{/* {product.productName} */}
								</div>
							</div>
						</div>

						{/* <DropdownText title={"Description"} text={product.description} /> */}
						<div className="mb-4 py-2">
							<Skeleton className="w-full h-[28px]" />
						</div>

						<div className="flex w-full gap-24 items-center mb-4 text-xl">
							<div className="flex items-center flex-1 gap-2">
								<span>Price</span>
								<span className="text-xl font-bold py-2">
									<Skeleton className="w-16 h-[28px]" />
									{/* {product.price} */}
								</span>
								<span>€</span>
							</div>
							<div className="flex items-center flex-1 gap-2 justify-end">
								<span>Delivery</span>
								<span className="text-xl font-bold py-2">
									<Skeleton className="w-16 h-[28px]" />
									{/* {product.delivery} */}
								</span>
								<span>days</span>
							</div>
						</div>

						<div className="flex w-full gap-8 items-center mb-4">
							<Skeleton className="w-full h-[52px]" />
							<Skeleton className="w-full h-[52px]" />
							{/* <Button variant="outline">Add to cart</Button> */}
							{/* <Button>Buy now</Button> */}
						</div>

						{/* <DropdownText title={"Dimensions"} text={product.dimensions} /> */}
						<div className="mb-4 py-2">
							<Skeleton className="w-full h-[28px]" />
						</div>

						{/* <DropdownText title={"Material Details"} text={product.material} /> */}
						<div className="mb-4 py-2">
							<Skeleton className="w-full h-[28px]" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
