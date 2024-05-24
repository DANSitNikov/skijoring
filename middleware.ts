import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes";
import authConfig from "./auth.config";

export const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(publicRoutes[0], nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(authRoutes[0], nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
