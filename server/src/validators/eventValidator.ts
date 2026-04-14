import { z } from 'zod';

export const eventCreateSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    todoId: z.number().optional()
  })
});
