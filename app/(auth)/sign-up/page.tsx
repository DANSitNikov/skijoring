import React from "react";
import SignUpForm from "./_components/SignUpForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="space-y-6 max-w-[500px] w-full">
      <SignUpForm />
      <Button
        variant="link"
        className="font-normal w-full"
        size="sm"
        asChild
      >
        <Link href="/sign-in">Уже Есть Аккаунт? Войдите!</Link>
      </Button>
    </div>
  );
};

export default page;
