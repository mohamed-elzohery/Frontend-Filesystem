import React from "react";
import type { FileNode } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Image,
  FileText,
  Video,
  Music,
  File,
  ExternalLink,
} from "lucide-react";
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
        return <Image className="h-5 w-5 text-green-500" />;
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Video className="h-5 w-5 text-purple-500" />;
      case "audio":
        return <Music className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="group cursor-pointer">
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="flex-shrink-0">
                {getFileIcon(file.fileType, file.name)}
              </div>
              <span className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </span>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
          </div>
        </li>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getFileIcon(file.fileType, file.name)}
            <span>File Preview</span>
          </DialogTitle>
        </DialogHeader>
        <Viewer file={file} />
      </DialogContent>
    </Dialog>
  );
};

export default FileItem;
