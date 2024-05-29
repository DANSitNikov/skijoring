"use client";

import React from "react";
import EditDogForm from "./_components/EditDogForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { protectedRoutes } from "@/routes/routes";

const Page = ({ params }: any) => {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => router.push(protectedRoutes.myDogs)}
        className="w-10 h-10 p-0"
      >
        <ArrowBigLeft className="w-4 h-4" />
      </Button>
      <EditDogForm dogId={params.dogId} />
    </div>
  );
};

export default Page;
