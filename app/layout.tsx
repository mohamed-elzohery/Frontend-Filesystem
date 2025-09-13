import type { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { Toaster } from "sonner";
import NewButton from "@/features/new/components/NewButton";
import TopBar from "@/features/navigation/components/TopBar";
import { findFolder } from "@/lib/data";

export const metadata = {
  title: "File Explorer",
};

type RootLayoutProps = {
  params: Promise<{ id: string }>;
} & PropsWithChildren;

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="h-full flex">
        <aside className="w-32 bg-gray-100 p-2 flex flex-col gap-2">
          <Link href="/" className="btn">
            My Files
          </Link>
          <Link href="/recent" className="btn">
            Recent
          </Link>
        </aside>
        <section className="flex-1">{children}</section>
        <Toaster visibleToasts={1} />
      </body>
    </html>
  );
}
