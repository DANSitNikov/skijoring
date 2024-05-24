import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { memo } from "react";

type DogCardProps = {
  onClick: () => void;
};

const DogCard = ({ onClick }: DogCardProps) => {
  return (
    <Card onClick={onClick} className="cursor-pointer">
      <CardHeader className="flex items-center justify-center">
        Кличка - Лея
      </CardHeader>
    </Card>
  );
};

export default memo(DogCard);
