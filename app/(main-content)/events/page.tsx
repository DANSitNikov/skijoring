import React from "react";
import EventCard from "./_components/EventCard";

const page = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mb-2">
        События
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <EventCard key={index} id={index} />
        ))}
      </div>
    </div>
  );
};

export default page;
