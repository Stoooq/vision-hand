import { ALL_SUBCATEGORIES, AllCategories } from "@/lib/const";
import { z } from "zod";

export const newProductSchema = z.object({
	category: z.enum(AllCategories, {
	    message: "Invalid category",
	}),
	// category: z.string(),
	productName: z.string().min(5).max(20),
	delivery: z.string().min(1).max(2),
	description: z
		.string()
		.min(10, {
			message: "Description must be at least 10 characters.",
		})
		.max(100, {
			message: "Description must be less than 100 characters.",
		}),
	price: z
		.string()
		.min(1, {
			message: "Price must be at least 1.",
		})
		.max(1000, {
			message: "Price must be less than 1000.",
		}),
	dimensions: z.string(),
	material: z.string(),
});

export const loginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
})
