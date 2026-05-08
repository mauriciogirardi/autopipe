import { Loader2Icon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

type EntityHeaderProps = {
  title: string
  description?: string
  newButtonLabel: string
  disabled?: boolean
  isCreating?: boolean
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
)

export const EntityHeader = ({
  title,
  description,
  disabled,
  isCreating,
  newButtonHref,
  newButtonLabel,
  onNew,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && <p className="text-xs md:text-sm text-muted-foreground">{description}</p>}
      </div>

      {onNew && !newButtonHref && (
        <Button disabled={isCreating || disabled} size="sm" onClick={onNew}>
          {isCreating ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <PlusIcon className="size-4" />
          )}
          {newButtonLabel}
        </Button>
      )}

      {newButtonHref && !onNew && (
        <Button size="sm" asChild>
          <PlusIcon className="size-4" />
          <Link href={newButtonHref} prefetch>
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  )
}

type EntityContainerProps = {
  children: React.ReactNode
  pagination?: React.ReactNode
  search?: React.ReactNode
  header?: React.ReactNode
}

export const EntityContainer = ({ children, header, pagination, search }: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6">
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-8 h-full">
        {header}

        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>

        {pagination}
      </div>
    </div>
  )
}
