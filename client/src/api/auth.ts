import { http } from './http';

export const authApi = {
  register: (payload: Record<string, unknown>) => http.post('/auth/register', payload),
  login: (payload: Record<string, unknown>) => http.post('/auth/login', payload),
  logout: () => http.post('/auth/logout'),
  me: () => http.get('/auth/me')
};
