import NextAuth, { type NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import { env } from '@/env/server.mjs'
import { prisma } from '../../../server/db'

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }

      return session
    },
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: env.GH_CLIENT_ID,
      clientSecret: env.GH_SECRET_KEY,
    }),
  ],
}

export default NextAuth(authOptions)
