"use client";
import { Button } from "@/components/ui/button";
import { findFolder } from "@/lib/data";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const BackButton = () => {
  const params = useParams();
  console.log("Params in BackButton:", params);
  if (!params.id) return null;
  const folder = findFolder(params.id as string);
  console.log("Current folder in BackButton:", folder);
  if (!folder || !folder.parentId) return null;
  return <Link href={`/folder/${folder.parentId}`}>Back</Link>;
};

export default BackButton;
