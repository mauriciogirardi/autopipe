'use client'

import { FlaskConicalIcon, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useExecuteWorkflow } from '@/features/workflows/hooks/use-workflows'

type ExecuteWorkflowButtonProps = {
  workflowId: string
}

export const ExecuteWorkflowButton = ({ workflowId }: ExecuteWorkflowButtonProps) => {
  const executeWorkflow = useExecuteWorkflow()

  const handleExecute = () => {
    executeWorkflow.mutate({ id: workflowId })
  }

  return (
    <Button size="lg" onClick={handleExecute} disabled={executeWorkflow.isPending}>
      {executeWorkflow.isPending ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        <FlaskConicalIcon className="size-4" />
      )}
      Execute workflow
    </Button>
  )
}
