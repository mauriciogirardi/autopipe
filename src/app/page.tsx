import { requireAuth } from '@/lib/auth-utils'
import { caller } from '@/trpc/server'
import { LogoutButton } from './logout-button'

export default async function Home() {
  await requireAuth()
  const user = await caller.getUsers()

  return (
    <div>
      <p>{user[0].name}</p>
      <div>Protect page</div>
      <LogoutButton />
    </div>
  )
}
