import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <button onClick={() => setDark((d) => !d)} className="rounded-lg border p-2" aria-label="toggle theme">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
