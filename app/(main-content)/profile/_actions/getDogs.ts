"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

const getDogs = async () => {
  const session = await auth();

  const dogs = await prisma.dog.findMany({
    where: { userId: session?.user.id },
  });

  return dogs || [];
};

export default getDogs;
