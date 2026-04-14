import { http } from './http';

export const eventApi = {
  list: () => http.get('/events'),
  create: (payload: Record<string, unknown>) => http.post('/events', payload),
  update: (id: number, payload: Record<string, unknown>) => http.patch(`/events/${id}`, payload),
  delete: (id: number) => http.delete(`/events/${id}`)
};
