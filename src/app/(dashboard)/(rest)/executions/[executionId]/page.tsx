import { requireAuth } from '@/lib/auth-utils'

interface ExecutionIdPageProps {
  params: Promise<{ executionId: string }>
}

export default async function ExecutionIdPage({ params }: ExecutionIdPageProps) {
  await requireAuth()
  const { executionId } = await params

  return (
    <div>
      <p>Credential ID: {executionId}</p>
    </div>
  )
}
