import { LoadingView } from '@/components/entity-components'

export default function MainLoading() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <LoadingView message="Loading workflows..." className="h-auto" />
    </div>
  )
}
