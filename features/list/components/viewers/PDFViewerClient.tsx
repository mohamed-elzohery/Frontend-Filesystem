"use client";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { FileNode } from "@/lib/data";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the PDF.js worker only on the client side
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PDFViewerClientProps {
  file: FileNode;
}

const PDFViewerClient = ({ file }: PDFViewerClientProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pdfSrc = `/${file.id}-${file.name}`;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    setLoading(false);
  };

  return (
    <section className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            {file.name}
          </h3>
          <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">
            {loading ? "Loading..." : `PDF Document (${numPages} pages)`}
          </p>
        </div>

        <div className="border rounded-lg shadow-2xl bg-white overflow-hidden">
          {error ? (
            <div className="flex flex-col items-center justify-center h-96 p-4 text-center">
              <p className="text-red-600 mb-4 font-semibold">{error}</p>
              <a
                href={pdfSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </a>
            </div>
          ) : (
            <div className="pdf-container">
              <Document
                file={pdfSrc}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="p-8 text-center text-gray-500">
                    Loading document...
                  </div>
                }
                className="flex flex-col items-center"
              >
                {Array.from(new Array(numPages || 0), (el, index) => (
                  <div key={`page_${index + 1}`} className="my-4">
                    <Page
                      pageNumber={index + 1}
                      className="shadow-lg"
                      renderAnnotationLayer={true}
                      renderTextLayer={true}
                    />
                  </div>
                ))}
              </Document>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          {!error && (
            <a
              href={pdfSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
          )}
        </div>
      </div>
    </section>
  );
};

export default PDFViewerClient;
