import { createNextApiHandler } from '@trpc/server/adapters/next'
import { env } from '@/env/server.mjs'
import { createTRPCContext } from '@/server/api/trpc'
import { appRouter } from '@/server/api/root'

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.log(`tRPC failed on ${path}: ${error}`)
        }
      : undefined,
})
