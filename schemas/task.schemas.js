import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional()
})

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional()
})