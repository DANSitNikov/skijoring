"use server";

import prisma from "@/lib/db";
import { protectedRoutes } from "@/routes/routes";
import { revalidatePath } from "next/cache";

const deleteDog = async (dogId: string) => {
  await prisma.dog.delete({
    where: { id: dogId },
  });

  revalidatePath(protectedRoutes.myDogs);

  return { success: "Dog Edited!" };
};

export default deleteDog;
