import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes/routes";
import authConfig from "./auth.config";
import { middlewarePublicRoutes } from "./routes/middlewareRoutes";
import { match } from "node-match-path";

export const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = Object.values(middlewarePublicRoutes).some(
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

  return null;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
