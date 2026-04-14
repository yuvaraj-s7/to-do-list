import { http } from './http';

export const todoApi = {
  list: (params?: Record<string, string | number>) => http.get('/todos', { params }),
  create: (payload: Record<string, unknown>) => http.post('/todos', payload),
  update: (id: number, payload: Record<string, unknown>) => http.patch(`/todos/${id}`, payload),
  delete: (id: number) => http.delete(`/todos/${id}`)
};
