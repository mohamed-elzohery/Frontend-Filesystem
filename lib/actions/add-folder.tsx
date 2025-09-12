"use server";

import { revalidatePath } from "next/cache";
import { findFolder } from "@/lib/data";

export async function addFolder(parentFolderId: string, name: string) {
  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Folder name cannot be empty");
  }

  const parent = findFolder(parentFolderId);
  if (!parent) {
    throw new Error("Parent folder not found");
  }

  const newFolder = {
    id: Date.now().toString(),
    name: name.trim(),
    type: "folder" as const,
    children: [],
  };

  parent.children.push(newFolder);
  console.log(
    `Created folder "${newFolder.name}" with ID "${newFolder.id}" in parent "${parent.name}"`
  );

  // Revalidate the relevant paths to refresh the cache
  revalidatePath("/");
  revalidatePath(`/folder/${parentFolderId}`);

  return {
    success: true,
    message: `Folder "${name.trim()}" created successfully`,
    folder: newFolder,
  };
}
