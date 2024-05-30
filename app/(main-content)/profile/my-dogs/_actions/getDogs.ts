"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Dog } from "@/types/types";

const sortByDate = (a: Dog, b: Dog) => {
  return b.createdAt.getTime() - a.createdAt.getTime();
};

const getDogs = async () => {
  const session = await auth();

  const dogs = await prisma.dog.findMany({
    where: { userId: session?.user.id },
  });

  const sortedDogs = (dogs || []).sort(sortByDate);

  return sortedDogs;
};

export default getDogs;
