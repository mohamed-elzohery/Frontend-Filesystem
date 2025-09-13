import React from "react";
import ImageViewer from "./ImageViewer";
import PDFViewer from "./PDFViewer";
import AudioViewer from "./AudioViewer";
import VideoViewer from "./VideoViewer";
import PreviewFallback from "./PreviewFallback";
import { getFileTypeFromName } from "@/lib/data";

interface ViewerProps {
  file: FileNode | null;
}

// Configuration object for file type viewers
const FILE_VIEWERS = {
  image: ImageViewer,
  pdf: PDFViewer,
  audio: AudioViewer,
  video: VideoViewer,
} as const;

type FileType = keyof typeof FILE_VIEWERS;

const Viewer = ({ file }: ViewerProps) => {
  if (!file) return null;

  // Check file type both from stored fileType and from filename
  const fileType = file.fileType || getFileTypeFromName(file.name);

  // Get the appropriate viewer component or fallback
  const ViewerComponent = FILE_VIEWERS[fileType as FileType] || PreviewFallback;

  return <ViewerComponent file={file} />;
};

export default Viewer;
