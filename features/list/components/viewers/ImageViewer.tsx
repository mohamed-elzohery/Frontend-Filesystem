import React from "react";
import type { FileNode } from "@/lib/data";

interface ImageViewerProps {
  file: FileNode;
}

const ImageViewer = ({ file }: ImageViewerProps) => {
  const imageSrc = `/${file.id}-${file.name}`;

  return (
    <section className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold">{file.name}</h3>
      <figure className="max-w-full max-h-96 overflow-hidden rounded-lg border">
        <img
          src={imageSrc}
          alt={file.name}
          className="max-w-full max-h-96 object-contain"
        />
      </figure>
    </section>
  );
};

export default ImageViewer;
