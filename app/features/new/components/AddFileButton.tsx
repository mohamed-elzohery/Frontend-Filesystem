import { File } from "lucide-react";
import React from "react";

const AddFileButton = () => {
  return (
    <button className="flex items-center gap-3">
      <File size={22} />
      New File
    </button>
  );
};

export default AddFileButton;
