import Credentials from "next-auth/providers/credentials";
import { type NextAuthConfig } from "next-auth";
import prisma from "./lib/db";
import signInFormSchema from "./app/(auth)/sign-in/_schemas/signInSchema";
import getUserByEmail from "./app/(auth)/sign-up/_actions/getUserByEmail";
import { SHA256, enc } from "crypto-js";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCreds =
          signInFormSchema.safeParse(credentials);

        if (validatedCreds.success) {
          const { email, password } = validatedCreds.data;

          const existingUser = await getUserByEmail(email);

          if (!existingUser || !existingUser.password) {
            return null;
          }

          const hashedPassword = SHA256(password).toString(enc.Hex);

          if (existingUser.password === hashedPassword) {
            return existingUser;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
