import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { memo } from "react";

type DogCardProps = {
  id: string;
  name: string;
  userId: string;
  onClick: ({
    id,
    name,
    userId,
  }: {
    id: string;
    name: string;
    userId: string;
  }) => void;
};

const DogCard = ({ id, name, userId, onClick }: DogCardProps) => {
  return (
    <Card
      onClick={() => onClick({ id, name, userId })}
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
