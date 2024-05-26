"use client";

import { Tabs } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type ProfileTabsProps = {
  children: ReactNode;
};

const ProfileTabs = ({ children }: ProfileTabsProps) => {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/dogs");
      const result = await response.json();
      console.log({ result });
    };

    fetchData();
  }, []);

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
