"use client";

import { File } from "lucide-react";
import React, { useRef } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addFile } from "../../actions/add-file";
import { Button } from "@/components/ui/button";

const AddFileButton = () => {
  const params = useParams();

  const parentFolderId = (params?.id as string) || "root";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 1024 * 1024; // 1MB
    if (file.size > maxSizeInBytes) {
      toast.error(
        `File size exceeds the maximum limit of 1MB. Current file size: ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB`
      );
      return;
    }

    // Show uploading toast
    toast.info("File is uploading...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await addFile(parentFolderId, formData);

      if (result && result.success) {
        toast.success(result.message);
      } else if (result && !result.success) {
        toast.error(result.message);
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An unexpected error occurred while uploading the file");
    }
  };

  return (
    <Button variant={"ghost"} className="w-full p-0 justify-start">
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
    </Button>
  );
};

export default AddFileButton;
