import React from "react";
import EventRegistrationForm from "./_components/EventRegistrationForm";
import { auth } from "@/auth";
import getEvent from "../_actions/getEvent";
import getDogs from "@/app/(main-content)/profile/my-dogs/_actions/getDogs";

const page = async ({ params: { id } }: any) => {
  const event = await getEvent(id);
  const session = await auth();
  const dogs = await getDogs();

  if (!session || !event.success) {
    return null;
  }

  return (
    <div className="space-y-6 max-w-[500px] w-full mx-auto">
      <EventRegistrationForm
        dogs={dogs}
        session={session}
        event={event.success}
      />
    </div>
  );
};

export default page;
