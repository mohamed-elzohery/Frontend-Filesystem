import React from "react";
import BackButton from "./BackButton";
import BreadcrumbNavigation from "./breadcrumb";

const TopBar = () => {
  return (
    <nav className=" flex items-center gap-4">
      <BackButton />
      <BreadcrumbNavigation />
    </nav>
  );
};

export default TopBar;
