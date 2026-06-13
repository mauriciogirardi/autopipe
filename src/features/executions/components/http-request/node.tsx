'use client'

import { type Node, type NodeProps, useReactFlow } from '@xyflow/react'
import type { HTTPMethod } from 'better-auth'
import { GlobeIcon } from 'lucide-react'
import { memo, useState } from 'react'
import { BaseExecutionNode } from '../base-execution-node'
import { type FormData, HttpRequestDialog } from './dialog'

type HttpRequestNodeData = {
  endpoint?: string
  method?: HTTPMethod
  body?: string
  [key: string]: unknown
}

type HttpRequestNodeType = Node<HttpRequestNodeData>

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { setNodes } = useReactFlow()

  const nodeStatus = 'initial'

  const handleSubmit = ({ endpoint, method, body }: FormData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              endpoint,
              method,
              body,
            },
          }
        }

        return node
      }),
    )
  }

  const handleOpenSettings = () => setDialogOpen(true)

  const nodeData = props.data
  const description = nodeData.endpoint
    ? `${nodeData.method || 'GET'}: ${nodeData.endpoint}`
    : 'Not configured'

  return (
    <>
      <HttpRequestDialog
        onOpenChange={setDialogOpen}
        open={dialogOpen}
        onSubmit={handleSubmit}
        defaultEndpoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="Http Request"
        description={description}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
})

HttpRequestNode.displayName = 'HttpRequestNode'
