"use client";
import React from "react";
import dynamic from "next/dynamic";
import type { FileNode } from "@/lib/data";

// Create a wrapper component for the PDF functionality
const PDFViewerClient = dynamic(
  () => import("./PDFViewerClient"),
  { 
    ssr: false,
    loading: () => (
      <section className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-4xl mx-auto">
          <div className="border rounded-lg shadow-2xl bg-white overflow-hidden">
            <div className="p-8 text-center text-gray-500">
              Loading PDF viewer...
            </div>
          </div>
        </div>
      </section>
    )
  }
) as React.ComponentType<{ file: FileNode }>;

interface PDFViewerProps {
  file: FileNode;
}

const PDFViewer = ({ file }: PDFViewerProps) => {
  return <PDFViewerClient file={file} />;
};

export default PDFViewer;
