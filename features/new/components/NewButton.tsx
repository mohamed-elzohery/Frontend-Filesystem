import { Plus } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddFolderButton from "./new-folder/AddFolderButton";
import AddFileButton from "./new-file/AddFileButton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const NewButton = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2 items-center group">
          <Plus className="transition-transform duration-300 group-hover:rotate-90" />
          New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem asChild>
          <AddFolderButton />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AddFileButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const NewButtonSkeleton = () => {
  return <Skeleton className="h-10 w-20" />;
};

export default NewButton;
