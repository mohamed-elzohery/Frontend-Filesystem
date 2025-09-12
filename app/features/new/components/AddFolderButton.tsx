import Modal from "@/ui/Modal";
import { Folder } from "lucide-react";
import React from "react";

const AddFolderButton = () => {
  return (
    <Modal
      TriggererContent={
        <div className="flex items-center gap-3">
          <Folder size={22} />
          New Folder
        </div>
      }
    >
      <h3 className="font-bold text-lg">Hello!</h3>
      <p className="py-4">Press ESC key or click the button below to close</p>
    </Modal>
  );
};

export default AddFolderButton;
