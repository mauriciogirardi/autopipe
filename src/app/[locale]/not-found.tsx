import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { requireAuth } from '@/lib/auth-utils'

export default async function NotFound() {
  await requireAuth()

  return (
    <div className="flex items-center flex-col justify-center gap-4 h-screen animate-fade-scale">
      <AlertTriangle className="size-14 text-orange-300" />
      <h1 className="text-2xl font-bold">This page could not be found.</h1>
      <p>
        View{' '}
        <Link href="/" className="underline underline-offset-2 text-gray-800">
          home
        </Link>
      </p>
    </div>
  )
}
