import { companiesRouter } from './routers/companies'
import { eventsRouter } from './routers/events'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  companies: companiesRouter,
  events: eventsRouter,
})

export type AppRouter = typeof appRouter
