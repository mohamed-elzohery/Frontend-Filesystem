import { getRecentCache } from "@/lib/cache";
import { FileNode } from "@/lib/data";
import RecentFiles from "@/features/list/components/RecentFiles";
import NewButton from "@/features/new/components/NewButton";

export default async function RecentPage() {
  // Fetch recent files directly on the server
  let recentFiles: FileNode[] = [];
  let error: string | null = null;

  try {
    const cache = getRecentCache();
    recentFiles = cache.getAll();
  } catch (err) {
    console.error("Error fetching recent files:", err);
    error = "Failed to load recent files";
  }

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
        {error ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <RecentFiles files={recentFiles} />
        )}
      </main>
    </div>
  );
}
