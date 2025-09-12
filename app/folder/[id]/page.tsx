import { findFolder } from "@/lib/data";
import { FolderList } from "@/components/FolderList";
import NewButton from "../../../features/new/components/NewButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FolderPage({ params }: Props) {
  const resolvedParams = await params;
  const folder = findFolder(resolvedParams.id);
  // here to replace file not found page
  if (!folder) {
    return <p>Folder not found</p>;
  }
  return <FolderList nodes={folder.children} />;
}
