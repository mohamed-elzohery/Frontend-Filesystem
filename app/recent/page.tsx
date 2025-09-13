import { getRecentCache } from "@/lib/cache";
import { FileNode } from "@/lib/data";
import RecentFiles from "@/features/list/components/RecentFiles";
import NewButton from "@/features/new/components/NewButton";
import TopBar from "@/features/navigation/components/TopBar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const metadata = {
  title: "Recent Files",
  description: "View your recently accessed or modified files",
};

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
      <header className="border-b flex flex-wrap justify-between items-center p-4  gap-4">
        <nav className=" flex items-center gap-4">
          <SidebarTrigger className="md:hidden flex" />
          <h1 className="text-lg font-semibold">Recent Files</h1>
        </nav>
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
