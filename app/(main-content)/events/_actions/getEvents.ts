"use server";

import prisma from "@/lib/db";
import { Event } from "@prisma/client";

const sortByDate = (a: Event, b: Event) => {
  return b.startDate.getTime() - a.startDate.getTime();
};

const getEvents = async () => {
  const events = await prisma.event.findMany();

  const sortedEvents = (events || []).sort(sortByDate);

  return sortedEvents;
};

export default getEvents;
