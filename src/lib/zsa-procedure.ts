import { createServerActionProcedure } from "zsa"

export const authedProcedure = createServerActionProcedure()
  .handler(async () => {
    try {
      // const session = await auth.api.getSession({
      //   headers: await headers()
      // })
      // return { session }
    } catch {
      throw new Error("User not authenticated")
    }
  })

