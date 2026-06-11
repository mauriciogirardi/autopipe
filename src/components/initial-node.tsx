'use client'

import type { NodeProps } from '@xyflow/react'
import { PlusIcon } from 'lucide-react'
import { memo } from 'react'
import { PlaceholderNode } from './react-flow/placeholder-node'
import { WorkflowNode } from './workflow-node'

export const InitialNode = memo(({ ...props }: NodeProps) => {
  return (
    <WorkflowNode showToolbar={false}>
      <PlaceholderNode {...props}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon className="size-4" aria-label="Add a first step" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  )
})
