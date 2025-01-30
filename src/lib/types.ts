import { z } from 'zod'

export const promptSchema = z.object({
  title: z.string(),
  description: z.string(),
  prompt: z.string(),
  categories: z.array(z.string()),
  stars: z.number().min(0).max(5),
  githubProfile: z.string().optional(),
})

export type Prompt = z.infer<typeof promptSchema>