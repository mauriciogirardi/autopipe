import { SidebarTrigger } from '@/components/ui/sidebar'
import { EditorBreadcrumbs, EditorSaveButton } from './editor'

type EditorHeaderProps = {
  workflowId: string
}

export const EditorHeader = ({ workflowId }: EditorHeaderProps) => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4  bg-background dark:bg-card">
      <div className="flex items-center justify-between w-full">
        <SidebarTrigger aria-label="Open or close sidebar" />

        <div className="flex items-center gap-4 flex-row justify-between w-full ml-10">
          <EditorBreadcrumbs workflowId={workflowId} />
          <EditorSaveButton workflowId={workflowId} />
        </div>
      </div>
    </header>
  )
}
