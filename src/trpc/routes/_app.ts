import { inngest } from '@/inngest/client'
import prisma from '@/lib/db'
import { createTRPCRouter, protectProcedure } from '../init'

export const appRouter = createTRPCRouter({
  testAI: protectProcedure.mutation(async () => {
    await inngest.send({
      name: 'execute/ai',
    })
    return { success: true, message: 'Job queued' }
  }),

  getWorkflows: protectProcedure.query(() => {
    return prisma.workflow.findMany()
  }),

  createWorkflow: protectProcedure.mutation(async () => {
    await inngest.send({
      name: 'app/task.created',
      data: {
        name: 'Mauricio',
        id: '123',
      },
    })

    return prisma.workflow.create({
      data: {
        name: 'test-workflow',
      },
    })
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
