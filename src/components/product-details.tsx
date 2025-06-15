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
import { User } from "@supabase/supabase-js";
import { ProductInsertType } from "@/db/schema/product";
import { ImageInsertType } from "@/db/schema/image";
import { CommentInsertType } from "@/db/schema/comment";
import { addComment } from "@/actions/add-comment";

export default function ProductDetails({
	product,
	productId,
	user,
}: {
	product: ProductInsertType & { image: ImageInsertType[] } & {
		comments: CommentInsertType[];
	};
	productId: number;
	user: User;
}) {
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref as RefObject<HTMLDivElement>, () =>
		setIsDialogOpen(false)
	);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [isEditPending, startEditTransition] = useTransition();
	const handleEdit = () => {
		router.push(`/edit/${productId}`);
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

	const [isNewCommentPending, startNewCommentTransition] = useTransition();
	const [commentContent, setCommentContent] = useState("");
	const handleNewComment = () => {
		startNewCommentTransition(async () => {
			addComment({
				userId: user.id,
				userName: user.user_metadata?.full_name || user.email,
				content: commentContent,
				productId,
			}).then((res) => {
				if (res.success) {
					toast.success(res.success, {
						description: "Comment was added succesfully",
					});
					router.refresh();
				}
				if (res.error) {
					toast.error(res.error, {
						description: "Something went wrong",
					});
				}
			});
		});
	};

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
													<Button onClick={() => handleDelete(productId)}>
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
				<div className="mt-10">
					<div className="text-4xl font-bold">Comments</div>
					<div className="">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
							<Button onClick={handleNewComment} disabled={isNewCommentPending}>
								Add new comment
							</Button>
							<div className="mt-4">
								<textarea
									className="w-full border border-gray-300 p-2"
									placeholder="Enter your comment here..."
									value={commentContent}
									onChange={(e) => setCommentContent(e.target.value)}
								/>
							</div>
						</div>
						{product.comments.length > 0 ? (
							<div className="space-y-4 mt-6">
								{product.comments.map((comment) => (
									<div
										key={comment.createdAt}
										className="bg-gray-50 p-4 border border-gray-200"
									>
										<div className="flex items-center mb-2">
											<div className="font-semibold text-gray-800 mr-2">
												{comment.userName}
											</div>
											<span className="text-xs text-gray-400">
												{new Date(comment.createdAt).toLocaleString()}
											</span>
										</div>
										<p className="text-gray-700">{comment.content}</p>
									</div>
								))}
							</div>
						) : (
							"No comments"
						)}
					</div>
				</div>
			</div>
		</>
	);
}
