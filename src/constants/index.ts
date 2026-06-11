import type { NodeTypes } from '@xyflow/react'
import { InitialNode } from '@/components/initial-node'
import { HttpRequestNode } from '@/features/executions/components/http-request/node'
import { ManualTriggerNode } from '@/features/triggers/components/manual-trigger/node'
import { NodeType } from '@/generated/prisma/enums'

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 6,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
} as const

export const NODE_COMPONENTS = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes
