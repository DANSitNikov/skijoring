"use server";

import prisma from "@/lib/db";
import { protectedRoutes } from "@/routes/routes";
import { revalidatePath } from "next/cache";

const editDog = async (dogId: string, name: string) => {
  await prisma.dog.update({
    where: { id: dogId },
    data: {
      name,
    },
  });

  revalidatePath(protectedRoutes.myDogs);

  return { success: "Dog Edited!" };
};

export default editDog;
