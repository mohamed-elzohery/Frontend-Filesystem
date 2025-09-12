"use client";

import { File } from "lucide-react";
import React, { useRef } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addFile } from "../../actions/add-file";

const AddFileButton = () => {
  const params = useParams();

  // Get current folder ID from URL params, default to 'root' if not in a folder page
  const parentFolderId = (params?.id as string) || "root";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show uploading toast
    toast.info("File is uploading...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await addFile(parentFolderId, formData);

      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while uploading the file";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <label
        htmlFor="file-upload"
        className="flex items-center gap-3 w-full text-left px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer"
      >
        <File size={22} />
        New File
      </label>
      <Input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        style={{ display: "none" }}
        id="file-upload"
      />
    </>
  );
};

export default AddFileButton;
