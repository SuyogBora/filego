import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./lib/auth/auth.config";
const protectedRoutes: string[] = ["/workspace"];
const publicRoutes: string[] = ["/auth/login", "/auth/register"];

export default NextAuth(authConfig).auth((req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const session = req.auth;
  console.log()
  const isAuthenticated = !!session;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}