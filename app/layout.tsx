import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { Toaster } from "sonner";
import NewButton from "@/features/new/components/NewButton";
import TopBar from "@/features/navigation/components/TopBar";

export const metadata = {
  title: "File Explorer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
        <div className="flex-1 flex flex-col">
          <header className="border-b flex flex-wrap justify-between items-center p-4  gap-4">
            <TopBar />
            <NewButton />
          </header>
          <main className="flex-1 p-4">{children}</main>
        </div>
        <Toaster visibleToasts={1} />
      </body>
    </html>
  );
}
