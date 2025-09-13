import React from "react";
import type { FileNode } from "@/lib/data";

interface AudioViewerProps {
  file: FileNode;
}

const AudioViewer = ({ file }: AudioViewerProps) => {
  const audioSrc = `/${file.id}-${file.name}`;

  return (
    <section className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold">{file.name}</h3>
      <figure className="w-full max-w-lg">
        <audio
          controls
          className="w-full"
          preload="metadata"
          controlsList="download"
        >
          <source src={audioSrc} />
          Your browser does not support the audio element.
        </audio>
      </figure>
    </section>
  );
};

export default AudioViewer;
