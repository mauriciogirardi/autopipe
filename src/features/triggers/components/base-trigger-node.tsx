'use client'

import { type NodeProps, Position, useReactFlow } from '@xyflow/react'
import type { LucideIcon } from 'lucide-react'
import { memo } from 'react'
import { BaseHandle } from '@/components/react-flow/base-handle'
import { BaseNode, BaseNodeContent } from '@/components/react-flow/base-node'
import { type NodeStatus, NodeStatusIndicator } from '@/components/react-flow/node-status-indicator'
import { WorkflowNode } from '@/components/workflow-node'

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string
  name: string
  description?: string
  children?: React.ReactNode
  status?: NodeStatus
  onSettings?: () => void
  onDoubleClick?: () => void
}

export const BaseTriggerNode = memo(
  ({
    icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
    id,
    status = 'initial',
  }: BaseTriggerNodeProps) => {
    const { setNodes, setEdges } = useReactFlow()

    const Icon = icon

    const handleDelete = () => {
      setNodes((currentNodes) => {
        const updateNodes = currentNodes.filter((node) => node.id !== id)
        return updateNodes
      })

      setEdges((currentEdges) => {
        const updateEdges = currentEdges.filter((edge) => edge.source !== id && edge.target !== id)
        return updateEdges
      })
    }

    return (
      <WorkflowNode
        name={name}
        description={description}
        onDelete={handleDelete}
        onSettings={onSettings}
      >
        <NodeStatusIndicator status={status} className="rounded-l-[18px]">
          <BaseNode
            status={status}
            onDoubleClick={onDoubleClick}
            className="rounded-l-2xl relative group"
          >
            <BaseNodeContent>
              {typeof Icon === 'string' ? (
                // biome-ignore lint/performance/noImgElement: not optimized
                <img src={Icon} alt={name} className="size-4 object-contain rounded-sm" />
              ) : (
                <Icon className="size-4 text-muted-foreground" />
              )}
              {children}
              <BaseHandle id="source-1" type="source" position={Position.Right} />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    )
  },
)

BaseTriggerNode.displayName = 'BaseTriggerNode'
