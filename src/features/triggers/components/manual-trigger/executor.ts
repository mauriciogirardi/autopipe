import type { NodeExecutor } from '@/features/executions/types'

type ManualTriggerExecutorData = Record<string, unknown>

export const manualTriggerExecutor: NodeExecutor<ManualTriggerExecutorData> = async ({
  context,
  step,
}) => {
  const result = await step.run('manual-trigger', async () => context)

  return result
}
