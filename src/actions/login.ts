"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { loginSchema } from "@/schemas";
import { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password });

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/products");
}
