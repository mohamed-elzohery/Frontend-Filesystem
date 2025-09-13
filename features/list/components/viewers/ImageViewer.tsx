import React from "react";
import type { FileNode } from "@/lib/data";

interface ImageViewerProps {
  file: FileNode;
}

const ImageViewer = ({ file }: ImageViewerProps) => {
  const imageSrc = `/${file.id}-${file.name}`;

  return (
    <section className="flex flex-col items-center justify-center space-y-6 h-full min-h-[50vh]">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-gray-800">{file.name}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Image File
        </p>
      </div>

      <figure className="w-full flex justify-center">
        <img
          src={imageSrc}
          alt={file.name}
          className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg border border-gray-200"
        />
      </figure>

      <div className="text-center">
        <a
          href={imageSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-green-600 hover:text-green-700 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Open in new tab
        </a>
      </div>
    </section>
  );
};

export default ImageViewer;
