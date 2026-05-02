import { Button } from '@/components/ui/button'

interface GithubButtonLoginProps {
  disabled?: boolean
}

export function GithubButtonLogin({ disabled }: GithubButtonLoginProps) {
  return (
    <Button variant="outline" className="full" type="button" disabled={disabled}>
      {/** biome-ignore lint/performance/noImgElement: not performance */}
      <img src="github.svg" alt="Github" className="size-4" />
      Continue with Github
    </Button>
  )
}
