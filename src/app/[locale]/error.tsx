'use client'

import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DefaultError({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>Error Todo page</h1>
      <p>{error.message}</p>
      {error.digest && <p>Digest: {error.digest}</p>}
      <Button onClick={() => reset()}>Reset</Button>
    </div>
  )
}
