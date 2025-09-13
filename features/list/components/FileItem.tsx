import React from "react";
import type { FileNode } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageViewer from "./viewers/ImageViewer";
import Viewer from "./viewers/Viewer";

interface FileItemProps {
  file: FileNode;
}

const FileItem = ({ file }: FileItemProps) => {
  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case "image":
        return "🖼️";
      case "document":
        return "📄";
      case "video":
        return "🎬";
      case "audio":
        return "🎵";
      default:
        return "📄";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li
          key={file.id}
          className="block border p-2 rounded bg-white cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm">{getFileIcon(file.fileType)}</span>
            <span>{file.name}</span>
          </div>
        </li>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>File Preview</DialogTitle>
        </DialogHeader>
        <Viewer file={file} />
      </DialogContent>
    </Dialog>
  );
};

export default FileItem;
