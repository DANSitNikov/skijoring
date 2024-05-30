"use server";

import prisma from "@/lib/db";

const getEvent = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    return { error: "Event Not Found" };
  }

  return { success: event };
};

export default getEvent;
