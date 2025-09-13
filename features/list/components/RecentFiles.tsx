import { FileNode } from "@/lib/data";
import FolderList from "@/features/list/components/FolderList";

type RecentFilesProps = {
  files: FileNode[];
};

export default function RecentFiles({ files }: RecentFilesProps) {
  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-500">No recent files found</p>
      </div>
    );
  }

  return <FolderList nodes={files} />;
}
