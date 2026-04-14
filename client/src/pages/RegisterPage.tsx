import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
    nav('/dashboard');
  };

  return (
    <div className="mx-auto mt-24 max-w-md rounded-xl border bg-white p-6 dark:bg-slate-900">
      <h1 className="mb-4 text-xl font-bold">Register</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input placeholder="Name" className="w-full rounded border p-2" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full rounded border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded bg-indigo-600 p-2 text-white">Register</button>
      </form>
      <p className="mt-3 text-sm">Already have account? <Link className="text-indigo-600" to="/login">Login</Link></p>
    </div>
  );
}
