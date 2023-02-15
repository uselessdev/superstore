import { z } from 'zod'
import { createTRPCRouter, protectedProcdedure } from '../trpc'

export const eventsRouter = createTRPCRouter({
  all: protectedProcdedure
    .input(z.object({ company: z.string().cuid() }))
    .query(async ({ ctx }) => {
      const events = await ctx.prisma.event.findMany({
        select: {
          event: true,
          createdAt: true,
          actor: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return events
    }),
})
