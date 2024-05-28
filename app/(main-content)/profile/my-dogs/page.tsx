import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import AddDogCard from "./_components/AddDogCard";
import DogCard from "./_components/DogCard";
import getDogs from "./_actions/getDogs";

const page = async () => {
  const dogs = await getDogs();

  return (
    <TabsContent value="dogs" className="flex justify-center w-full">
      <div className="w-full space-y-4">
        <AddDogCard />
        {dogs.map((dog, index) => (
          <DogCard key={dog.id} {...dog} />
        ))}
      </div>
    </TabsContent>
  );
};

export default page;
