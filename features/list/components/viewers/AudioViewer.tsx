import React from "react";
import type { FileNode } from "@/lib/data";

interface AudioViewerProps {
  file: FileNode;
}

const AudioViewer = ({ file }: AudioViewerProps) => {
  const audioSrc = `/${file.id}-${file.name}`;

  return (
    <section className="flex flex-col items-center justify-center space-y-6 h-full min-h-[50vh]">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-gray-800">{file.name}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Audio File
        </p>
      </div>

      <figure className="w-full max-w-2xl">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg border border-orange-200">
          <audio
            controls
            className="w-full h-12 rounded-lg"
            preload="metadata"
            controlsList="download"
          >
            <source src={audioSrc} />
            Your browser does not support the audio element.
          </audio>
        </div>
      </figure>

      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          Use the controls above to play the audio file
        </p>
        <a
          href={audioSrc}
          download
          className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 transition-colors"
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
          Download Audio
        </a>
      </div>
    </section>
  );
};

export default AudioViewer;
