"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import createEventFormSchema from "../schemas/createEventFormSchema";
import { publicRoutes } from "@/routes/routes";

const createEvent = async (
  values: z.infer<typeof createEventFormSchema>
) => {
  const validatedFields = createEventFormSchema.safeParse(values);

  const session = await auth();

  if (!session?.user || !session?.user.id) {
    return { error: "Invalid Fields" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  await prisma.event.create({
    data: {
      ...values,
      createdBy: { connect: { id: session.user.id } },
    },
  });

  revalidatePath(publicRoutes.events);

  return { success: "Event Added!" };
};

export default createEvent;
