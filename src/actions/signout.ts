"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signout() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Supabase signout error:", error);
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}
