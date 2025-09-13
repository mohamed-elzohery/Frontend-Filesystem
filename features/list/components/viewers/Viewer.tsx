import React from "react";
import type { FileNode } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageViewer from "./ImageViewer";
import PDFViewer from "./PDFViewer";
import AudioViewer from "./AudioViewer";
import VideoViewer from "./VideoViewer";
import PreviewFallback from "./PreviewFallback";
import { getFileTypeFromName } from "@/lib/data";

interface ViewerProps {
  file: FileNode | null;
}

const Viewer = ({ file }: ViewerProps) => {
  if (!file) return null;

  const renderFileViewer = () => {
    // Check file type both from stored fileType and from filename
    const fileType = file.fileType || getFileTypeFromName(file.name);

    switch (fileType) {
      case "image":
        return <ImageViewer file={file} />;
      case "pdf":
        return <PDFViewer file={file} />;
      case "audio":
        return <AudioViewer file={file} />;
      case "video":
        return <VideoViewer file={file} />;
      default:
        return <PreviewFallback file={file} />;
    }
  };

  return renderFileViewer();
};

export default Viewer;
