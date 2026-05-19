import {
  AlertTriangleIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './ui/empty'
import { Input } from './ui/input'

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
    <div className="p-4 md:px-10 md:py-6 h-full">
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

type EntitySearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const EntitySearch = ({ onChange, value, placeholder }: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-50 bg-background shadow-none border-border pl-8"
      />
    </div>
  )
}

type EntityPaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export const EntityPagination = ({
  onPageChange,
  page,
  totalPages,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          variant="outline"
          size="sm"
          disabled={page === 1 || disabled}
        >
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          variant="outline"
          size="sm"
          disabled={page === totalPages || totalPages === 0 || disabled}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

interface StateViewProps {
  message?: string
  className?: string
}

export const LoadingView = ({ message, className }: StateViewProps) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center h-full flex-1 flex-col gap-y-4 animate-fade-in',
        className,
      )}
    >
      <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}

export const ErrorView = ({ message, className }: StateViewProps) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center h-full flex-1 flex-col animate-fade-in',
        className,
      )}
    >
      <div className=" border-dashed border-[0.5px] border-muted-foreground rounded-lg px-48 py-20 flex flex-col items-center gap-y-4">
        <AlertTriangleIcon className="size-6 text-rose-400" />
        {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  )
}

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void
}

export const EmptyView = ({ onNew, message, className }: EmptyViewProps) => {
  return (
    <Empty className={cn('border border-dashed', className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon className="" />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No items</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>Add item</Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

interface EntityListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getKey?: (item: T, index: number) => string | number
  emptyView: React.ReactNode
  className?: string
}

export function EntityList<T>({
  emptyView,
  items,
  renderItem,
  className,
  getKey,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-y-4', className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>{renderItem(item, index)}</div>
      ))}
    </div>
  )
}

interface EntityItemProps {
  href: string
  title: string
  subtitle?: React.ReactNode
  image?: React.ReactNode
  actions?: React.ReactNode
  onRemove?: () => void | Promise<void>
  isRemoving?: boolean
  className?: string
}

export const EntityItem = ({
  href,
  title,
  actions,
  className,
  image,
  isRemoving,
  onRemove,
  subtitle,
}: EntityItemProps) => {
  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (isRemoving) return

    if (onRemove) {
      await onRemove()
    }
  }

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          `
            group
            relative
            overflow-hidden
            border
            backdrop-blur
            p-4
            shadow-sm
            transition-all
            duration-300
            ease-out

            hover:-translate-y-0.5
            hover:scale-[1.01]
            hover:border-primary/30
            hover:shadow-xl

            before:absolute
            before:inset-0
            before:bg-linear-to-r
            before:from-primary/0
            before:via-primary/5
            before:to-primary/0
            before:opacity-0
            before:transition-opacity
            before:duration-500

            hover:before:opacity-100
        `,
          isRemoving && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="transition-transform duration-300 group-hover:scale-105">{image}</div>

            <div className="flex flex-col">
              <CardTitle className="text-base font-medium ">{title}</CardTitle>

              {!!subtitle && <CardDescription className="text-xs">{subtitle}</CardDescription>}
            </div>
          </div>

          {(actions || onRemove) && (
            <div className="flex items-center gap-x-4 transition-all  duration-300  group-hover:translate-x-0.5">
              {actions}

              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                      className="transition-all duration-200 hover:scale-110 hover:bg-muted"
                    >
                      <MoreVerticalIcon className="size-4" aria-label="Click to see more options" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem
                      disabled={isRemoving}
                      onClick={handleRemove}
                      className="cursor-pointer"
                    >
                      {isRemoving ? (
                        <Loader2Icon className="size-4 animate-spin" />
                      ) : (
                        <TrashIcon className="size-4" />
                      )}
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
