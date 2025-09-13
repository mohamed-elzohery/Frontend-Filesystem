import React from "react";
import type { FileNode } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageViewer from "./ImageViewer";
import PreviewFallback from "./PreviewFallback";

interface ViewerProps {
  file: FileNode | null;
}

const Viewer = ({ file }: ViewerProps) => {
  if (!file) return null;

  const renderFileViewer = () => {
    switch (file.fileType) {
      case "image":
        return <ImageViewer file={file} />;
      default:
        return <PreviewFallback file={file} />;
    }
  };

  return renderFileViewer();
};

export default Viewer;
