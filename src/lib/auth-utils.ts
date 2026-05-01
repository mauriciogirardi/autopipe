import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { LINKS } from '@/constants/links'
import { auth } from './auth'

export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect(LINKS.LOGIN)
  }

  return session
}

export const requireUnauth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    redirect(LINKS.HOME)
  }
}
