import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({})

export type AppRouter = typeof appRouter
