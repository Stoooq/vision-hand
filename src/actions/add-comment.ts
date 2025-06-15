"use server";

import { db } from "@/db";
import { comment } from "@/db/schema";
import { commentInsertSchema } from "@/db/schema/comment";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export const addComment = async (
    values: z.infer<typeof commentInsertSchema>,
) => {
    const validation = commentInsertSchema.safeParse(values);
    if (!validation.success) return { error: "Invalid fields" };

    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session?.user) {
        return { error: "Unauthorized or session error" };
    }

    await db
        .insert(comment)
        .values({
            userName: values.userName,
            userId: values.userId,
            productId: values.productId,
            content: values.content,
        });

    return { success: "Comment added" };
};
