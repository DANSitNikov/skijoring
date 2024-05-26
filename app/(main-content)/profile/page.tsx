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
import Link from "next/link";
import ProfileTabs from "./_components/Tabs";

const page = async () => {
  const session = await auth();

  const dogs = await getDogs();

  return (
    <div>
      <ProfileTabs>
        <TabsList className="mb-2">
          <TabsTrigger asChild value="profile">
            <Link href="/profile?tab=personal-data">Мой Профиль</Link>
          </TabsTrigger>
          <TabsTrigger value="dogs">
            <Link href="/profile?tab=my-dogs">Собаки</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="profile"
          className="flex flex-col items-center w-full"
        >
          <MyProfileForm session={session} />
          <form
            action={async () => {
              "use server";

              await nextAuthSignOut({
                redirectTo: authRoutes[0],
              });
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
      </ProfileTabs>
    </div>
  );
};

export default page;
