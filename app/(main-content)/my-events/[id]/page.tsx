import React from "react";
import { format } from "date-fns";
import getMyEvent from "./_actions/getMyEvent";

const page = async ({ params: { id } }: any) => {
  const myEvent = await getMyEvent(id);

  if (myEvent.error || !myEvent.success) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mb-2">
        {myEvent.success.event.title}
      </h1>
      <h5>{myEvent.success.event.description}</h5>
      <div>
        {format(myEvent.success.event.startDate, "dd/MM/yyyy")}-
        {format(myEvent.success.event.endDate, "dd/MM/yyyy")}
      </div>
    </div>
  );
};

export default page;
