import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';

const nav = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/calendar', label: 'Calendar' }
];

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <aside className="hidden w-64 border-r p-4 md:block">
        <h1 className="mb-6 text-xl font-bold">Todo Calendar</h1>
        <nav className="space-y-2">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className={`block rounded-lg p-2 ${location.pathname === item.to ? 'bg-indigo-100 text-indigo-700' : ''}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 pb-20 md:pb-4">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 p-4 backdrop-blur dark:bg-slate-900/80">
          <h2 className="font-semibold">{location.pathname.includes('calendar') ? 'Calendar' : 'Dashboard'}</h2>
          <ThemeToggle />
        </header>
        <div className="p-4">
          <Outlet />
        </div>
        <nav className="fixed bottom-0 left-0 right-0 grid grid-cols-2 border-t bg-white p-2 md:hidden dark:bg-slate-900">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="rounded-lg p-2 text-center text-sm">
              {item.label}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
