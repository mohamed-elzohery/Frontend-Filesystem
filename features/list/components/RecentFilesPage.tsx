"use client";

import { useEffect, useState } from "react";
import { FileNode } from "@/lib/data";
import FolderList from "@/features/list/components/FolderList";
import NewButton from "@/features/new/components/NewButton";

export default function RecentFilesPage() {
  const [recentFiles, setRecentFiles] = useState<FileNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentFiles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/recent");
        const data = await response.json();

        if (data.success) {
          setRecentFiles(data.files);
        } else {
          setError(data.message || "Failed to load recent files");
        }
      } catch (err) {
        console.error("Error fetching recent files:", err);
        setError("Failed to load recent files");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentFiles();
  }, []);

  return (
    <div className="space-y-4">
      <header className="border-b w-full flex-1 flex flex-wrap justify-between items-center p-4 gap-4">
        <div className="flex items-center space-x-2 text-gray-800">
          <h1 className="text-xl font-semibold leading-none tracking-tight">
            Recent Files
          </h1>
        </div>
        <NewButton />
      </header>
      <main className="flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">Loading recent files...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : recentFiles.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">No recent files found</p>
          </div>
        ) : (
          <FolderList nodes={recentFiles} />
        )}
      </main>
    </div>
  );
}
