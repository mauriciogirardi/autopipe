import { generateSlug } from 'random-word-slugs'
import z from 'zod'
import { PAGINATION } from '@/constants'
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
    return prisma.workflow.findFirst({
      where: {
        id,
        userId: ctx.auth.user.id,
      },
    })
  }),

  getMany: protectProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(''),
      }),
    )
    .query(async ({ ctx, input: { page, pageSize, search } }) => {
      const [workflows, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          orderBy: {
            updatedAt: 'desc',
          },
        }),
        prisma.workflow.count({
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        }),
      ])

      const totalPages = Math.ceil(totalCount / pageSize)
      const hasNextPage = page < totalPages
      const hasPreviousPage = page > 1

      return {
        workflows,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      }
    }),
})
