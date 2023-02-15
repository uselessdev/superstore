import { companiesRouter } from './routers/companies'
import { eventsRouter } from './routers/events'
import { mediasRouter } from './routers/medias'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  companies: companiesRouter,
  events: eventsRouter,
  medias: mediasRouter,
})

export type AppRouter = typeof appRouter
