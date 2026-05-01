import Link from 'next/link'
import { requireAuth } from '@/lib/auth-utils'

export default async function NotFound() {
  await requireAuth()

  return (
    <div>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/">home</Link>
      </p>
    </div>
  )
}
