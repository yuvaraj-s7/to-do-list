import bcrypt from 'bcryptjs';
import { UserModel } from '../models/userModel';
import { HttpError } from '../utils/httpError';
import { signAccessToken, signRefreshToken } from '../utils/jwt';

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const existing = await UserModel.getByEmail(email);
    if (existing) throw new HttpError(409, 'Email already exists');
    const hashed = await bcrypt.hash(password, 12);
    const user = await UserModel.createUser(name, email, hashed);
    const payload = { userId: user.id, email: user.email };
    return { user, accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) };
  },
  async login(email: string, password: string) {
    const user = await UserModel.getByEmail(email);
    if (!user) throw new HttpError(401, 'Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new HttpError(401, 'Invalid credentials');
    const payload = { userId: user.id, email: user.email };
    return { user: { id: user.id, name: user.name, email: user.email }, accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) };
  }
};
