import type { HTTPMethod } from 'better-auth'
import { NonRetriableError } from 'inngest'
import ky, { type Options as KyOptions } from 'ky'
import type { NodeExecutor } from '@/features/executions/types'

type HttpRequestExecutorData = {
  variableName?: string
  endpoint?: string
  method?: HTTPMethod
  body?: string
}

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

  const variableName = data.variableName

  const result = await step.run('http-request', async () => {
    const endpoint = data.endpoint ?? ''
    const method = data.method ?? 'GET'

    const options: KyOptions = { method }

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      options.body = data.body
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
      [variableName]: responsePayload,
    }
  })

  return result
}
