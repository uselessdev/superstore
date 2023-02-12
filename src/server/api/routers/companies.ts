import { createTRPCRouter, protectedProcdedure } from '../trpc'

export const companiesRouter = createTRPCRouter({
  find: protectedProcdedure.query(async ({ ctx }) => {
    const company = await ctx.prisma.company.findFirst()

    return company
  }),
})
