'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { LogoutButton } from './logout-button'

export default function Home() {
  //await requireAuth()
  const trpc = useTRPC()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())

  const create = useMutation(trpc.createWorkflow.mutationOptions())

  const testAI = useMutation(trpc.testAI.mutationOptions())

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2">
      <p>{JSON.stringify(data, null, 2)}</p>
      <div>Protect page</div>
      <LogoutButton />

      <Button onClick={() => create.mutate()}>Create</Button>
      <Button onClick={() => testAI.mutate()}>AI</Button>
    </div>
  )
}
