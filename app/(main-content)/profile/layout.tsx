"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children, ...other }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <Tabs
      value={pathname === "/profile/profile" ? "profile" : "dogs"}
      defaultValue="profile"
      className="w-full"
    >
      <TabsList className="mb-2">
        <TabsTrigger asChild value="profile">
          <Link href="/profile/profile">Мой Профиль</Link>
        </TabsTrigger>
        <TabsTrigger value="dogs">
          <Link href="/profile/my-dogs">Собаки</Link>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default Layout;
