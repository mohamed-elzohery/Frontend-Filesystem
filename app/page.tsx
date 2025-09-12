import { findFolder } from "@/lib/data";
import { FolderList } from "@/components/FolderList";
import NewButton from "../features/new/components/NewButton";
import { notFound } from "next/navigation";

export default function Home() {
  const folder = findFolder("root");
  if (!folder) notFound();
  return (
    <div className="space-y-4">
      <FolderList nodes={folder.children} />
    </div>
  );
}
