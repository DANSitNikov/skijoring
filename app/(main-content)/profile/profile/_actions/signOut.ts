"use server";

import { nextAuthSignOut } from "@/auth";
import { authRoutes } from "@/routes/routes";
import { AuthError } from "next-auth";

const signOut = async () => {
  try {
    await nextAuthSignOut({ redirectTo: authRoutes.signIn });
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

export default signOut;
