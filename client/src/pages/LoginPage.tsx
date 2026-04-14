import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password, true);
    nav('/dashboard');
  };

  return (
    <div className="mx-auto mt-24 max-w-md rounded-xl border bg-white p-6 dark:bg-slate-900">
      <h1 className="mb-4 text-xl font-bold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full rounded border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded bg-indigo-600 p-2 text-white">Login</button>
      </form>
      <p className="mt-3 text-sm">No account? <Link className="text-indigo-600" to="/register">Register</Link></p>
    </div>
  );
}
