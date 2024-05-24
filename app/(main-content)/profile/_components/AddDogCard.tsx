import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { memo } from "react";

type AddDogCardProps = {
  onClick: () => void;
};

const AddDogCard = ({ onClick }: AddDogCardProps) => {
  return (
    <Card onClick={onClick} className="cursor-pointer">
      <CardHeader className="flex items-center justify-center">
        <Plus className="w-10 h-10" />
      </CardHeader>
    </Card>
  );
};

export default memo(AddDogCard);
