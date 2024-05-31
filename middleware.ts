import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes/routes";
import authConfig from "./auth.config";
import {
  middlewareAdminRoutes,
  middlewarePublicRoutes,
} from "./routes/middlewareRoutes";
import { match } from "node-match-path";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

export const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const token = await getToken({
    req: req,
    // @ts-ignore
    secret: process.env.AUTH_SECRET,
  });

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = Object.values(middlewarePublicRoutes).some(
    (url) => match(url, nextUrl.pathname).matches
  );
  const isAdminRoute = Object.values(middlewareAdminRoutes).some(
    (url) => match(url, nextUrl.pathname).matches
  );
  const isAuthRoutes = Object.values(authRoutes).includes(
    nextUrl.pathname
  );

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(publicRoutes.events, nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(authRoutes.signIn, nextUrl));
  }

  if (isAdminRoute && token?.role !== UserRole.ADMIN) {
    return Response.redirect(new URL(publicRoutes.events, nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
