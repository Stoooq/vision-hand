"use client";

import { productInsertSchema } from "@/db/schema/product";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ControllerRenderProps, FieldError, FieldPath } from "react-hook-form";
import { z } from "zod";

type SubcategoryMap = {
	[category: string]: string[];
};

type NewProductForm = z.infer<typeof productInsertSchema>;

type MenuItems = string[] | SubcategoryMap;

export default function DropdownMenu({
	title,
	items,
	variant,
	field,
	error,
}: {
	title: string;
	items: MenuItems | null;
	variant: "nested" | "input";
	field?: ControllerRenderProps<NewProductForm, FieldPath<NewProductForm>>;
	error: FieldError | undefined;
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const hasSubcategories = !Array.isArray(items);

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [showSubcategories, setShowSubcategories] = useState(false);
	const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
		null
	);

	const handleCategorySelect = (category: string) => {
		setSelectedCategory(category);
		setShowSubcategories(true);
	};

	const handleSubcategorySelect = (subcategory: string) => {
		setSelectedSubcategory(subcategory);
		setShowSubcategories(false);
		setIsMenuOpen(false);

		if (variant === "nested" && field) {
			field.onChange(subcategory);
		}
	};

	const handleBackToCategories = () => {
		setShowSubcategories(false);
		setTimeout(() => {
			setSelectedCategory(null);
		}, 300);
	};

	return (
		<div className="relative mb-4">
			<div className="relative bg-background overflow-hidden">
				<button
					type="button"
					className={`flex justify-between gap-2 text-xl py-2 cursor-pointer w-full relative z-20 border-b border-gray-200 focus:outline-none ${
						error ? "border-red-500" : ""
					}`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<div>{selectedSubcategory ? selectedSubcategory : title}</div>
					<motion.div
						initial={{ rotate: 0 }}
						animate={{ rotate: isMenuOpen ? 180 : 0 }}
					>
						<ChevronDown />
					</motion.div>
					<div
						className={`absolute bg-black h-[1px] bottom-0 transition-[width] duration-300 ${
							isMenuOpen ? "w-full" : "w-0"
						} ${error && "hidden"}`}
					/>
				</button>
			</div>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ height: 0 }}
						animate={{ height: "auto" }}
						exit={{ height: 0 }}
						className="w-full backdrop-blur-md overflow-hidden z-10"
					>
						{variant == "nested" && (
							<>
								{hasSubcategories && items && (
									<div className="relative w-full">
										<AnimatePresence>
											{!showSubcategories && (
												<motion.div
													layoutId="categories"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													// transition={{ duration: 0.3 }}
													className="w-full"
												>
													{Object.keys(items).map((category, index) => (
														<div
															key={index}
															className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
															onClick={() => handleCategorySelect(category)}
														>
															<span>{category}</span>
															<ChevronDown className="rotate-270" size={16} />
														</div>
													))}
												</motion.div>
											)}
										</AnimatePresence>
										<AnimatePresence>
											{showSubcategories && selectedCategory && (
												<motion.div
													layoutId="categories"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													// transition={{ duration: 0.3 }}
													className="w-full"
												>
													<motion.button
														type="button"
														// initial={{ opacity: 0, y: -10 }}
														// animate={{ opacity: 1, y: 0 }}
														// exit={{ opacity: 0, y: -10 }}
														className="flex items-center p-3 text-blue-600 hover:bg-gray-100"
														onClick={handleBackToCategories}
													>
														<ChevronLeft size={16} className="mr-1" />
														<span>Powrót</span>
													</motion.button>
													{items[selectedCategory].map((subitem, subIndex) => (
														<div
															key={subIndex}
															className="p-4 hover:bg-gray-100 cursor-pointer"
															onClick={() => handleSubcategorySelect(subitem)}
														>
															{subitem}
														</div>
													))}
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								)}
							</>
						)}
						{variant == "input" && (
							<>
								<textarea
									{...field}
									value={field!.value as string}
									placeholder="Enter a description in this field"
									className="w-full h-[120px] border border-gray-200 p-2 focus:outline-none focus:border-gray-300 border-t-0 resize-none"
								/>
							</>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
