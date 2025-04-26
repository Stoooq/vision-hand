"use client";

import { FieldErrors, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import DropdownMenu from "@/components/dropdown-menu";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { createProduct } from "@/actions/create-product";
import { Categories } from "@/lib/const";
import { convertBlobUrlToImage } from "@/lib/utils";
import { uploadImage } from "@/utils/supabase/storage/client";
import ImageCarousel from "@/components/image-carousel";
import { toast } from "sonner";
import { productInsertSchema } from "@/db/schema/product";
import { Button } from "@/components/button";

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

	const handleDeleteImage = (urlToDelete: string) => {
		setSelectedImages((prevImages) =>
			prevImages.filter((url) => url !== urlToDelete)
		);

		URL.revokeObjectURL(urlToDelete);
	};

	const form = useForm<z.infer<typeof productInsertSchema>>({
		resolver: zodResolver(productInsertSchema),
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

	function onSubmit(values: z.infer<typeof productInsertSchema>) {
		startTransition(async () => {
			if (selectedImages.length < 1) return;

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

	function onError(errors: FieldErrors<typeof productInsertSchema>) {
		const errorMessages = Object.values(errors)
			.map((error) => error?.message)
			.filter((msg): msg is string => typeof msg === "string");

		if (selectedImages.length < 1) {
			errorMessages.push("Please select at least one image.");
		}

		if (errorMessages.length > 0) {
			const combinedMessage = (
				<div className="flex flex-col gap-2">
					{errorMessages.map((msg, index) => (
						<span key={index}>{msg}</span>
					))}
				</div>
			);

			toast.error(combinedMessage);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit, onError)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
						<ImageCarousel
							urls={selectedImages}
							variant="delete"
							onDelete={handleDeleteImage}
						/>

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
											error={form.formState.errors.category}
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
										className={`text-xl py-2 mb-4 border-b border-gray-200 focus:outline-none focus:border-gray-300 ${
											form.formState.errors.productName
												? "border-red-500 focus:border-red-500"
												: "border-gray-200 focus:border-gray-300"
										}`}
									/>
								)}
							/>

							<div className="flex flex-col sm:flex-row gap-8 w-full mb-4 text-muted-foreground">
								<div
									className={`flex flex-1 items-center text-xl border-b ${
										form.formState.errors.price
											? "border-red-500"
											: "border-gray-200"
									}`}
								>
									<span className="mr-2">Price</span>
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<input
												type="number"
												step="0.01"
												{...field}
												className="text-primary text-xl focus:outline-none w-full bg-transparent py-2"
											/>
										)}
									/>
									<span className="ml-1">€</span>
								</div>
								<div
									className={`flex flex-1 items-center text-xl border-b ${
										form.formState.errors.delivery
											? "border-red-500"
											: "border-gray-200"
									}`}
								>
									<span className="mr-2">Delivery</span>
									<FormField
										control={form.control}
										name="delivery"
										render={({ field }) => (
											<input
												type="number"
												step="1"
												{...field}
												className="text-primary text-xl focus:outline-none w-full bg-transparent"
											/>
										)}
									/>
									<span className="ml-1">days</span>
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
										error={form.formState.errors.description}
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
										error={form.formState.errors.dimensions}
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
										error={form.formState.errors.material}
									/>
								)}
							/>

							<div className="flex gap-4">
								<div className="w-full">
									<input
										ref={imageInputRef}
										type="file"
										multiple
										accept="image/*"
										className="hidden"
										onChange={handleImageChange}
									/>
									<Button
										disabled={isPending}
										variant="outline"
										onClick={() => imageInputRef.current?.click()}
									>
										Add Images
									</Button>
								</div>
								<Button type="submit" disabled={isPending}>
									Add Product
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}
