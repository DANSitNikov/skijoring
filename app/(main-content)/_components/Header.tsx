"use client";

import { auth } from "@/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useCallback } from "react";

const Header = ({ session }: { session: Session | null }) => {
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
        {session ? (
          <Link
            href="/profile"
            className={
              checkIfLinkIsActive("profile")
                ? "[&_span]:border-2 [&_span]:border-blue-600"
                : "[&_span]:border-0"
            }
          >
            <Avatar>
              {/* <AvatarImage src="" /> */}
              <AvatarFallback>
                {session?.user.firstName
                  ? session?.user.firstName[0]
                  : "?"}
                {session?.user.lastName
                  ? session?.user.lastName[0]
                  : "?"}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
          >
            <Link href="/sign-in">Войти/Зарегистрироваться</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
