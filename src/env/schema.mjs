// @ts-check
import { z } from 'zod'

export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
})
export const clientSchema = z.object({})

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {}
