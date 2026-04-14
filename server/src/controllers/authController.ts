import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { UserModel } from '../models/userModel';

const tokenCookie = (res: Response, accessToken: string, refreshToken: string, rememberMe = false) => {
  const maxAge = rememberMe ? 1000 * 60 * 60 * 24 * 30 : undefined;
  res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', secure: false, maxAge });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', secure: false, maxAge });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, rememberMe } = req.body;
  const result = await AuthService.register(name, email, password);
  tokenCookie(res, result.accessToken, result.refreshToken, rememberMe);
  res.status(201).json({ user: result.user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;
  const result = await AuthService.login(email, password);
  tokenCookie(res, result.accessToken, result.refreshToken, rememberMe);
  res.json({ user: result.user });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};

export const me = async (req: Request, res: Response) => {
  const user = await UserModel.getById(req.user!.userId);
  res.json({ user });
};
