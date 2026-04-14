export function PriorityBadge({ priority }: { priority: 'low' | 'medium' | 'high' }) {
  const colors = {
    low: 'bg-emerald-100 text-emerald-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-red-100 text-red-700'
  };
  return <span className={`rounded-full px-2 py-0.5 text-xs ${colors[priority]}`}>{priority}</span>;
}
