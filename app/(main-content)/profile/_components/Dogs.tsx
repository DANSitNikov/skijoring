"use client";

import React, { useCallback, useMemo, useState } from "react";
import AddDogForm from "./AddDogForm";
import AddDogCard from "./AddDogCard";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import DogCard from "./DogCard";
import EditDogForm from "./EditDogForm";

const Dogs = () => {
  const [isAddDogActive, setIsAddDogActive] = useState(false);
  const [isEditDogActive, setIsEditDogActive] = useState(false);

  const activeForm = useMemo(() => {
    if (isAddDogActive) {
      return <AddDogForm />;
    }

    return <EditDogForm />;
  }, [isAddDogActive]);

  const openAddDogForm = useCallback(() => {
    setIsAddDogActive(true);
  }, []);

  const openEditDogForm = useCallback(() => {
    setIsEditDogActive(true);
  }, []);

  const closeDogForm = useCallback(() => {
    if (isAddDogActive) {
      setIsAddDogActive(false);
    } else {
      setIsEditDogActive(false);
    }
  }, [isAddDogActive]);

  return isAddDogActive || isEditDogActive ? (
    <div className="space-y-4 w-[500px] flex flex-col justify-center">
      <Button onClick={closeDogForm} className="w-10 h-10 p-0">
        <ArrowBigLeft className="w-4 h-4" />
      </Button>
      <div className="flex justify-center w-full">{activeForm}</div>
    </div>
  ) : (
    <div className="w-full space-y-4">
      <AddDogCard onClick={openAddDogForm} />
      {Array.from({ length: 3 }).map((_, index) => (
        <DogCard key={index} onClick={openEditDogForm} />
      ))}
    </div>
  );
};

export default Dogs;
