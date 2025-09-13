import React from "react";
import type { FileNode } from "@/lib/data";

interface VideoViewerProps {
  file: FileNode;
}

const VideoViewer = ({ file }: VideoViewerProps) => {
  const videoSrc = `/${file.id}-${file.name}`;

  return (
    <section className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold">{file.name}</h3>
      <figure className="max-w-full max-h-96 overflow-hidden rounded-lg border">
        <video
          controls
          className="max-w-full max-h-96 object-contain"
          preload="metadata"
          controlsList="download"
        >
          <source src={videoSrc} />
          Your browser does not support the video element.
        </video>
      </figure>
    </section>
  );
};

export default VideoViewer;
