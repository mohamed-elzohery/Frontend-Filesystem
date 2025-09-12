import { findFolder } from "@/lib/data";
import { FolderList } from "@/components/FolderList";
import NewButton from "../../../features/new/components/NewButton";

interface Props {
  params: { id: string };
}

export default function FolderPage({ params }: Props) {
  const folder = findFolder(params.id);
  // here to replace file not found page
  if (!folder) {
    return <p>Folder not found</p>;
  }
  return <FolderList nodes={folder.children} />;
}
