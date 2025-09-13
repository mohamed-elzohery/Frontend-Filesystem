export type FileNode = {
  id: string;
  name: string;
  type: "file";
  fileType?: string;
};

export type FolderNode = {
  id: string;
  name: string;
  type: "folder";
  children: Array<FolderNode | FileNode>;
  parentId?: string;
};

// Re-export getFileTypeFromMime from utils for convenience
export { getFileTypeFromMime } from "./utils";

declare global {
  var __DATA_STORE__: FolderNode | undefined;
}

const initialData: FolderNode = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    { id: "folder-1", name: "Folder 1", type: "folder", children: [], parentId: "root" },
    { id: "folder-2", name: "Folder 2", type: "folder", children: [], parentId: "root" },
  ],
};

// We're mimicing a persistent data store using a global variable.
// In a real application, this would be replaced with a database or other persistent storage.

if (typeof global !== 'undefined' && !global.__DATA_STORE__) {
  global.__DATA_STORE__ = structuredClone(initialData);
}

export function getDataStore(): FolderNode {
  if (typeof global !== 'undefined' && global.__DATA_STORE__) {
    return global.__DATA_STORE__;
  }

  if (typeof global !== 'undefined') {
    global.__DATA_STORE__ = structuredClone(initialData);
    return global.__DATA_STORE__;
  }

  return structuredClone(initialData);
}

export const root = getDataStore();

export function findFolder(
  id: string,
  current: FolderNode = root
): FolderNode | null {
  if (current.id === id) return current;
  for (const child of current.children) {
    if (child.type === "folder") {
      const result = findFolder(id, child);
      if (result) return result;
    }
  }
  return null;
}


