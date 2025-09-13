import { findFolder } from "@/lib/data";
import FolderList from "@/features/list/components/FolderList";
import { notFound } from "next/navigation";
import TopBar from "@/features/navigation/components/TopBar";
import NewButton from "@/features/new/components/NewButton";

type FolderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FolderPage({ params }: FolderPageProps) {
  const folder = findFolder((await params).id);

  if (!folder) notFound();
  return (
    <div className="space-y-4">
      <header className="border-b w-full flex-1 flex flex-wrap justify-between items-center p-4  gap-4">
        <TopBar folder={folder} />
        <NewButton />
      </header>
      <main className="flex-1 p-4">
        {<FolderList nodes={folder.children} />}
      </main>
    </div>
  );
}
