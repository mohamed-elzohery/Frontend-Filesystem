import { findFolder } from "@/lib/data";
import FolderList from "@/features/list/components/FolderList";
import NewButton from "../features/new/components/NewButton";
import { notFound } from "next/navigation";
import TopBar from "@/features/navigation/components/TopBar";

export const metadata = {
  title: "Home",
  description: "View your recently accessed or modified files",
};

export default async function Home() {
  const folder = findFolder("root");

  if (!folder) notFound();
  return (
    <>
      <header className="border-b flex flex-wrap justify-between items-center p-4  gap-4">
        <TopBar folder={folder} />
        <NewButton />
      </header>
      <main className="flex-1 p-4">
        {<FolderList nodes={folder.children} />}
      </main>
    </>
  );
}
