import React from "react";
import { TopBarSkeleton } from "@/features/navigation/components/TopBar";
import { NewButtonSkeleton } from "@/features/new/components/NewButton";
import { FolderListSkeleton } from "@/features/list/components/FolderList";

const loading = () => {
  return (
    <div className="space-y-4">
      <header className="border-b w-full flex-1 flex flex-wrap justify-between items-center p-4 gap-4">
        <TopBarSkeleton />
        <NewButtonSkeleton />
      </header>
      <main className="flex-1 p-4">
        <FolderListSkeleton />
      </main>
    </div>
  );
};

export default loading;
