import { createContext, useContext, useEffect, useState } from 'react';
import {
  loginWithEmail,
  registerWithEmail,
  logout as firebaseLogout,
  subscribeToAuth,
  updateAuthProfile,
} from '../firebase/auth.js';
import { getUserProfile, createUserProfile } from '../firebase/users.js';

/**
 * Firebase-powered auth context.
 * - Persists the session across refreshes (browserLocalPersistence).
 * - Loads the matching Firestore profile (name + role) on auth changes.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToAuth(async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      let profile = null;
      try {
        profile = await getUserProfile(fbUser.uid);
      } catch {
        profile = null;
      }
      setUser({
        uid: fbUser.uid,
        email: fbUser.email,
        name: profile?.name || fbUser.displayName || fbUser.email?.split('@')[0],
        role: profile?.role || 'customer',
      });
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async ({ email, password }) => {
    setSubmitting(true);
    try {
      const cred = await loginWithEmail(email, password);
      let profile = null;
      try {
        profile = await getUserProfile(cred.user.uid);
      } catch {
        profile = null;
      }
      const resolved = {
        uid: cred.user.uid,
        email: cred.user.email,
        name: profile?.name || cred.user.displayName || email.split('@')[0],
        role: profile?.role || 'customer',
      };
      setUser(resolved);
      return resolved;
    } finally {
      setSubmitting(false);
    }
  };

  const register = async ({ name, email, password }) => {
    setSubmitting(true);
    try {
      const cred = await registerWithEmail(email, password);
      await updateAuthProfile(name);
      await createUserProfile(cred.user.uid, { name, email, role: 'customer' });
      const resolved = {
        uid: cred.user.uid,
        email,
        name,
        role: 'customer',
      };
      setUser(resolved);
      return resolved;
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  const hasRole = (roles = []) => !!user && roles.includes(user.role);

  return (
    <AuthContext.Provider
      value={{ user, loading, submitting, login, register, logout, hasRole }}
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
