import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './Auth.css';

const friendlyError = (code) => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Correo o contraseña incorrectos.';
    case 'auth/invalid-email':
      return 'El correo no es válido.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Inténtalo más tarde.';
    default:
      return 'No pudimos iniciar tu sesión. Inténtalo de nuevo.';
  }
};

export default function Login() {
  const { login, submitting } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await login(form);
      const from =
        location.state?.from ||
        (user.role === 'admin' || user.role === 'owner' ? '/admin' : '/');
      navigate(from, { replace: true });
    } catch (err) {
      setError(friendlyError(err?.code));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Alma Liviana</span>
        <h1>Bienvenida de nuevo</h1>
        <p className="auth-page__sub">Ingresa para ver tu cuenta y pedidos.</p>
        <form onSubmit={onSubmit}>
          <Input label="Correo" name="email" type="email" value={form.email} onChange={onChange} required placeholder="tu@correo.com" />
          <Input label="Contraseña" name="password" type="password" value={form.password} onChange={onChange} required placeholder="••••••••" />
          {error && <p className="auth-page__error">{error}</p>}
          <Button type="submit" variant="primary" size="lg" className="btn--block" disabled={submitting}>
            {submitting ? 'Ingresando…' : 'Ingresar'}
          </Button>
        </form>
        <div className="auth-page__links">
          <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
          <span>¿Sos nueva? <Link to="/register">Creá tu cuenta</Link></span>
        </div>
      </div>
    </div>
  );
}
