'use client'

import { Handle, type NodeProps, Position } from '@xyflow/react'

import { BaseNode } from './base-node'

export type PlaceholderNodeProps = Partial<NodeProps> & {
  children?: React.ReactNode
  onClick?: () => void
}

export function PlaceholderNode({ children, onClick }: PlaceholderNodeProps) {
  return (
    <BaseNode
      className="bg-card w-auto h-auto border-dashed border-gray-400 p-2 text-center text-gray-400 shadow-none cursor-pointer"
      onClick={onClick}
    >
      {children}
      <Handle
        type="target"
        style={{ visibility: 'hidden' }}
        position={Position.Top}
        isConnectable={false}
      />
      <Handle
        type="source"
        style={{ visibility: 'hidden' }}
        position={Position.Bottom}
        isConnectable={false}
      />
    </BaseNode>
  )
}
