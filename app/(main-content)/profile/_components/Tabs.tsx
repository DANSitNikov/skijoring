"use client";

import { Tabs } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

type ProfileTabsProps = {
  children: ReactNode;
};

const ProfileTabs = ({ children }: ProfileTabsProps) => {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab");

  return (
    <Tabs
      value={
        activeTab === "personal-data" || !activeTab
          ? "profile"
          : "dogs"
      }
      defaultValue="profile"
      className="w-full"
    >
      {children}
    </Tabs>
  );
};

export default ProfileTabs;
