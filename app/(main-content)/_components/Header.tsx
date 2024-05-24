"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { PawPrint } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useCallback } from "react";

const Header = () => {
  const pathname = usePathname();

  const checkIfLinkIsActive = useCallback(
    (href: string) => {
      if (pathname.includes(href)) {
        return true;
      }

      return false;
    },
    [pathname]
  );

  return (
    <div className="w-full p-4 flex justify-between items-center border-b-2 border-b-black">
      <div>
        <PawPrint />
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/events"
          className={
            checkIfLinkIsActive("events")
              ? "font-bold"
              : "font-normal"
          }
        >
          События
        </Link>
        <Link
          href="/sponsors"
          className={
            checkIfLinkIsActive("sponsors")
              ? "font-bold"
              : "font-normal"
          }
        >
          Спонсоры
        </Link>
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>DS</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default memo(Header);
