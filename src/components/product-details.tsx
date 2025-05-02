"use client";

import { deleteProduct } from "@/actions/delete-product";
import DropdownText from "@/components/dropdown-text";
import { useRouter } from "next/navigation";
import { RefObject, useRef, useState, useTransition } from "react";
import ImageCarousel from "./image-carousel";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./button";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/actions/product";
import { User } from "@supabase/supabase-js";
import Loading from "@/app/(main)/products/_components/Loading";

export default function ProductPage({
	productId,
	user,
}: {
	productId: number;
	user: User | null;
}) {
	const {
		data: product,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
		select: (allProducts) => {
			return allProducts?.find((product) => product.id === productId);
		},
	});

	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref as RefObject<HTMLDivElement>, () =>
		setIsDialogOpen(false)
	);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [isEditPending, startEditTransition] = useTransition();
	const handleEdit = () => {
		startEditTransition(async () => {});
	};

	const [isDeletePending, startDeleteTransition] = useTransition();
	const handleDelete = (productId: number) => {
		startDeleteTransition(async () => {
			deleteProduct(productId).then((res) => {
				if (res.success) {
					toast.success(res.success, {
						description: "Product was deleted succesfully",
					});
					router.refresh();
				}
				if (res.error) {
					toast.error(res.error, {
						description: "Something went wrong",
					});
				}
				setIsDialogOpen(false);
			});
			setTimeout(() => {
				router.push("/products");
			});
		});
	};

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <div>Error loading product data. Please try again later.</div>;
	}

	if (!product) {
		return <div>Product not found.</div>;
	}

	const canEdit = user
		? user.id === product.userId || user.user_metadata?.role === "admin"
		: false;

	const urls = product.image.map((img) => img.imageUrl);

	return (
		<>
			<div className="max-w-7xl mx-auto px-4 md:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
					<ImageCarousel urls={urls} variant="show" />

					<div className="flex flex-col">
						<div className="flex justify-between mb-4">
							<div className="pb-2">
								<div className="text-muted-foreground">
									{product.category.toUpperCase()}
								</div>
								<div className="font-semibold text-4xl">
									{product.productName}
								</div>
							</div>
							{canEdit && (
								<div className="flex gap-4">
									<div className="relative group">
										<button
											className="p-2 cursor-pointer border-b border-gray-200"
											onClick={handleEdit}
											disabled={isEditPending}
										>
											Edit
										</button>
										<div className="absolute w-0 bg-black h-[1px] transition-[width] duration-200 group-hover:w-full" />
									</div>

									<div className="relative group">
										<button
											className="p-2 cursor-pointer border-b border-gray-200"
											onClick={() => setIsDialogOpen(true)}
											disabled={isDeletePending}
										>
											Delete
										</button>
										<div className="absolute w-0 bg-black h-[1px] transition-[width] duration-200 group-hover:w-full" />
									</div>
									<AnimatePresence>
										{isDialogOpen && (
											<motion.div
												initial={{ background: "rgba(0, 0, 0, 0)" }}
												animate={{ background: "rgba(0, 0, 0, 0.4)" }}
												exit={{ background: "rgba(0, 0, 0, 0)" }}
												transition={{ duration: 0.1 }}
												className="absolute flex justify-center items-center inset-0 z-100"
											>
												<motion.div
													initial={{ opacity: 0, scale: 0.9 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.9 }}
													transition={{ duration: 0.1 }}
													className="bg-white p-8"
													ref={ref}
												>
													<div className="text-3xl">
														Are you sure you want to delete this product?
													</div>
													<div className="text-muted-foreground mb-2">
														This product will be deleted permanently and cannot
														be recovered.
													</div>
													<Button onClick={() => handleDelete(product.id)}>
														Confirm
													</Button>
												</motion.div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							)}
						</div>

							<DropdownText title={"Description"} text={product.description} />

						<div className="flex w-full gap-24 items-center mb-4 text-xl">
							<div className="flex items-center flex-1 gap-2">
								<span>Price</span>
								<span className="text-xl font-bold py-2">{product.price}</span>
								<span>€</span>
							</div>
							<div className="flex items-center flex-1 gap-2 justify-end">
								<span>Delivery</span>
								<span className="text-xl font-bold py-2">
									{product.delivery}
								</span>
								<span>days</span>
							</div>
						</div>

						<div className="flex w-full gap-8 items-center mb-4">
							<Button variant="outline">Add to cart</Button>
							<Button>Buy now</Button>
						</div>

						<DropdownText title={"Dimensions"} text={product.dimensions} />

						<DropdownText title={"Material Details"} text={product.material} />
					</div>
				</div>
			</div>
		</>
	);
}
