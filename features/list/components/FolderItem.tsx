import React from "react";
import Link from "next/link";
import type { FolderNode } from "@/lib/data";

interface FolderItemProps {
  folder: FolderNode;
}

const FolderItem = ({ folder }: FolderItemProps) => {
  return (
    <li key={folder.id}>
      <Link
        href={`/folder/${folder.id}`}
        className="block border p-2 rounded bg-white hover:bg-gray-50"
      >
        {folder.name}
      </Link>
    </li>
  );
};

export default FolderItem;
