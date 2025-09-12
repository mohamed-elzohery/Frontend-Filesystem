import { Folder, Plus } from "lucide-react";

import React from "react";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";

const NewButton = () => {
  return (
    <details className="dropdown dropdown-bottom dropdown-end">
      <summary className="btn m-1 flex gap-3">
        <Plus /> New
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li>
          <AddFolderButton />
        </li>
        <li>
          <AddFileButton />
        </li>
      </ul>
    </details>
  );
};

export default NewButton;
