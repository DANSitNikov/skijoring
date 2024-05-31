"use server";

import { auth, nextAuthSignOut } from "@/auth";
import { authRoutes, protectedRoutes } from "@/routes/routes";
import { AuthError } from "next-auth";
import myProfileFormSchema from "../schemas/myProfileFormSchema";
import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

const updateProfile = async (
  values: z.infer<typeof myProfileFormSchema>
) => {
  const validatedFields = myProfileFormSchema.safeParse(values);

  const session = await auth();

  if (!session?.user || !session?.user.id) {
    return { error: "Invalid Fields" };
  }

  if (!validatedFields.success) {
    return { error: "Не все поля заполнены" };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: values,
  });

  revalidatePath(protectedRoutes.profile);

  return { success: "Данные Обновлены" };
};

export default updateProfile;
