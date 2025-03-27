"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newProductSchema } from "@/schemas";
import { Form, FormField } from "@/components/ui/form";
import DropdownMenu from "@/components/dropdown-menu";
import { Plus } from "lucide-react";
import { useTransition } from "react";
import { createProduct } from "@/actions/create-product";
import { Categories } from "@/lib/const";

export default function NewProductPage() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof newProductSchema>>({
		resolver: zodResolver(newProductSchema),
		defaultValues: {
			category: "",
			productName: "Product name",
			delivery: "",
			description: "",
			price: "",
			dimensions: "",
			material: "",
		},
	});

	async function onSubmit(values: z.infer<typeof newProductSchema>) {
		console.log(values);
		startTransition(() => {
			createProduct(values).then((data) => {
				if (data?.error) {
					form.reset();
				}
				if (data?.success) {
					form.reset();
				}
			});
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
						{/* Product Images - Always square with aspect ratio enforced */}
						<div className="space-y-4">
							<div className="w-full aspect-square bg-gray-100 overflow-hidden">
								<div className="w-full h-full object-cover" />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="w-full aspect-square bg-gray-100 overflow-hidden">
									<div className="w-full h-full object-cover" />
								</div>
								<div className="w-full aspect-square bg-gray-100 overflow-hidden">
									<div className="flex justify-center items-center w-full h-full object-cover">
										<div className="bg-white p-4 rounded-full hover:bg-gray-100 cursor-pointer transition duration-500 group">
											<Plus
												size={48}
												className="transition-transform duration-300 group-hover:scale-110"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Product Details */}
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

							{/* Editable product name */}
							<FormField
								control={form.control}
								name="productName"
								render={({ field }) => (
									<input
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
											<input
												{...field}
												className="text-primary text-xl font-bold py-2 border-b border-gray-200 focus:outline-none focus:border-gray-300 w-full"
											/>
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
