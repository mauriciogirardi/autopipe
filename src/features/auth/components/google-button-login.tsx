import { Button } from '@/components/ui/button'

interface GoogleButtonLoginProps {
  disabled?: boolean
}

export function GoogleButtonLogin({ disabled }: GoogleButtonLoginProps) {
  return (
    <Button variant="outline" className="full" type="button" disabled={disabled}>
      {/** biome-ignore lint/performance/noImgElement: not performance */}
      <img src="google.svg" alt="Google" className="size-4" />
      Continue with Google
    </Button>
  )
}
