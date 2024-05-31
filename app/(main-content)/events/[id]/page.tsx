import React from "react";
import getEvent from "./_actions/getEvent";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { adminRoutes } from "@/routes/routes";

const page = async ({ params: { id } }: any) => {
  const event = await getEvent(id);

  if (event.error || !event.success) {
    return <div>not found</div>;
  }

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-2">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mb-2">
          {event.success.title}
        </h1>
        <Button asChild>
          <Link href={adminRoutes.editEvent(id)}>
            редактировать событие
          </Link>
        </Button>
      </div>
      <h5>{event.success.description}</h5>
      <div>
        {format(event.success.startDate, "dd/MM/yyyy")}-
        {format(event.success.endDate, "dd/MM/yyyy")}
      </div>
    </div>
  );
};

export default page;
