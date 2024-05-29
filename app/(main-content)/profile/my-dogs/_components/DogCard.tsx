"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { protectedRoutes } from "@/routes/routes";
import { usePathname, useRouter } from "next/navigation";
import React, { memo } from "react";

type DogCardProps = {
  id: string;
  name: string;
  userId: string;
};

const DogCard = ({ id, name, userId }: DogCardProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(protectedRoutes.editDog(id))}
      className="cursor-pointer"
    >
      <CardHeader className="flex items-center justify-center">
        Кличка - {name}
      </CardHeader>
      <CardDescription>id - {id}</CardDescription>
    </Card>
  );
};

export default memo(DogCard);
