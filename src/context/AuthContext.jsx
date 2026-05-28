import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Frontend-only auth context, prepared for Firebase Authentication.
 * Persists the current user in localStorage so the demo flows feel real.
 * Replace the login/register/logout implementations with Firebase calls
 * inside src/firebase/auth.js when wiring real credentials.
 */
const AuthContext = createContext(null);
const STORAGE_KEY = 'alma-liviana-user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  // Demo login. Any email containing "admin" gets admin role.
  const login = async ({ email }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const role = /admin|owner/i.test(email) ? 'admin' : 'customer';
    const fake = {
      uid: 'demo-' + Math.random().toString(36).slice(2, 8),
      email,
      name: email.split('@')[0],
      role,
    };
    setUser(fake);
    setLoading(false);
    return fake;
  };

  const register = async ({ name, email }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const fake = {
      uid: 'demo-' + Math.random().toString(36).slice(2, 8),
      email,
      name,
      role: 'customer',
    };
    setUser(fake);
    setLoading(false);
    return fake;
  };

  const logout = () => setUser(null);

  const hasRole = (roles = []) => !!user && roles.includes(user.role);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
