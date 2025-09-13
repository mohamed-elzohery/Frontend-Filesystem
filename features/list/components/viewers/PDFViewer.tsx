"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { FileNode } from "@/lib/data";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  file: FileNode;
}

const PDFViewer = ({ file }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
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
    <section className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold">{file.name}</h3>

      <div className="w-full max-w-4xl border rounded-lg overflow-hidden bg-gray-50">
        {error ? (
          <div className="flex flex-col items-center justify-center h-96 p-4">
            <p className="text-red-600 text-center mb-4">{error}</p>
            <a
              href={pdfSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Click here to download the PDF file
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Document
              file={pdfSrc}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<div className="p-4">Loading PDF...</div>}
            >
              <Page pageNumber={pageNumber} />
            </Document>

            {numPages && (
              <div className="flex items-center justify-center gap-4 p-4 bg-white border-t">
                <button
                  onClick={() =>
                    setPageNumber((prevPageNumber) =>
                      Math.max(prevPageNumber - 1, 1)
                    )
                  }
                  disabled={pageNumber <= 1}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-sm font-medium">
                  Page {pageNumber} of {numPages}
                </span>

                <button
                  onClick={() =>
                    setPageNumber((prevPageNumber) =>
                      Math.min(prevPageNumber + 1, numPages || 1)
                    )
                  }
                  disabled={pageNumber >= (numPages || 1)}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          PDF viewer using react-pdf
        </p>
        {!error && (
          <p className="text-xs text-muted-foreground mt-1">
            Navigate using the Previous/Next buttons or{" "}
            <a
              href={pdfSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              open in new tab
            </a>
          </p>
        )}
      </div>
    </section>
  );
};

export default PDFViewer;
