"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { publicRoutes } from "@/routes/routes";
import editEventFormSchema from "../_schemas/editEventFormSchema";

const editEvent = async (
  id: string,
  values: z.infer<typeof editEventFormSchema>
) => {
  const validatedFields = editEventFormSchema.safeParse(values);

  const session = await auth();

  if (!session?.user || !session?.user.id) {
    return { error: "Invalid Fields" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  await prisma.event.update({
    where: { id },
    data: { ...values, userId: session.user.id },
  });

  revalidatePath(publicRoutes.events);

  return { success: "Event Edited!" };
};

export default editEvent;
