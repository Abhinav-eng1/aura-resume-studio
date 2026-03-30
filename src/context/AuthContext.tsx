import React, { createContext, useContext, useState } from 'react';

interface User { name: string; email: string; }
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => { const c = useContext(AuthContext); if (!c) throw new Error('useAuth must be in AuthProvider'); return c; };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { const d = localStorage.getItem('user'); return d ? JSON.parse(d) : null; } catch { return null; }
  });

  const login = (email: string, _password: string) => {
    const u = { name: email.split('@')[0], email };
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const signup = (name: string, email: string, _password: string) => {
    const u = { name, email };
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const logout = () => { setUser(null); localStorage.removeItem('user'); };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}
