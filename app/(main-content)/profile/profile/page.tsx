import React from "react";
import { auth, nextAuthSignOut } from "@/auth";
import { TabsContent } from "@/components/ui/tabs";
import { authRoutes } from "@/routes";
import { Button } from "@/components/ui/button";
import MyProfileForm from "./_components/MyProfileForm";

const page = async () => {
  const session = await auth();

  return (
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
  );
};

export default page;
