import authConfig from "@/lib/auth/auth.config";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes:string[] = [];
const publicRoutes:string[] = ["/auth/login", "/auth/signup"];

export default NextAuth(authConfig).auth((req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const session = req.auth;
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
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
};