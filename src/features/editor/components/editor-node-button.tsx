'use client'

import { PlusIcon } from 'lucide-react'
import { memo } from 'react'
import { Button } from '@/components/ui/button'

export const EditorNodeButton = memo(() => {
  return (
    <Button size="icon" variant="outline" className="bg-background">
      <PlusIcon aria-hidden="true" />
    </Button>
  )
})

EditorNodeButton.displayName = 'EditorNodeButton'
