"use client";

import { auth } from "@/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "@/routes/routes";
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
        <Link href={publicRoutes.events}>
          <PawPrint />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href={publicRoutes.events}
          className={
            checkIfLinkIsActive(publicRoutes.events)
              ? "font-bold"
              : "font-normal"
          }
        >
          События
        </Link>
        {!!session && (
          <Link
            href={protectedRoutes.myEvents}
            className={
              checkIfLinkIsActive(protectedRoutes.myEvents)
                ? "font-bold"
                : "font-normal"
            }
          >
            Мои события
          </Link>
        )}
      </div>
      <div>
        {session ? (
          <Link
            href={protectedRoutes.profile}
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
            <Link href={authRoutes.signIn}>
              Войти/Зарегистрироваться
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
