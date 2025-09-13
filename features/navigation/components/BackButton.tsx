"use client";
import { Button } from "@/components/ui/button";
import { FolderNode } from "@/lib/data";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type BackButtonProps = {
  parentId?: string;
};

const BackButton = ({ parentId }: BackButtonProps) => {
  if (!parentId) return null;
  return (
    <Link
      className="flex gap-2"
      href={parentId === "root" ? "/" : `/folder/${parentId}`}
    >
      <ArrowLeft />
      Back
    </Link>
  );
};

export default BackButton;
