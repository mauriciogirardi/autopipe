import { LoginForm } from '@/features/auth/components/login-form'
import { requireUnauth } from '@/lib/auth-utils'

export default async function LoginPage() {
  await requireUnauth()

  return (
    <div className="flex flex-col p-4 items-center justify-center h-dvh w-full">
      <div className="w-full md:w-96">
        <LoginForm />
      </div>
    </div>
  )
}
