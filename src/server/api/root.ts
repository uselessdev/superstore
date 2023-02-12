import { companiesRouter } from './routers/companies'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  companies: companiesRouter,
})

export type AppRouter = typeof appRouter
