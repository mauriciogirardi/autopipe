'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { TLanguage } from '@/i18n/request'

export function ModeLanguage() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [language, setLanguage] = useState<TLanguage>(locale as TLanguage)

  const flags = {
    en: { src: '/us.svg', alt: 'flag USE' },
    pt: { src: '/br.svg', alt: 'flag Brasil' },
  }[language]

  const switchLocale = (newLocale: TLanguage) => {
    setLanguage(newLocale)
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/** biome-ignore lint/performance/noImgElement: already atomized img*/}
          <img src={flags.src} alt={flags.alt} className="size-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Language</DropdownMenuLabel>

          <DropdownMenuCheckboxItem onClick={() => switchLocale('en')} checked={language === 'en'}>
            {/** biome-ignore lint/performance/noImgElement: already atomized img*/}
            <img src="/us.svg" alt="flag USE" className="size-6" />
            English
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem onClick={() => switchLocale('pt')} checked={language === 'pt'}>
            {/** biome-ignore lint/performance/noImgElement: already atomized img*/}
            <img src="/br.svg" alt="flag Brasil" className="size-6" />
            Portuguese
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
