'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  endpoint: z.url({ error: 'Please enter a valid URL.' }),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  body: z.string().optional(),
})

export type HttpRequestFormData = z.infer<typeof formSchema>

interface HttpRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (values: HttpRequestFormData) => void
  defaultValues?: Partial<HttpRequestFormData>
}

export function HttpRequestDialog({
  onOpenChange,
  open,
  onSubmit,
  defaultValues,
}: HttpRequestDialogProps) {
  const form = useForm<HttpRequestFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: defaultValues?.body || '',
      endpoint: defaultValues?.endpoint || '',
      method: defaultValues?.method || 'GET',
    },
  })

  const watchMethod = form.watch('method')
  const showBodyFiled = ['POST', 'PUT', 'PATCH'].includes(watchMethod)

  const handleSubmit = (values: HttpRequestFormData) => {
    onSubmit?.(values)
    onOpenChange(false)
  }

  useEffect(() => {
    if (open) {
      form.reset({
        body: defaultValues?.body || '',
        endpoint: defaultValues?.endpoint || '',
        method: defaultValues?.method || 'GET',
      })
    }
  }, [open, defaultValues, form.reset])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>Configure settings for the HTTP Request node</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mt-4">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent align="end">
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-muted-foreground text-xs">
                    The HTTP method to use for this request.
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://api.example.com/users/{{httpResponse.data.id}}"
                    />
                  </FormControl>
                  <FormDescription className="text-muted-foreground text-xs">
                    Static URL or use <strong>{'{{variables}}'}</strong> for simple values or{' '}
                    <strong>{'{{json variables}}'}</strong> stringify objects.
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {showBodyFiled && (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Body</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="font-mono min-h-30"
                        placeholder={`{\n "userId": "{{httpResponse.data.id}}", \n "name": "{{httpResponse.data.name}}", \n "items": "{{httpResponse.data.items}}"\n}`}
                      />
                    </FormControl>
                    <FormDescription className="text-muted-foreground text-xs">
                      JSON with template variable. Use <strong>{'{{variables}}'}</strong> for simple
                      values or <strong>{'{{json variables}}'}</strong> stringify objects.
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button className="mt-8" type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2Icon className="size-4 animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
