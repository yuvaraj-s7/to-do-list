import { Request, Response } from 'express';
import { TodoModel } from '../models/todoModel';

export const listTodos = async (req: Request, res: Response) => {
  const todos = await TodoModel.list(req.user!.userId, {
    q: req.query.q as string,
    priority: req.query.priority as string,
    status: req.query.status as string,
    sortBy: req.query.sortBy as 'due_date' | 'priority',
    order: req.query.order as 'asc' | 'desc',
    page: Number(req.query.page || 1),
    limit: Number(req.query.limit || 20)
  });
  res.json({ data: todos });
};

export const createTodo = async (req: Request, res: Response) => {
  const todo = await TodoModel.create(req.user!.userId, req.body);
  res.status(201).json({ data: todo });
};

export const updateTodo = async (req: Request, res: Response) => {
  const todo = await TodoModel.update(Number(req.params.id), req.user!.userId, req.body);
  res.json({ data: todo });
};

export const deleteTodo = async (req: Request, res: Response) => {
  await TodoModel.delete(Number(req.params.id), req.user!.userId);
  res.status(204).send();
};
