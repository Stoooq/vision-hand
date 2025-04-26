import Pagination from "@/components/pagination";
import { getAllProducts } from "@/data/product";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function ProductsPage() {
	const products = await getAllProducts();
	console.log(products);

	return (
		<>
			<div className="w-full bg-[#f8f8f8] pb-8">
				<Image
					src="/Handmade.jpg"
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-auto max-h-96 object-cover mb-8"
					alt="handmade image"
				/>

				<div className="max-w-6xl mx-auto">
					<div className="flex relative items-center">
						<div className="w-full">
							<div className="relative group">
								<input
									placeholder="Search Products"
									className="w-full p-2 cursor-pointer border-b border-gray-200 focus:outline-none"
								/>
								<div className="absolute w-0 bg-black h-[1px] transition-[width] duration-500 group-hover:w-full" />
							</div>
						</div>
						<button className="flex h-full px-2 justify-center items-center absolute right-0 cursor-pointer text-slate-500 hover:text-slate-900">
							<Search size={18} className="transition-colors duration-300" />
						</button>
					</div>
					<div className="flex justify-between mt-8">
						<div className="flex gap-6">
							{/* <DropdownMenu
								title="Category"
								items={dropDownMenuItems["Category"]}
							/>
							<DropdownMenu
								title="Color"
								items={dropDownMenuItems["Color"]}
							/> */}
							<div className="flex gap-2 h-full cursor-pointer p-2 bg-red-200">
								<div>Price</div>
								<button>
									<ChevronDown />
								</button>
							</div>
						</div>
						<div className="h-full cursor-pointer p-2 bg-red-200">
							56 items Sort By: Price
						</div>
					</div>
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
					<div className="mt-8">
						<div className="flex justify-center gap-8">
							<Pagination pages={["1", "2", "3", "4", "5"]} activePage="1" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
