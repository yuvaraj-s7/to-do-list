import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/auth';

type User = { id: number; name: string; email: string };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.me().then((r) => setUser(r.data.user)).catch(() => null).finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (email: string, password: string, rememberMe?: boolean) => {
        const r = await authApi.login({ email, password, rememberMe });
        setUser(r.data.user);
      },
      register: async (name: string, email: string, password: string) => {
        const r = await authApi.register({ name, email, password });
        setUser(r.data.user);
      },
      logout: async () => {
        await authApi.logout();
        setUser(null);
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
