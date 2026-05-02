'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LINKS } from '@/constants/links'
import { authClient } from '@/lib/auth-client'
import { GithubButtonLogin } from './github-button-login'
import { GoogleButtonLogin } from './google-button-login'

const loginSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.').trim(),
})

type TLoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()

  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmitLogin = async ({ email, password }: TLoginFormValues) => {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: LINKS.HOME,
      },
      {
        onSuccess: () => {
          router.push(LINKS.HOME)
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? 'Internal server error!')
        },
      },
    )
  }

  const isPending = form.formState.isSubmitting

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitLogin)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <GithubButtonLogin disabled={isPending} />
                  <GoogleButtonLogin disabled={isPending} />
                </div>

                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="************" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isPending}>
                    {isPending ? <Loader2Icon className="animate-spin" /> : 'Login'}
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <span className="mr-1">Don&apos;t have an account?</span>
                  <Link href={LINKS.SIGNUP} className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
