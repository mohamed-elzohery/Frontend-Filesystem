"use server";

import { getRecentCache } from "@/lib/cache";
import { FileNode } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function putRecent(file: FileNode): Promise<void> {
    try {
        const cache = getRecentCache();
        cache.put(file.id, file);
        revalidatePath("/recent");
    } catch (error) {
        console.error("Error adding file to recent cache:", error);
        // Don't throw error to avoid disrupting the main flow
    }
}