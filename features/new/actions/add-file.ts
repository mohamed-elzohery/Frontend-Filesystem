"use server";

import { revalidatePath } from "next/cache";
import { findFolder, getFileTypeFromMime } from "@/lib/data";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function addFile(parentFolderId: string, formData: FormData) {
    try {
        const file = formData.get("file") as File;

        if (!file) {
            return {
                success: false,
                message: "No file provided",
            };
        }

        // Check file size limit (1MB = 1024 * 1024 bytes)
        const maxSizeInBytes = 1024 * 1024; // 1MB
        if (file.size > maxSizeInBytes) {
            return {
                success: false,
                message: `File size exceeds the maximum limit of 1MB. Current file size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
            };
        }

        const parent = findFolder(parentFolderId);
        if (!parent) {
            return {
                success: false,
                message: "Parent folder not found",
            };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;
        const filepath = join(process.cwd(), "public", filename);

        await writeFile(filepath, buffer);

        // Add file to data store
        const fileType = getFileTypeFromMime(file.type);
        const newFile = {
            id: timestamp.toString(),
            name: file.name,
            type: "file" as const,
            fileType,
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
    } catch (error) {
        console.error("Error in addFile:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unexpected error occurred while uploading the file",
        };
    }
}

