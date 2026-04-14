import { EventModel } from '../models/eventModel';
import { TodoModel } from '../models/todoModel';

const todayIso = () => new Date().toISOString().slice(0, 10);

export const ChatService = {
  async respond(userId: number, message: string) {
    const lower = message.toLowerCase();
    const todos = await TodoModel.byUser(userId);
    const events = await EventModel.list(userId);
    const today = todayIso();

    if (lower.startsWith('add task ')) {
      const title = message.replace(/add task /i, '').trim();
      const todo = await TodoModel.create(userId, { title, priority: 'medium', dueDate: today, recurringType: 'none' });
      return { reply: `Added task: ${todo.title}`, created: { todo } };
    }

    if (lower.includes('meeting at')) {
      const event = await EventModel.create(userId, { title: 'Meeting', date: today, startTime: '17:00', endTime: '18:00' });
      return { reply: 'Created calendar meeting at 5pm.', created: { event } };
    }

    const overdue = todos.filter((t) => t.status === 'pending' && t.due_date && t.due_date < today);
    const high = todos.filter((t) => t.status === 'pending' && t.priority === 'high');
    const todays = todos.filter((t) => t.status === 'pending' && t.due_date === today);

    if (lower.includes('show high priority')) return { reply: `High priority tasks: ${high.map((t) => t.title).join(', ') || 'none'}` };
    if (lower.includes('show overdue')) return { reply: `Overdue tasks: ${overdue.map((t) => t.title).join(', ') || 'none'}` };

    if (lower.includes('what should i do now') || lower.includes('plan my day') || lower.includes('plan my tomorrow')) {
      const prioritized = [...overdue, ...high, ...todays].slice(0, 6);
      const overloaded = todays.length + events.filter((e) => e.date === today).length > 8;
      return {
        reply: overloaded
          ? `You're overloaded today. Focus next on: ${prioritized.map((p) => p.title).join(', ') || 'no urgent tasks'}.`
          : `Recommended order: ${prioritized.map((p) => p.title).join(', ') || 'no urgent tasks'}. Free slots: 12:00-13:00, 16:00-17:00.`
      };
    }

    if (lower.includes('reschedule today')) {
      return { reply: 'Suggestion: move low-priority tasks to tomorrow and keep overdue + high-priority first.' };
    }

    if (lower.includes('move low priority')) {
      return { reply: 'Suggested reorder: overdue -> high -> today -> low priority backlog.' };
    }

    return { reply: 'Try commands like "plan my day", "show overdue", or "add task buy milk tomorrow".' };
  }
};
