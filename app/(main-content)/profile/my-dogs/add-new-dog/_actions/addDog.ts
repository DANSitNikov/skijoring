"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import addDogFormSchema from "../_schemas/addDogFormSchema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { protectedRoutes } from "@/routes/routes";

const addDog = async (values: z.infer<typeof addDogFormSchema>) => {
  const validatedFields = addDogFormSchema.safeParse(values);
  const session = await auth();

  if (!session?.user) {
    return { error: "Invalid Fields" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  await prisma.dog.create({
    data: { ...values, userId: session?.user.id || "" },
  });

  revalidatePath(protectedRoutes.myDogs);

  return { success: "Dog Added!" };
};

export default addDog;
