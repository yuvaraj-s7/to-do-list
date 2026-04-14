import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors[0]?.message || 'Validation error' });
  }
  next();
};
