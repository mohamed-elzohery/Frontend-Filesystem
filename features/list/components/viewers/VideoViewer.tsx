import React from "react";
import type { FileNode } from "@/lib/data";

interface VideoViewerProps {
  file: FileNode;
}

const VideoViewer = ({ file }: VideoViewerProps) => {
  const videoSrc = `/${file.id}-${file.name}`;

  return (
    <section className="flex flex-col items-center justify-center space-y-6 h-full min-h-[50vh]">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-gray-800">{file.name}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Video File
        </p>
      </div>

      <figure className="w-full flex justify-center">
        <video
          controls
          className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg border border-gray-200"
          preload="metadata"
          controlsList="download"
        >
          <source src={videoSrc} />
          Your browser does not support the video element.
        </video>
      </figure>

      <div className="text-center">
        <a
          href={videoSrc}
          download
          className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 transition-colors"
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Video
        </a>
      </div>
    </section>
  );
};

export default VideoViewer;
