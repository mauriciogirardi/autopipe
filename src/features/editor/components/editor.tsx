'use client'

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  type ColorMode,
  type Connection,
  Controls,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  Panel,
  ReactFlow,
} from '@xyflow/react'
import { SaveIcon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ErrorView, LoadingView } from '@/components/entity-components'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { NODE_COMPONENTS } from '@/constants'
import { LINKS } from '@/constants/links'
import {
  useSuspenseWorkflow,
  useUpdateWorkflowName,
} from '@/features/workflows/hooks/use-workflows'
import { EditorNodeButton } from './editor-node-button'

type EditorProps = {
  workflowId: string
}

export const Editor = ({ workflowId }: EditorProps) => {
  const { resolvedTheme } = useTheme()
  const { data: workflow } = useSuspenseWorkflow(workflowId)

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes)
  const [edges, setEdges] = useState<Edge[]>(workflow.edges)
  const [mounted, setMounted] = useState(false)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  )

  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  )

  const bgColor =
    resolvedTheme === 'light' ? 'oklch(0.9730 0.0133 286.1503)' : 'oklch(0.2284 0.0384 282.9324)'

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={mounted ? (resolvedTheme as ColorMode) : 'system'}
        fitView
        nodeTypes={NODE_COMPONENTS}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background bgColor={bgColor} />
        <Controls style={{ accentColor: 'red' }} />
        <Panel position="top-right">
          <EditorNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  )
}

export const EditorLoading = () => {
  return <LoadingView message="Loading editor..." />
}

export const EditorError = () => {
  return <ErrorView message="Error loading editor." />
}

export const EditorSaveButton = ({ workflowId }: EditorProps) => {
  return (
    <div className="ml-auto">
      <Button size="sm">
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  )
}

export const EditorNameInput = ({ workflowId }: EditorProps) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId)
  const updateWorkflow = useUpdateWorkflowName()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(workflow.name)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (workflow.name) setName(workflow.name)
  }, [workflow.name])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = async () => {
    if (name === workflow.name) {
      setIsEditing(false)
      return
    }

    try {
      await updateWorkflow.mutateAsync({
        id: workflowId,
        name,
      })
    } catch {
      setName(workflow.name)
    } finally {
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setName(workflow.name)
      setIsEditing(false)
    }
  }

  if (updateWorkflow.isPending) {
    return <Skeleton className="h-7 w-auto min-w-50 px-2" />
  }

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="h-7 w-auto min-w-50 px-2 animate-fade-in"
      />
    )
  }

  return (
    <BreadcrumbItem
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:text-foreground transition-colors"
    >
      {workflow.name}
    </BreadcrumbItem>
  )
}

export const EditorBreadcrumbs = ({ workflowId }: EditorProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={LINKS.WORKFLOWS} prefetch>
              Workflows
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <EditorNameInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  )
}
