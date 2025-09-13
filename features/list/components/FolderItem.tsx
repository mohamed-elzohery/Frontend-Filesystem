import React from "react";
import Link from "next/link";
import { Folder, ChevronRight } from "lucide-react";
import type { FolderNode } from "@/lib/data";

interface FolderItemProps {
  folder: FolderNode;
}

const FolderItem = ({ folder }: FolderItemProps) => {
  return (
    <li className="group">
      <Link
        href={`/folder/${folder.id}`}
        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <Folder className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-900 truncate">
            {folder.name}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </Link>
    </li>
  );
};

export default FolderItem;
