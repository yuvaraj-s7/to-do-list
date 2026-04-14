import { Request, Response } from 'express';
import { EventModel } from '../models/eventModel';

export const listEvents = async (req: Request, res: Response) => {
  const events = await EventModel.list(req.user!.userId);
  res.json({ data: events });
};

export const createEvent = async (req: Request, res: Response) => {
  const event = await EventModel.create(req.user!.userId, req.body);
  res.status(201).json({ data: event });
};

export const updateEvent = async (req: Request, res: Response) => {
  const event = await EventModel.update(Number(req.params.id), req.user!.userId, req.body);
  res.json({ data: event });
};

export const deleteEvent = async (req: Request, res: Response) => {
  await EventModel.delete(Number(req.params.id), req.user!.userId);
  res.status(204).send();
};
