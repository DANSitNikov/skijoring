"use server";

import { z } from "zod";
import signInFormSchema from "../_schemas/signInSchema";
import getUserByEmail from "../../sign-up/_actions/getUserByEmail";
import { SHA256, enc } from "crypto-js";

const signIn = async (values: z.infer<typeof signInFormSchema>) => {
  const validatedFields = signInFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  var hash = SHA256(password);
  const newHash = hash.toString(enc.Hex);

  if (newHash === existingUser?.password) {
    console.log("hahahha nice!!!");
  } else {
    console.log("noooooooo");
  }

  // try {
  //   await signIn("credentials", {
  //     email,
  //     password,
  //     redirectTo: protectedRoutes[0],
  //   });
  // } catch (err) {
  //   if (err instanceof AuthError) {
  //     switch (err.type) {
  //       case "CredentialsSignin":
  //         return { error: "Invalid credentials" };
  //       default:
  //         return { error: "SMTH went wrong" };
  //     }
  //   }

  //   throw err;
  // }
};

export default signIn;
