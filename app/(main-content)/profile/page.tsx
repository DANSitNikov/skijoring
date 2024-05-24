import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import React from "react";
import MyProfileForm from "./_components/MyProfileForm";
import AddDogCard from "./_components/AddDogCard";

const page = () => {
  return (
    <div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="profile">Мой Профиль</TabsTrigger>
          <TabsTrigger value="dogs">Собаки</TabsTrigger>
        </TabsList>
        <TabsContent
          value="profile"
          className="flex justify-center w-full"
        >
          <MyProfileForm />
        </TabsContent>
        <TabsContent value="dogs">
          <AddDogCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
