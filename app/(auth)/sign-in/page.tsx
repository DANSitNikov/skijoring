import React from "react";
import SignInForm from "./_components/SignInForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="space-y-6 max-w-[500px] w-full">
      <SignInForm />
      <Button
        variant="link"
        className="font-normal w-full"
        size="sm"
        asChild
      >
        <Link href="/sign-up">Нет Аккаунта? Создайте!</Link>
      </Button>
    </div>
  );
};

export default page;
