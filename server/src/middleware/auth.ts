import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
