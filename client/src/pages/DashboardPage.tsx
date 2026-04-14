import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { QuickAddTask } from '../components/QuickAddTask';
import { Todo, TodoList } from '../components/TodoList';
import { todoApi } from '../api/todos';
import { ChatbotPanel } from '../components/ChatbotPanel';
import { useDebounce } from '../hooks/useDebounce';

export function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('');
  const debouncedSearch = useDebounce(search);

  const load = async () => {
    const res = await todoApi.list({ q: debouncedSearch, priority, sortBy: 'due_date', order: 'asc' });
    setTodos(res.data.data);
  };

  useEffect(() => {
    load();
  }, [debouncedSearch, priority]);

  const today = new Date().toISOString().slice(0, 10);
  const todaysTasks = useMemo(() => todos.filter((t) => t.due_date === today && t.status === 'pending'), [todos, today]);

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-3">
        <QuickAddTask
          onAdd={async (title) => {
            const optimistic: Todo = { id: Date.now(), title, priority: 'medium', status: 'pending', due_date: today };
            setTodos((s) => [optimistic, ...s]);
            try {
              const res = await todoApi.create({ title, priority: 'medium', dueDate: today, recurringType: 'none' });
              setTodos((s) => [res.data.data, ...s.filter((t) => t.id !== optimistic.id)]);
              toast.success('Task added');
            } catch {
              setTodos((s) => s.filter((t) => t.id !== optimistic.id));
              toast.error('Failed to add task');
            }
          }}
        />

        <div className="flex flex-col gap-2 sm:flex-row">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search todos" className="w-full rounded border p-2" />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded border p-2">
            <option value="">All priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="rounded-xl border p-3">
          <h3 className="mb-2 font-semibold">Today's tasks ({todaysTasks.length})</h3>
          <TodoList
            todos={todos}
            onToggle={async (todo) => {
              const next = todo.status === 'pending' ? 'completed' : 'pending';
              setTodos((s) => s.map((t) => (t.id === todo.id ? { ...t, status: next } : t)));
              await todoApi.update(todo.id, { status: next });
            }}
            onDelete={async (id) => {
              setTodos((s) => s.filter((t) => t.id !== id));
              await todoApi.delete(id);
            }}
          />
        </div>
      </section>
      <aside className="space-y-3">
        <ChatbotPanel />
      </aside>
    </div>
  );
}
