import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string
    }
    interface Session {
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
    }
}

declare module "next/server" {
  interface NextRequest {
      auth?: Session | null; 
  }
}