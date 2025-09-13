import type { PropsWithChildren, ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import AppSidebar from "@/features/navigation/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AsideNav from "@/features/navigation/components/AsideNav";

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
        <SidebarProvider>
          <AppSidebar />
          <AsideNav className="hidden md:block" />
          <section className="flex-1">{children}</section>
          <Toaster visibleToasts={1} />
        </SidebarProvider>
      </body>
    </html>
  );
}
