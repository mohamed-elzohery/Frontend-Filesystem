import { findFolder } from "@/lib/data";
import { FolderList } from "@/components/FolderList";
import { notFound } from "next/navigation";
import TopBar from "@/features/navigation/components/TopBar";
import { PropsWithChildren } from "react";
import NewButton from "@/features/new/components/NewButton";

type RootLayoutProps = {
  params: Promise<{ id: string }>;
} & PropsWithChildren;

export default async function Home({ params }: RootLayoutProps) {
  const folder = findFolder((await params).id);

  if (!folder) notFound();
  console.log("Home folder:", folder);
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
