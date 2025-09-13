"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { findFolder, getFileTypeFromMime } from "@/lib/data";
import { writeFile } from "fs/promises";
import { join } from "path";
import { validateFileSize } from "../utils/validators";
import { putRecent } from "@/features/list/actions/put-recent";

export async function addFile(parentFolderId: string, formData: FormData) {
    try {
        const file = formData.get("file") as File;

        if (!file) {
            return {
                success: false,
                message: "No file provided",
            };
        }

        // Check file size limit using shared validation
        const validation = validateFileSize(file.size);
        if (!validation.isValid) {
            return {
                success: false,
                message: validation.errorMessage,
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

        // Add to recent files cache
        await putRecent(newFile);

        // Revalidate the relevant paths to refresh the cache
        revalidatePath("/");
        revalidatePath(`/folder/${parentFolderId}`);

        // Navigate to the parent folder
        redirect(`/folder/${parentFolderId}`);
    } catch (error) {
        console.error("Error in addFile:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unexpected error occurred while uploading the file",
        };
    }
}

