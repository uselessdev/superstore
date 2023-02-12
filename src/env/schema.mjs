// @ts-check
import { z } from 'zod'

export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === 'production'
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    str => process.env.VERCEL_URL ?? str,
    process.env.VERCEL ? z.string() : z.string().url()
  ),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_SECRET_KEY: z.string(),
})
export const clientSchema = z.object({})

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {}
