"use client";

import { deleteProduct } from "@/actions/delete-product";
import DropdownText from "@/components/dropdown-text";
import { ImageSchema } from "@/db/schema/image";
import { ProductSelectSchema } from "@/db/schema/product";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RefObject, useRef, useState, useTransition } from "react";
import { useOnClickOutside } from "usehooks-ts";

export default function ProductPage({
	product,
}: {
	product: ProductSelectSchema & { image: ImageSchema[] };
}) {
	const [isMoreImagesShown, setIsMoreImagesShown] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref as RefObject<HTMLDivElement>, () =>
		setIsMoreImagesShown(false)
	);

	const router = useRouter();

	const [isEditPending, startEditTransition] = useTransition();
	const handleEdit = () => {
		startEditTransition(async () => {});
	};

	const [isDeletePending, startDeleteTransition] = useTransition();
	const handleDelete = (productId: number) => {
		startDeleteTransition(async () => {
			deleteProduct(productId).then((res) => {
				router.refresh();
			});
			setTimeout(() => {
				router.push("/products");
			});
		});
	};

	const handleShowMoreImages = () => {
		setIsMoreImagesShown((prev) => !prev);
	};

	return (
		<>
			<div className="max-w-7xl mx-auto px-4 md:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
					<AnimatePresence>
						{isMoreImagesShown && (
							<motion.div
								className="absolute flex justify-center items-center inset-0 z-100"
								initial={{ background: "rgba(0, 0, 0, 0)" }}
								animate={{ background: "rgba(0, 0, 0, 0.4)" }}
								exit={{ background: "rgba(0, 0, 0, 0)" }}
								transition={{ delay: 0.2 }}
							>
								<motion.div
									className="flex gap-4 p-4"
									ref={ref}
									initial={{ background: "rgba(255, 255, 255, 0)" }}
									animate={{ background: "rgba(255, 255, 255, 1)" }}
									exit={{ background: "rgba(255, 255, 255, 0)" }}
									transition={{ duration: 0.2 }}
								>
									{product.image.map((img) => (
										<motion.div
											key={img.imageUrl}
											className="relative w-64 h-64 mb-4"
											layoutId={`image-${img.imageUrl}`}
											transition={{ duration: 0.3 }}
										>
											<Image
												src={img.imageUrl}
												alt="Selected Image"
												fill
												className="w-full h-full object-cover"
											/>
										</motion.div>
									))}
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
					<div className="space-y-4">
						<motion.div
							className="relative w-full aspect-square bg-gray-100 overflow-hidden"
							layoutId={`image-${product.image[0].imageUrl}`}
						>
							{product.image ? (
								<Image
									src={product.image[0].imageUrl}
									alt="Selected Image"
									fill
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full object-cover" />
							)}
						</motion.div>
						<div className="grid grid-cols-2 gap-4">
							<motion.div
								className="relative w-full aspect-square bg-gray-100 overflow-hidden"
								layoutId={`image-${product.image[1].imageUrl}`}
							>
								{product.image ? (
									<Image
										src={product.image[1].imageUrl}
										alt="Selected Image"
										fill
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full object-cover" />
								)}
							</motion.div>
							<div className="relative">
								<button
									className="absolute bg-white p-2 border-2 border-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
									onClick={handleShowMoreImages}
								>
									Show more
								</button>
								<motion.div
									className="relative w-full aspect-square bg-gray-100 overflow-hidden blur-md"
									layoutId={`image-${product.image[2].imageUrl}`}
								>
									{product.image ? (
										<Image
											src={product.image[2].imageUrl}
											alt="Selected Image"
											fill
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="w-full h-full object-cover" />
									)}
								</motion.div>
							</div>
						</div>
					</div>

					<div className="flex flex-col">
						<div className="flex items-center justify-between mb-4">
							<div className="font-semibold text-4xl py-2 mb-4">
								{product.productName}
							</div>
							<div className="flex gap-4">
								<button
									className="p-2 cursor-pointer border-b border-gray-200"
									onClick={handleEdit}
									disabled={isEditPending}
								>
									Edit
								</button>

								<button
									className="p-2 cursor-pointer border-b border-gray-200"
									onClick={() => handleDelete(product.id)}
									disabled={isDeletePending}
								>
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
