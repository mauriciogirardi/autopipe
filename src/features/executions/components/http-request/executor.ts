import type { HTTPMethod } from 'better-auth'
import Handlebars from 'handlebars'
import { NonRetriableError } from 'inngest'
import ky, { type Options as KyOptions } from 'ky'
import type { NodeExecutor } from '@/features/executions/types'

type HttpRequestExecutorData = {
  variableName: string
  endpoint: string
  method: HTTPMethod
  body?: string
}

Handlebars.registerHelper('json', (ctx) => {
  const stringified = JSON.stringify(ctx, null, 2)
  return new Handlebars.SafeString(stringified)
})

export const httpRequestExecutor: NodeExecutor<HttpRequestExecutorData> = async ({
  data,
  context,
  step,
}) => {
  if (!data.endpoint) {
    throw new NonRetriableError('HTTP Request node: No endpoint configured.')
  }

  if (!data.variableName) {
    throw new NonRetriableError('Variable name not configured.')
  }

  if (!data.method) {
    throw new NonRetriableError('Method not configured.')
  }

  const result = await step.run('http-request', async () => {
    const endpoint = Handlebars.compile(data.endpoint)(context)
    const method = data.method ?? 'GET'

    const options: KyOptions = { method }

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const resolved = Handlebars.compile(data.body || '{}')(context)
      JSON.parse(resolved)

      options.body = resolved
      options.headers = {
        'Content-Type': 'application/json',
      }
    }

    const response = await ky(endpoint, options)
    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')
    const responseData = isJson
      ? await response.json().catch(() => response.text())
      : await response.text()

    const responsePayload = {
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    }

    return {
      ...context,
      [data.variableName]: responsePayload,
    }
  })

  return result
}
