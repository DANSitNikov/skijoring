"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import AddDogForm from "./AddDogForm";
import AddDogCard from "./AddDogCard";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import DogCard from "./DogCard";
import EditDogForm from "./EditDogForm";
import getDogs from "../_actions/getDogs";

type DogsProps = {
  dogs: {
    id: string;
    name: string;
    userId: string;
  }[];
};

const Dogs = ({ dogs }: DogsProps) => {
  const [isAddDogActive, setIsAddDogActive] = useState(false);
  const [isEditDogActive, setIsEditDogActive] = useState(false);

  const [dogIdForEdit, setDogIdForEdit] = useState<null | {
    id: string;
    name: string;
    userId: string;
  }>(null);

  const activeForm = useMemo(() => {
    if (isAddDogActive) {
      return <AddDogForm />;
    }

    if (!dogIdForEdit) {
      return null;
    }

    return <EditDogForm dog={dogIdForEdit} />;
  }, [dogIdForEdit, isAddDogActive]);

  const openAddDogForm = useCallback(() => {
    setIsAddDogActive(true);
  }, []);

  const openEditDogForm = useCallback(
    ({
      id,
      name,
      userId,
    }: {
      id: string;
      name: string;
      userId: string;
    }) => {
      setIsEditDogActive(true);
      setDogIdForEdit({ id, name, userId });
    },
    []
  );

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
      {dogs.map((dog, index) => (
        <DogCard key={dog.id} {...dog} onClick={openEditDogForm} />
      ))}
    </div>
  );
};

export default Dogs;
