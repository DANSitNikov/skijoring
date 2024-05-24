import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import React from "react";
import MyProfileForm from "./_components/MyProfileForm";
import Dogs from "./_components/Dogs";

const page = () => {
  console.log("deploy please");
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
        <TabsContent
          value="dogs"
          className="flex justify-center w-full"
        >
          <Dogs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
