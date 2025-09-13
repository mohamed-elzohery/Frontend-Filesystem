import React from "react";
import type { FolderNode, FileNode } from "@/lib/data";
import FolderItem from "./FolderItem";
import FileItem from "./FileItem";
import { FolderOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface FolderListProps {
  nodes: Array<FolderNode | FileNode>;
}

const FolderList = ({ nodes }: FolderListProps) => {
  if (!nodes.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FolderOpen className="h-12 w-12 text-gray-300 mb-4" />
        <p className="text-gray-500 text-sm font-medium">
          This folder is empty
        </p>
        <p className="text-gray-400 text-xs mt-1">
          No files or folders to display
        </p>
      </div>
    );
  }

  // Separate folders and files
  const folders = nodes.filter(
    (node): node is FolderNode => node.type === "folder"
  );
  const files = nodes.filter((node): node is FileNode => node.type === "file");

  return (
    <div className="space-y-6">
      {folders.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3 px-1">
            Folders ({folders.length})
          </h3>
          <ul className="space-y-2">
            {folders.map((folder) => (
              <FolderItem key={folder.id} folder={folder} />
            ))}
          </ul>
        </div>
      )}

      {files.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3 px-1">
            Files ({files.length})
          </h3>
          <ul className="space-y-2">
            {files.map((file) => (
              <FileItem key={file.id} file={file} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const FolderListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Folders section skeleton */}
      <div>
        <Skeleton className="h-4 w-24 mb-3" />
        <ul className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="flex items-center gap-3 p-3 rounded-lg">
              <Skeleton className="h-5 w-5 rounded-sm" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Files section skeleton */}
      <div>
        <Skeleton className="h-4 w-20 mb-3" />
        <ul className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="flex items-center gap-3 p-3 rounded-lg">
              <Skeleton className="h-5 w-5 rounded-sm" />
              <div className="flex-1">
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-12" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FolderList;
