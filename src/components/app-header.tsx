import { ModeLanguage } from './mode-laguange'
import { ModeToggle } from './mode-toggle'
import { SidebarTrigger } from './ui/sidebar'

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4  bg-background dark:bg-card">
      <div className="flex items-center justify-between w-full">
        <SidebarTrigger aria-label="Open or close sidebar" />

        <div className="flex items-center gap-4">
          <ModeLanguage />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
