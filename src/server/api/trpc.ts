import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { type Session } from 'next-auth'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

import { getServerAuthSession } from '../auth'
import { prisma } from '../db'

type CreateContextOptions = {
  session: Session | null
}

const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  }
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts

  const session = await getServerAuthSession({ req, res })

  return await createInnerTRPCContext({
    session,
  })
}

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape
    },
  })

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

export const protectedProcdedure = t.procedure.use(enforceUserIsAuthed)
