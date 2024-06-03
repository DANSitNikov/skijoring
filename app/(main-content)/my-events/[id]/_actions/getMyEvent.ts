"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { error } from "console";

const getMyEvent = async (id: string) => {
  const myEvent = await prisma.attending.findUnique({
    where: { id },
    include: { event: true },
  });

  if (!myEvent) {
    return { error: "Событие не найдено" };
  }

  return { success: myEvent };
};

export default getMyEvent;
