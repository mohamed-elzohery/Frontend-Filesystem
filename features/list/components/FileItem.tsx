import React from "react";
import type { FileNode } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import {
  Image,
  FileText,
  Video,
  Music,
  File,
  ExternalLink,
  X,
} from "lucide-react";
import ImageViewer from "./viewers/ImageViewer";
import Viewer from "./viewers/Viewer";
import { getFileTypeFromName } from "@/lib/data";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

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
      <DialogPortal>
        {/* Custom transparent overlay with backdrop blur */}
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/20 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        {/* Custom dialog content for file preview */}
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-[95vw] h-[95vh] max-w-none translate-x-[-50%] translate-y-[-50%] gap-0 border-0 bg-white/95 backdrop-blur-sm shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg overflow-hidden"
          )}
        >
          {/* Accessible title - visually hidden */}
          <VisuallyHidden>
            <DialogPrimitive.Title>
              {file.name} - File Preview
            </DialogPrimitive.Title>
          </VisuallyHidden>

          {/* Header */}
          <div className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 p-4 sm:p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-800 min-w-0 flex-1">
                {getFileIcon(file.fileType, file.name)}
                <span className="text-lg font-semibold leading-none tracking-tight truncate">
                  File Preview
                </span>
              </div>
              {/* Close button */}
              <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none bg-white/80 backdrop-blur-sm p-2 hover:bg-white/90 ml-2 flex-shrink-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4 sm:p-6">
            <Viewer file={file} />
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default FileItem;
