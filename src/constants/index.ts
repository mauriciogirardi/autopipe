import type { NodeTypes } from '@xyflow/react'
import { InitialNode } from '@/components/initial-node'
import { NodeType } from '@/generated/prisma/enums'

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 6,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
} as const

export const NODE_COMPONENTS = {
  [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes
