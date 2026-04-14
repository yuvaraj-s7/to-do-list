import { z } from 'zod';

const priority = z.enum(['low', 'medium', 'high']);
const status = z.enum(['pending', 'completed']);

export const todoCreateSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    priority,
    dueDate: z.string().optional(),
    recurringType: z.enum(['none', 'daily', 'weekly']).default('none')
  })
});

export const todoUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    priority: priority.optional(),
    status: status.optional(),
    dueDate: z.string().nullable().optional(),
    recurringType: z.enum(['none', 'daily', 'weekly']).optional()
  }),
  params: z.object({ id: z.string() })
});
