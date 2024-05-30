import React from "react";
import EventCard from "./_components/EventCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { protectedRoutes } from "@/routes/routes";
import getEvents from "./_actions/getEvents";

const page = async () => {
  const events = await getEvents();

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-2">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
          События
        </h1>
        <Button asChild>
          <Link href={protectedRoutes.createEvent}>
            создать новое событие
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {events?.map(({ id, title, description }, index) => (
          <EventCard
            key={id}
            id={id}
            title={title}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
