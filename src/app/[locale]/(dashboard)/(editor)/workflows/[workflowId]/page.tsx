import { requireAuth } from '@/lib/auth-utils'

interface WorkflowIdPageProps {
  params: Promise<{ workflowId: string }>
}

export default async function WorkflowIdPage({ params }: WorkflowIdPageProps) {
  await requireAuth()
  const { workflowId } = await params

  return (
    <div>
      <p>Workflow ID: {workflowId}</p>
    </div>
  )
}
