import { ALL_SUBCATEGORIES } from "@/lib/const";
import { z } from "zod";

export const newProductSchema = z.object({
	// category: z.enum(ALL_SUBCATEGORIES as const, {
    //     message: "Invalid category",
    // }),
	category: z.string(),
	productName: z.string().max(20),
	delivery: z.string(),
	description: z.string(),
	price: z.string(),
	dimensions: z.string(),
	material: z.string(),
});
