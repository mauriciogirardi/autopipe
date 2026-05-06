import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'
import { inngest } from './client'

const google = createGoogleGenerativeAI()

export const processTask = inngest.createFunction(
  { id: 'execute', triggers: { event: 'execute/ai' } },
  async ({ step }) => {
    const { steps: geminiSteps } = await step.ai.wrap('gemini-generate-text', generateText, {
      system: 'You are a helpful assistant.',
      prompt: 'What is 2 + 2?',
      model: google('gemini-2.5-flash'),
    })

    return {
      geminiSteps,
    }
  },
)
