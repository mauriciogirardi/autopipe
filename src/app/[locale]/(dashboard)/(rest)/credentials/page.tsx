import type { Metadata } from 'next'
import { requireAuth } from '@/lib/auth-utils'

export const metadata: Metadata = {
  title: 'Credentials',
}

export default async function CredentialsPage() {
  await requireAuth()

  return (
    <div>
      <p>Credentials</p>
    </div>
  )
}
