"use server";

import { z } from "zod";
import signInFormSchema from "../_schemas/signInSchema";
import { protectedRoutes, publicRoutes } from "@/routes";
import { AuthError } from "next-auth";
import { nextAuthSignIn } from "@/auth";

const signIn = async (values: z.infer<typeof signInFormSchema>) => {
  const validatedFields = signInFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Не все поля заполнены" };
  }

  const { email, password } = validatedFields.data;

  try {
    await nextAuthSignIn("credentials", {
      email,
      password,
      redirectTo: publicRoutes[0],
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Неправильный email или пароль" };
        default:
          return { error: "Что-то пошло не так" };
      }
    }

    throw err;
  }
};

export default signIn;
