"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

const getMyEvents = async () => {
  const session = await auth();

  if (!session) {
    return undefined;
  }

  const myEvents = await prisma.attending.findMany({
    where: { userId: session?.user.id },
    include: { event: true },
  });

  return myEvents;
};

export default getMyEvents;
