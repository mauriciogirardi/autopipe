import { Skeleton } from '@/components/ui/skeleton'

export default function AuthLoading() {
  return (
    <div className="flex flex-col p-4 items-center justify-center h-dvh w-full">
      <div className="w-full md:w-96">
        <Skeleton className="w-full h-96" />
      </div>
    </div>
  )
}
