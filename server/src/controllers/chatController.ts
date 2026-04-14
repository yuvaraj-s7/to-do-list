import { Request, Response } from 'express';
import { ChatService } from '../services/chatService';

export const chat = async (req: Request, res: Response) => {
  const { message } = req.body;
  const result = await ChatService.respond(req.user!.userId, message);
  res.json(result);
};
