import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function AuthLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-24 mt-1" />
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            {/* Social buttons */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>

            {/* Fields */}
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="grid gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-full" />
              </div>

              {/* Submit button */}
              <Skeleton className="h-9 w-full" />
            </div>

            {/* Sign up link */}
            <div className="flex justify-center gap-1">
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
