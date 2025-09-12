"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { addFolder } from "@/lib/actions/add-folder";

interface AddFolderFormProps {
  onSuccess?: () => void;
}

export default function AddFolderForm({ onSuccess }: AddFolderFormProps) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  // Get current folder ID from URL params, default to 'root' if not in a folder page
  const parentFolderId = (params?.id as string) || "root";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      return toast.error("Folder name cannot be empty");
    }
    setIsLoading(true);

    try {
      const result = await addFolder(parentFolderId, trimmedName);

      if (result.success) {
        toast.success(result.message);
        onSuccess?.(); // Close the dialog
        return;
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while creating the folder";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          autoFocus
          type="text"
          placeholder="Enter folder name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}
