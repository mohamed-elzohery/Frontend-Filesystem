"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { FolderOpen, Clock } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

type AsideNavProps = {
  className?: string;
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const AsideNav = ({ className }: AsideNavProps) => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "My Files",
      icon: FolderOpen,
    },
    {
      href: "/recent",
      label: "Recent Files",
      icon: Clock,
    },
  ];

  return (
    <aside
      className={` bg-white border-r border-gray-200 p-2 py-4 w-[15rem] flex flex-col gap-1 ${className}`}
    >
      <nav className="space-y-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  onClick={() => setOpenMobile(false)}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                    isActive
                      ? "bg-blue-50 text-blue-700 "
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-500 group-hover:text-blue-600"
                    }`}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AsideNav;
