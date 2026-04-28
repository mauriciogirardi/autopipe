import { caller } from '@/trpc/server'

export default async function Home() {
  const users = await caller.getUsers()

  return <div>{JSON.stringify(users, null, 2)}</div>
}
