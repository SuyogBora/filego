import { createServerActionProcedure } from "zsa"
import { auth } from "./auth/auth"

export const authedProcedure = createServerActionProcedure()
  .handler(async () => {
    const session = await auth()
    if (!session) {
      throw new Error("User Is Not Authorised")
    }
    if (!session.user ||
      !session.user.id ||
      !session.user.email
    ) {
      throw new Error("Invalid User Data")
    }
    return {
      session: {
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image
        }
      }
    }
  })