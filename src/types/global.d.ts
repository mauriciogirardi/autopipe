import type { formats } from '@/i18n/request'
import type { routing } from '@/i18n/routing'
import type pt from '@/messages/pt'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof pt
    Formats: typeof formats
  }
}
