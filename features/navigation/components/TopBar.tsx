import React from "react";
import BackButton from "./BackButton";
import { FolderNode } from "@/lib/data";
import { SidebarTrigger } from "@/components/ui/sidebar";

type TopBarProps = {
  folder?: FolderNode | null;
};

const TopBar = ({ folder }: TopBarProps) => {
  return (
    <nav className=" flex items-center gap-4">
      <SidebarTrigger className="md:hidden flex" />
      <BackButton parentId={folder?.parentId} />
      <h1 className="text-lg font-semibold">{folder?.name || "Home"}</h1>
    </nav>
  );
};

export default TopBar;
