"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteDog = async (dogId: string) => {
  await prisma.dog.delete({
    where: { id: dogId },
  });

  revalidatePath("/profile");

  return { success: "Dog Edited!" };
};

export default deleteDog;
