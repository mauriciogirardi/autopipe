'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect } from 'react'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: catch error
    const originalError = console.error
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Encountered a script tag while rendering')
      ) {
        return
      }
      originalError(...args)
    }
    return () => {
      console.error = originalError
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
