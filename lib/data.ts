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

export function getFileTypeFromMime(mimeType: string): string {
  if (!mimeType) return 'unknown';

  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('text/')) return 'document';
  if (mimeType.includes('document') || mimeType.includes('word') || mimeType.includes('sheet')) return 'document';

  return 'unknown';
}

export function getFileTypeFromName(fileName: string): string {
  const extension = fileName.toLowerCase().split('.').pop();

  switch (extension) {
    case 'pdf':
      return 'pdf';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
      return 'image';
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'wmv':
      return 'video';
    case 'mp3':
    case 'wav':
    case 'flac':
      return 'audio';
    case 'txt':
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
      return 'document';
    default:
      return 'unknown';
  }
}

export function findFile(
  id: string,
  current: FolderNode = root
): FileNode | null {
  for (const child of current.children) {
    if (child.type === "file" && child.id === id) {
      return child;
    }
    if (child.type === "folder") {
      const result = findFile(id, child);
      if (result) return result;
    }
  }
  return null;
}
