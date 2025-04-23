"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newProductSchema } from "@/schemas";
import { Form, FormField } from "@/components/ui/form";
import DropdownMenu from "@/components/dropdown-menu";
import { Plus } from "lucide-react";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { createProduct } from "@/actions/create-product";
import { Categories } from "@/lib/const";
import Image from "next/image";
import { convertBlobUrlToImage } from "@/lib/utils";
import { uploadImage } from "@/db/supabase/storage/client";

export default function NewProductPage() {
	const [isPending, startTransition] = useTransition();
	const imageInputRef = useRef<HTMLInputElement>(null);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const imagesArray = Array.from(e.target.files);
			const newImageUrls = imagesArray.map((image) =>
				URL.createObjectURL(image)
			);

			setSelectedImages([...selectedImages, ...newImageUrls]);
		}
	};

	const form = useForm<z.infer<typeof newProductSchema>>({
		resolver: zodResolver(newProductSchema),
		defaultValues: {
			category: undefined,
			productName: "",
			delivery: "",
			description: "",
			price: "",
			dimensions: "",
			material: "",
		},
	});

	function onSubmit(values: z.infer<typeof newProductSchema>) {
		startTransition(async () => {
			if (!selectedImages) {
				return;
			}

			const urls: string[] = [];
			for (const url of selectedImages || []) {
				const imageFile = await convertBlobUrlToImage(url);

				const { imageUrl, error } = await uploadImage({
					file: imageFile,
					bucket: "pictures",
				});

				if (error) {
					console.error("Error uploading image:", error);
					return;
				}

				urls.push(imageUrl);
			}

			await createProduct(values, urls).then((data) => {
				if (data?.error) {
					form.reset();
				}
				if (data?.success) {
					form.reset();
				}
			});

			setSelectedImages([]);
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
						<div className="space-y-4">
							<div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
								{selectedImages.length > 0 ? (
									<Image
										src={selectedImages[0]}
										alt="Selected Image"
										fill
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full object-cover" />
								)}
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="w-full aspect-square bg-gray-100 overflow-hidden">
									<div className="w-full h-full object-cover" />
								</div>
								<div className="w-full aspect-square bg-gray-100 overflow-hidden">
									<div className="flex justify-center items-center w-full h-full object-cover">
										<label className="bg-white p-4 hover:bg-gray-100 cursor-pointer transition duration-500 group flex items-center justify-center">
											<input
												ref={imageInputRef}
												type="file"
												multiple
												accept="image/*"
												className="hidden"
												onChange={handleImageChange}
											/>
											<button onClick={() => imageInputRef.current?.click()} type="button">
												<Plus
													size={48}
													className="transition-transform duration-300 group-hover:scale-110"
												/>
											</button>
										</label>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col">
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<>
										<DropdownMenu
											title={field.value || "Category"}
											items={Categories}
											variant="nested"
											field={field}
										/>
									</>
								)}
							/>

							<FormField
								control={form.control}
								name="productName"
								render={({ field }) => (
									<input
										placeholder="Product Name"
										{...field}
										className="font-semibold text-xl py-2 mb-4 border-b border-gray-200 focus:outline-none focus:border-gray-300"
									/>
								)}
							/>

							<div className="flex w-full gap-24 items-center mb-4 text-muted-foreground">
								<div className="flex items-center flex-1 gap-2">
									<span>Price</span>
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<div className="flex">
												<input
													{...field}
													className={`text-primary text-xl font-bold py-2 border-b focus:outline-none w-full ${
														form.formState.errors.price
															? "border-red-500 focus:border-red-500"
															: "border-gray-200 focus:border-gray-300"
													}`}
												/>
												{form.formState.errors.price && (
													<div className="text-red-500 text-sm ml-1">
														{form.formState.errors.price.message?.toString()}
													</div>
												)}
											</div>
										)}
									/>
									<span>€</span>
								</div>
								<div className="flex items-center flex-1 gap-2 justify-end">
									<span>Delivery</span>
									<FormField
										control={form.control}
										name="delivery"
										render={({ field }) => (
											<input
												{...field}
												className="text-primary text-xl font-bold py-2 border-b border-gray-200 focus:outline-none focus:border-gray-300 w-full"
											/>
										)}
									/>
									<span>days</span>
								</div>
							</div>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<DropdownMenu
										title="Description"
										items={[]}
										variant="input"
										field={field}
									/>
								)}
							/>

							<FormField
								control={form.control}
								name="dimensions"
								render={({ field }) => (
									<DropdownMenu
										title="Dimensions"
										items={[]}
										variant="input"
										field={field}
									/>
								)}
							/>

							<FormField
								control={form.control}
								name="material"
								render={({ field }) => (
									<DropdownMenu
										title="Material Details"
										items={[]}
										variant="input"
										field={field}
									/>
								)}
							/>

							<button
								disabled={isPending}
								type="submit"
								className="w-full mt-4 py-3 px-6 bg-black text-white font-medium cursor-pointer"
							>
								Add Product
							</button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}
