import React from "react";
import EditEventForm from "./_components/EditEventForm";
import getEvent from "../_actions/getEvent";

const page = async ({ params: { id } }: any) => {
  const event = await getEvent(id);

  if (!event || !event.success) {
    return <div>что-то пошло не так</div>;
  }

  return (
    <div className="space-y-6 mx-auto max-w-[500px] w-full">
      <EditEventForm event={event.success} />
    </div>
  );
};

export default page;
