"use server";

import { revalidatePath } from "next/cache";
import { findFolder, FolderNode } from "@/lib/data";

export async function addFolder(parentFolderId: string, name: string) {
  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Folder name cannot be empty");
  }

  const parent = findFolder(parentFolderId);
  if (!parent) {
    throw new Error("Parent folder not found");
  }

  const newFolder: FolderNode = {
    id: Date.now().toString(),
    name: name.trim(),
    type: "folder" as const,
    parentId: parentFolderId,
    children: [],
  };

  parent.children.push(newFolder);


  // Revalidate the relevant paths to refresh the cache
  revalidatePath("/");
  revalidatePath(`/folder/${parentFolderId}`);

  return {
    success: true,
    message: `Folder "${name.trim()}" created successfully`,
    folder: newFolder,
  };
}
