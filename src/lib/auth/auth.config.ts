import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { SignInFormSchema } from "../schema-validations/auth";

const publicRoutes = ["/auth/signin", "/auth/signup"];
const authRoutes = ["/auth/signin", "/auth/signup"];

export default {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                let user = null;

                const parsedCredentials = SignInFormSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    console.error("Invalid credentials:", parsedCredentials.error.errors);
                    return null;
                }

                user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!user) {
                    console.log("Invalid credentials");
                    return null;
                }

                if (!user.password) {
                    console.log("User has no password. They probably signed up with an oauth provider.");
                    return null;
                }

                const isPasswordValid = await bcryptjs.compare(credentials.password as string, user.password);
                if (!isPasswordValid) {
                    console.log("Invalid password");
                    return null;
                }

                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
        })
    ],
    jwt:{
        maxAge:7 * 24 * 60 * 60 // suyog writing : 7 days valid jwt
    },
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;

            if (publicRoutes.includes(pathname)) {
                return true;
            }
            if (authRoutes.includes(pathname)) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/', nextUrl));
                }
                return true;
            }

            return isLoggedIn;
        },
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id as string;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id;
            return session;
        }
    },
    pages: {
        signIn: "/auth/login"
    }
    
} satisfies NextAuthConfig;