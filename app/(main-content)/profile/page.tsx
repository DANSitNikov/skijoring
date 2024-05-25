import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import React from "react";
import MyProfileForm from "./_components/MyProfileForm";
import Dogs from "./_components/Dogs";
import { auth, nextAuthSignOut } from "@/auth";
import { Button } from "@/components/ui/button";
import signOut from "./_actions/signOut";
import { authRoutes } from "@/routes";
import getDogs from "./_actions/getDogs";

const page = async () => {
  const session = await auth();

  const dogs = await getDogs();

  console.log("dogs in return", dogs);

  return (
    <div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="profile">Мой Профиль</TabsTrigger>
          <TabsTrigger value="dogs">Собаки</TabsTrigger>
        </TabsList>
        <TabsContent
          value="profile"
          className="flex flex-col items-center w-full"
        >
          <MyProfileForm session={session} />
          <form
            action={async () => {
              "use server";

              await nextAuthSignOut({ redirectTo: authRoutes[0] });
            }}
          >
            <Button
              type="submit"
              className="bg-red-600 text-white mt-2 w-[500px]"
            >
              Выйти
            </Button>
          </form>
        </TabsContent>
        <TabsContent
          value="dogs"
          className="flex justify-center w-full"
        >
          <Dogs dogs={dogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
