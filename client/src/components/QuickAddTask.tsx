import { FormEvent, useState } from 'react';

export function QuickAddTask({ onAdd }: { onAdd: (title: string) => Promise<void> }) {
  const [title, setTitle] = useState('');
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd(title);
    setTitle('');
  };
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input className="w-full rounded-lg border p-2" placeholder="Quick add a task" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button className="rounded-lg bg-indigo-600 px-3 py-2 text-white">Add</button>
    </form>
  );
}
