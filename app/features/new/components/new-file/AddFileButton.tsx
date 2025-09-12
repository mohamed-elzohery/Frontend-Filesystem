import { File } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddFileButton = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3 w-full text-left px-2 py-1.5 hover:bg-accent rounded-sm">
        <File size={22} />
        New File
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>Enter a name for your new file.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>File creation dialog content goes here...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFileButton;
