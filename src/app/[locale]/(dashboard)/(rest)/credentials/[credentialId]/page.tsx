import { requireAuth } from '@/lib/auth-utils'

interface CredentialIdPageProps {
  params: Promise<{ credentialId: string }>
}

export default async function CredentialIdPage({ params }: CredentialIdPageProps) {
  await requireAuth()
  const { credentialId } = await params

  return (
    <div>
      <p>Credential ID: {credentialId}</p>
    </div>
  )
}
