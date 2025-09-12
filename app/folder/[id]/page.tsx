import { findFolder } from "@/lib/data";
import { FolderList } from "@/components/FolderList";
import NewButton from "../../features/new/components/NewButton";

interface Props {
  params: { id: string };
}

export default function FolderPage({ params }: Props) {
  const folder = findFolder(params.id);
  // here to replace file not found page
  if (!folder) {
    return <p>Folder not found</p>;
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{folder.name}</h1>
        <NewButton />
      </div>
      {/* TODO: allow creating files */}
      <FolderList nodes={folder.children} />
    </div>
  );
}
