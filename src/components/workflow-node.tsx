'use client'

import { NodeToolbar, Position } from '@xyflow/react'
import { SettingsIcon, TrashIcon } from 'lucide-react'
import { Button } from './ui/button'

interface WorkflowNodeProps {
  showToolbar?: boolean
  onDelete?: () => void
  onSettings?: () => void
  name?: string
  description?: string
  children: React.ReactNode
}

export function WorkflowNode({
  description,
  name,
  onDelete,
  onSettings,
  showToolbar = true,
  children,
}: WorkflowNodeProps) {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button size="sm" variant="ghost" onClick={onSettings} aria-label="Settings">
            <SettingsIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete} aria-label="Delete">
            <TrashIcon className="size-4" aria-hidden="true" />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar position={Position.Bottom} isVisible className="max-w-50 text-center">
          <p className="font-medium">{name}</p>
          {description && <p className="text-muted-foreground truncate text-sm">{description}</p>}
        </NodeToolbar>
      )}
    </>
  )
}
