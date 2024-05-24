import NextAuth, { DefaultSession } from "next-auth";
import prisma from "./lib/db";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    firstName: string | null;
    lastName: string | null;
    sex: string | null;
    dateOfBirth: Date | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      firstName: string | null;
      lastName: string | null;
      sex: string | null;
      dateOfBirth: Date | null;
    } & DefaultSession["user"];
  }
}

export const {
  handlers,
  signIn: nextAuthSignIn,
  signOut: nextAuthSignOut,
  auth,
} = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (!token.sub) return token;
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.sex = existingUser.sex;
      token.dateOfBirth = existingUser.dateOfBirth;

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub && token.role) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.sex = token.sex;
        session.user.dateOfBirth = token.dateOfBirth;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
