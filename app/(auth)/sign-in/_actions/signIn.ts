"use server";

import { z } from "zod";
import signInFormSchema from "../_schemas/signInSchema";
import { protectedRoutes, publicRoutes } from "@/routes";
import { AuthError } from "next-auth";
import { nextAuthSignIn } from "@/auth";

const signIn = async (values: z.infer<typeof signInFormSchema>) => {
  const validatedFields = signInFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
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
          return { error: "Invalid credentials" };
        default:
          return { error: "SMTH went wrong" };
      }
    }

    throw err;
  }
};

export default signIn;
