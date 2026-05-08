import { polarClient } from '@polar-sh/better-auth'
import { createAuthClient } from 'better-auth/react'
import { clientEnv } from '@/env'

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_API_URL,
  plugins: [polarClient()],
})
