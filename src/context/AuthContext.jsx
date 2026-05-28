import { createContext, useContext, useEffect, useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { 
  loginWithEmail, 
  registerWithEmail, 
  logout as firebaseLogout, 
  subscribeToAuth 
} from '../firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      // Firebase nos devuelve el objeto de usuario actualizado
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async ({ email, password }) => {
    return await loginWithEmail(email, password);
  };

const register = async ({ email, password }) => {
  console.log("Intentando registrar a:", email);
  try {
    const userCredential = await registerWithEmail(email, password);
    console.log("Firebase devolvió este usuario:", userCredential.user);
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Firebase falló en el registro:", error.code, error.message);
  }
};

  const logout = async () => {
    await firebaseLogout();
  };

  // Función para refrescar el estado del usuario tras verificar el correo
  const reloadUser = async () => {
    if (user) {
      await user.reload(); // Sincroniza con el servidor de Firebase
      // Actualizamos el estado local para que React re-renderice
      setUser({ ...user }); 
    }
  };

  const hasRole = (roles = []) => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, hasRole, reloadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}