"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { protectedRoutes } from "@/routes/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children, ...other }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <Tabs
      value={
        pathname === protectedRoutes.profile ? "profile" : "dogs"
      }
      defaultValue="profile"
      className="w-full"
    >
      <TabsList className="mb-2">
        <TabsTrigger asChild value="profile">
          <Link href={protectedRoutes.profile}>Мой Профиль</Link>
        </TabsTrigger>
        <TabsTrigger value="dogs">
          <Link href={protectedRoutes.myDogs}>Собаки</Link>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default Layout;
