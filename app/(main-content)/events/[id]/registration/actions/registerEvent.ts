"use server";

import { revalidatePath } from "next/cache";
import eventRegistrationFormSchema from "../_schemas/eventRegistrationFormSchema";
import { protectedRoutes } from "@/routes/routes";
import { z } from "zod";
import prisma from "@/lib/db";

const registerEvent = async (
  values: z.infer<typeof eventRegistrationFormSchema>
) => {
  const validatedFields =
    eventRegistrationFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const attendance = await prisma.attending.create({
    data: {
      event: { connect: { id: values.eventId } },
      user: { connect: { id: values.userId } },
      dogs: {
        create: [{ dog: { connect: { id: values.dogId } } }],
      },
    },
  });

  revalidatePath(protectedRoutes.myEvents);

  return { success: "Event Edited!" };
};

export default registerEvent;
