import { NonRetriableError } from 'inngest'
import { getExecutor } from '@/features/executions/lib/executor-registry'
import prisma from '@/lib/db'
import { inngest } from './client'
import { topologicalSort } from './utils'

export const EVENT_EXECUTE_WORKFLOW = 'workflows/execute.workflow'

export const executeWorkflow = inngest.createFunction(
  { id: 'execute-workflow', triggers: { event: EVENT_EXECUTE_WORKFLOW } },
  async ({ event, step }) => {
    const workflowId = event.data.workflowId

    if (!workflowId) {
      throw new NonRetriableError('Workflow ID is missing.')
    }

    const sortedNodes = await step.run('prepare-workflow', async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: { id: workflowId },
        include: {
          nodes: true,
          connections: true,
        },
      })

      return topologicalSort(workflow.nodes, workflow.connections)
    })

    let context = event.data?.initialData ?? {}

    for (const node of sortedNodes) {
      const executor = getExecutor(node.type)
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
      })
    }

    return {
      workflowId,
      result: context,
    }
  },
)
