import type { Metadata } from 'next'
import { requireAuth } from '@/lib/auth-utils'

export const metadata: Metadata = {
  title: 'Executions',
}

export default async function ExecutionsPage() {
  await requireAuth()

  return (
    <div>
      <p>Executions</p>
    </div>
  )
}
