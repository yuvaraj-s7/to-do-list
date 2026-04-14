import { PriorityBadge } from './PriorityBadge';

export type Todo = {
  id: number;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  due_date?: string;
};

export function TodoList({ todos, onToggle, onDelete }: { todos: Todo[]; onToggle: (todo: Todo) => void; onDelete: (id: number) => void }) {
  if (!todos.length) return <div className="rounded-xl border border-dashed p-6 text-center text-sm text-slate-500">No tasks found.</div>;

  return (
    <ul className="space-y-2">
      {todos.map((todo) => {
        const overdue = todo.due_date && todo.due_date < new Date().toISOString().slice(0, 10) && todo.status === 'pending';
        return (
          <li key={todo.id} className="flex items-center gap-2 rounded-xl border p-3">
            <input type="checkbox" checked={todo.status === 'completed'} onChange={() => onToggle(todo)} className="h-5 w-5" />
            <div className="min-w-0 flex-1">
              <p className={`truncate ${todo.status === 'completed' ? 'line-through text-slate-400' : ''}`}>{todo.title}</p>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <PriorityBadge priority={todo.priority} />
                {todo.due_date && <span className={overdue ? 'text-red-600' : 'text-slate-500'}>{todo.due_date}</span>}
              </div>
            </div>
            <button onClick={() => onDelete(todo.id)} className="text-sm text-red-500">Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
