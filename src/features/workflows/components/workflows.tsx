'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from '@/components/entity-components'
import { LINKS } from '@/constants/links'
import { useEntitySearch } from '@/hooks/use-entity-search'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import { useCreateWorkflow, useSuspenseWorkflows } from '../hooks/use-workflows'
import { useWorkflowsParams } from '../hooks/use-workflows-params'

export function WorkflowsList() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const workflows = useSuspenseWorkflows()

  return (
    <EntityList
      items={workflows.data.workflows}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <p>{workflow.name}</p>}
      emptyView={<WorkflowsEmpty search={search} />}
    />
  )
}

export function WorkflowsHeader({ disabled }: { disabled?: boolean }) {
  const t = useTranslations('workflows')
  const router = useRouter()

  const { handleError, modal } = useUpgradeModal()
  const createWorkflow = useCreateWorkflow()

  const handleCreateWorkflow = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => router.push(`${LINKS.WORKFLOWS}/${data.id}`),
      onError: handleError,
    })
  }

  return (
    <>
      {modal}
      <EntityHeader
        title={t('title')}
        description={t('description')}
        onNew={handleCreateWorkflow}
        newButtonLabel="New workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  )
}

export function WorkflowsSearch() {
  const [params, setParams] = useWorkflowsParams()
  const { onSearchChange, searchValue } = useEntitySearch({
    params,
    setParams,
  })

  return (
    <EntitySearch value={searchValue} onChange={onSearchChange} placeholder="Search workflows" />
  )
}

export function WorkflowsPagination() {
  const workflows = useSuspenseWorkflows()
  const [params, setParams] = useWorkflowsParams()

  if (!workflows.data.hasNextPage) return null

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      onPageChange={(page) => setParams({ ...params, page })}
      page={workflows.data.page}
      totalPages={workflows.data.totalPages}
    />
  )
}

export function WorkflowsContainer({ children }: { children: React.ReactNode }) {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  )
}

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />
}

export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows" />
}

export const WorkflowsEmpty = ({ search }: { search?: string | null }) => {
  const router = useRouter()
  const createWorkflow = useCreateWorkflow()
  const { handleError, modal } = useUpgradeModal()

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: handleError,
      onSuccess: (data) => {
        router.push(`${LINKS.WORKFLOWS}/${data.id}`)
      },
    })
  }

  return (
    <>
      {modal}
      <EmptyView
        {...(!search && { onNew: handleCreate })}
        className="whitespace-pre-line"
        message={
          !search
            ? `You haven't create any workflows yet.\nGet started by creating your first workflow.`
            : `Not found workflow with name ${search}!`
        }
      />
    </>
  )
}

// 22
