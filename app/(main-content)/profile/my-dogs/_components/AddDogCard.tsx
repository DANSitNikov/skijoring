"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { memo } from "react";

const AddDogCard = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(pathname + "/add-new-dog")}
      className="cursor-pointer"
    >
      <CardHeader className="flex items-center justify-center">
        <Plus className="w-10 h-10" />
      </CardHeader>
    </Card>
  );
};

export default memo(AddDogCard);
