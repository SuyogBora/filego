import { auth } from "@/lib/auth/auth"
import { AuthService } from "@/services/authService"
import { headers } from "next/headers"
import { createServerActionProcedure } from "zsa"

export const authedProcedure = createServerActionProcedure()
  .handler(async () => {
    try {
      const session = await auth.api.getSession({
        headers: await headers()
      })
      return { session }
    } catch {
      throw new Error("User not authenticated")
    }
  })

export const baseProcedure = createServerActionProcedure()
  .handler(async () => {
    const authService = new AuthService();
    return {
      authService
    }
  })
