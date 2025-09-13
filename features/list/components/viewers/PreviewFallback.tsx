import React from "react";
import type { FileNode } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

interface PreviewFallbackProps {
  file: FileNode;
}

const PreviewFallback = ({ file }: PreviewFallbackProps) => {
  const fileURL = `/${file.id}-${file.name}`;

  return (
    <div className="text-center py-8 flex flex-col items-center">
      <p className="text-muted-foreground">
        Preview not available for this file type.
      </p>
      <p className="text-sm text-muted-foreground mt-2">File: {file.name}</p>
      <a
        href={fileURL}
        download
        className="flex items-center justify-center mt-4 px-4 py-2 border rounded bg-white hover:bg-gray-50 w-2xl"
      >
        <Download className="w-4 h-4 mr-2 " />
        Download File
      </a>
    </div>
  );
};

export default PreviewFallback;
