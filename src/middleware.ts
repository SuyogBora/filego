import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { auth } from "./lib/auth/auth";

type Session = typeof auth.$Infer.Session;

const AUTH_ROUTES = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
];

export async function middleware(request: NextRequest) {
    if (
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.startsWith('/api') ||
        request.nextUrl.pathname.startsWith('/favicon.ico') ||
        request.nextUrl.pathname.startsWith('/sitemap.xml') ||
        request.nextUrl.pathname.startsWith('/robots.txt')
    ) {
        return NextResponse.next();
    }
    try {
        const { data: session } = await betterFetch<Session>(
            "/api/auth/get-session",
            {
                baseURL: request.nextUrl.origin,
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            },
        );
        const isAuthPage = AUTH_ROUTES.includes(request.nextUrl.pathname);
        const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

        if (session && isAuthPage) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (!session && isDashboardPage) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next();

    } catch (error) {
        if (request.nextUrl.pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
