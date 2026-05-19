'use client'

import { SaveIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
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
import { LINKS } from '@/constants/links'
import {
  useSuspenseWorkflow,
  useUpdateWorkflowName,
} from '@/features/workflows/hooks/use-workflows'

type EditorProps = {
  workflowId: string
}

export const Editor = ({ workflowId }: EditorProps) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId)

  return <p>{JSON.stringify(workflow, null, 2)}</p>
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
