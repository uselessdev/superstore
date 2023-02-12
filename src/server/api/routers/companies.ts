import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import * as CNPJ from '@fnando/cnpj'
import { createTRPCRouter, protectedProcdedure } from '../trpc'

export const companiesRouter = createTRPCRouter({
  find: protectedProcdedure.query(async ({ ctx }) => {
    const company = await ctx.prisma.company.findFirst()

    return company
  }),

  create: protectedProcdedure
    .input(
      z.object({
        tradeName: z.string().min(2, { message: 'name is invalid' }),
        companyName: z.string().min(4, { message: 'company name is invalid' }),
        cnpj: z
          .string()
          .refine(value => CNPJ.isValid(value), { message: 'CNPJ is invalid' }),
        website: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const company = await ctx.prisma.company.create({
          data: input,
        })

        return company
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }
    }),
})
