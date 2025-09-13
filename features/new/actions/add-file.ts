"use server";

import { revalidatePath } from "next/cache";
import { findFolder } from "@/lib/data";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function addFile(parentFolderId: string, formData: FormData) {
    const file = formData.get("file") as File;

    if (!file) {
        throw new Error("No file provided");
    }

    const parent = findFolder(parentFolderId);
    if (!parent) {
        throw new Error("Parent folder not found");
    }

    // Save file to public folder
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename to avoid conflicts
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = join(process.cwd(), "public", filename);

    await writeFile(filepath, buffer);

    // Add file to data store
    const newFile = {
        id: timestamp.toString(),
        name: file.name,
        type: "file" as const,
    };

    parent.children.push(newFile);

    // Revalidate the relevant paths to refresh the cache
    revalidatePath("/");
    revalidatePath(`/folder/${parentFolderId}`);

    return {
        success: true,
        message: `File "${file.name}" uploaded successfully`,
        file: newFile,
    };
}

