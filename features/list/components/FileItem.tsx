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
import { getFileTypeFromName } from "@/lib/data";

interface FileItemProps {
  file: FileNode;
}

const FileItem = ({ file }: FileItemProps) => {
  const getFileIcon = (fileType?: string, fileName?: string) => {
    // Check file type both from stored fileType and from filename
    const actualFileType = fileType || getFileTypeFromName(fileName || "");

    switch (actualFileType) {
      case "image":
        return "🖼️";
      case "pdf":
        return "📄";
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
            <span className="text-sm">
              {getFileIcon(file.fileType, file.name)}
            </span>
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
