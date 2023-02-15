import { z } from 'zod'
import S3 from 'aws-sdk/clients/s3'
import { env } from '@/env/server.mjs'
import { createTRPCRouter, protectedProcdedure } from '../trpc'

const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: env.AWS_S3_ACCESS_KEY,
  secretAccessKey: env.AWS_S3_SECRET_KEY,
  region: env.AWS_S3_BUCKET_REGION,
  signatureVersion: 'v4',
})

export const mediasRouter = createTRPCRouter({
  find: protectedProcdedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .query(async ({ input }) => {
      const url = await s3.getSignedUrl('getObject', {
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: input.key,
        Expires: 10,
      })

      return {
        url,
      }
    }),

  create: protectedProcdedure
    .input(
      z.object({
        name: z.string(),
        type: z.string(),
        size: z.number(),
        pathname: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const media = await ctx.prisma.media.create({
        data: {
          pathname: input.pathname,
          size: input.size,
        },
      })

      const url = await s3.getSignedUrl('putObject', {
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: `${input.pathname}${media.id}`,
        Expires: 30,
        ContentType: input.type,
      })

      return {
        url,
      }
    }),
})
