'use client'

import { PlusIcon } from 'lucide-react'
import { memo, useState } from 'react'
import { NodeSelector } from '@/components/node-selector'
import { Button } from '@/components/ui/button'

export const EditorNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false)

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button
        size="icon"
        variant="outline"
        className="bg-background"
        onClick={() => setSelectorOpen(true)}
        aria-label="Todo"
      >
        <PlusIcon aria-hidden="true" />
      </Button>
    </NodeSelector>
  )
})

EditorNodeButton.displayName = 'EditorNodeButton'
