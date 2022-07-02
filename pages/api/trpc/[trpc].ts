import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { z } from "zod"

export const appRouter = trpc
  .router()
  .query("test", {
    input: z.string().nullish(),
    resolve({input}){
      return {
        message: `Hello ${input ?? 'anonymous'}`
      }
    }
  })

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null
})