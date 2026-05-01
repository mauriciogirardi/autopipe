import { RegisterForm } from '@/features/auth/components/register-form'
import { requireUnauth } from '@/lib/auth-utils'

export default async function LoginPage() {
  await requireUnauth()

  return (
    <div className="flex p-4 flex-col items-center justify-center h-dvh w-full">
      <div className="w-full md:w-96">
        <RegisterForm />
      </div>
    </div>
  )
}
