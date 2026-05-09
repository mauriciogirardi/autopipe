'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from '@/components/entity-components'
import { LINKS } from '@/constants/links'
import { useEntitySearch } from '@/hooks/use-entity-search'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import { useCreateWorkflow, useSuspenseWorkflows } from '../hooks/use-workflows'
import { useWorkflowsParams } from '../hooks/use-workflows-params'

export function WorkflowsList() {
  const workflows = useSuspenseWorkflows()

  return (
    <div>
      <p>{JSON.stringify(workflows.data, null, 2)}</p>
    </div>
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
