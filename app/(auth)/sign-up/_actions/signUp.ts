"use server";

import { z } from "zod";
import { SHA256, enc } from "crypto-js";
import signUpFormSchema from "../_schemas/signUpSchema";
import getUserByEmail from "./getUserByEmail";
import prisma from "@/lib/db";

const signUp = async (values: z.infer<typeof signUpFormSchema>) => {
  const validatedFields = signUpFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, ...rest } = validatedFields.data;

  const hashedPassword = SHA256(password);

  const hashedPassword2 = hashedPassword.toString(enc.Hex);

  const existing = await getUserByEmail(email);

  if (existing) {
    return { error: "Email in use" };
  }

  await prisma.user.create({
    data: { email, password: hashedPassword2, ...rest },
  });

  return { success: "Email Sent!" };
};

export default signUp;
