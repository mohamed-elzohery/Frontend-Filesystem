import React from "react";
import type { FolderNode, FileNode } from "@/lib/data";
import FolderItem from "./FolderItem";
import FileItem from "./FileItem";

interface FolderListProps {
  nodes: Array<FolderNode | FileNode>;
}

const FolderList = ({ nodes }: FolderListProps) => {
  if (!nodes.length) {
    return <p className="text-gray-500">(empty)</p>;
  }

  // Separate folders and files
  const folders = nodes.filter(
    (node): node is FolderNode => node.type === "folder"
  );
  const files = nodes.filter((node): node is FileNode => node.type === "file");

  return (
    <ul className="flex flex-col gap-2">
      {folders.map((folder) => (
        <FolderItem key={folder.id} folder={folder} />
      ))}
      {files.map((file) => (
        <FileItem key={file.id} file={file} />
      ))}
    </ul>
  );
};

export default FolderList;
