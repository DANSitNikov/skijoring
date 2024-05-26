"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

const getDog = async (id: string) => {
  const session = await auth();

  const dog = await prisma.dog.findUnique({
    where: { id },
  });

  console.log("found it", dog);

  return dog || [];
};

export default getDog;
