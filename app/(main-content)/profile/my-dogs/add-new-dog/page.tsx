"use client";

import React from "react";
import AddDogForm from "./_components/AddDogForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => router.push("/profile/my-dogs")}
        className="w-10 h-10 p-0"
      >
        <ArrowBigLeft className="w-4 h-4" />
      </Button>
      <AddDogForm />
    </div>
  );
};

export default Page;
