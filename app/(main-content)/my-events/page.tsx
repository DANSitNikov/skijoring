import React from "react";
import getMyEvents from "./_actions/getMyEvents";
import EventCard from "./_components/EventCard";

const page = async () => {
  const myEvents = await getMyEvents();

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
        События
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {myEvents?.map(
          ({ id, event: { title, description } }, index) => (
            <EventCard
              key={id}
              id={id}
              title={title}
              description={description}
            />
          )
        )}
      </div>
    </div>
  );
};

export default page;
