'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { EntityContainer, EntityHeader } from '@/components/entity-components'
import { LINKS } from '@/constants/links'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import { useCreateWorkflow, useSuspenseWorkflows } from '../hooks/use-workflows'

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

export function WorkflowsContainer({ children }: { children: React.ReactNode }) {
  return (
    <EntityContainer header={<WorkflowsHeader />} search={<></>} pagination={<></>}>
      {children}
    </EntityContainer>
  )
}
