import { generateSlug } from 'random-word-slugs'
import z from 'zod'
import prisma from '@/lib/db'
import { createTRPCRouter, premiumProcedure, protectProcedure } from '@/trpc/init'

export const workflowsRouter = createTRPCRouter({
  create: premiumProcedure.mutation(({ ctx }) => {
    return prisma.workflow.create({
      data: {
        userId: ctx.auth.user.id,
        name: generateSlug(3),
      },
    })
  }),

  remove: protectProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input: { id } }) => {
      return prisma.workflow.delete({
        where: {
          userId: ctx.auth.user.id,
          id,
        },
      })
    }),

  updateName: protectProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(({ ctx, input: { id, name } }) => {
      return prisma.workflow.update({
        where: {
          userId: ctx.auth.user.id,
          id,
        },
        data: {
          name,
        },
      })
    }),

  getOne: protectProcedure.input(z.object({ id: z.string() })).query(({ ctx, input: { id } }) => {
    return prisma.workflow.findUnique({
      where: {
        id,
        userId: ctx.auth.user.id,
      },
    })
  }),

  getMany: protectProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    })
  }),
})
