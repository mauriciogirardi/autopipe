'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface GithubButtonLoginProps {
  disabled?: boolean
}

export function GithubButtonLogin({ disabled }: GithubButtonLoginProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const logo = mounted && resolvedTheme === 'dark' ? '/github-white.svg' : '/github.svg'

  return (
    <Button variant="outline" className="full" type="button" disabled={disabled}>
      {/** biome-ignore lint/performance/noImgElement: not performance */}
      <img src={logo} alt="Github" className="size-4" />
      Continue with Github
    </Button>
  )
}
