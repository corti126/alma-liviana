import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './Auth.css';

const friendlyError = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con este correo.';
    case 'auth/invalid-email':
      return 'El correo no es válido.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    default:
      return 'No pudimos crear tu cuenta. Inténtalo de nuevo.';
  }
};

export default function Register() {
  const { register, submitting } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.name.trim().length < 2) {
      setError('Por favor ingresa tu nombre.');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(friendlyError(err?.code));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Alma Liviana</span>
        <h1>Crea tu cuenta</h1>
        <p className="auth-page__sub">Únete a nuestra comunidad slow fashion.</p>
        <form onSubmit={onSubmit}>
          <Input label="Nombre" name="name" value={form.name} onChange={onChange} required />
          <Input label="Correo" name="email" type="email" value={form.email} onChange={onChange} required />
          <Input label="Contraseña" name="password" type="password" value={form.password} onChange={onChange} required />
          <Input label="Confirmar contraseña" name="confirm" type="password" value={form.confirm} onChange={onChange} required />
          {error && <p className="auth-page__error">{error}</p>}
          <Button type="submit" variant="primary" size="lg" className="btn--block" disabled={submitting}>
            {submitting ? 'Creando…' : 'Crear cuenta'}
          </Button>
        </form>
        <div className="auth-page__links">
          <span>¿Ya tienes cuenta? <Link to="/login">Ingresar</Link></span>
        </div>
      </div>
    </div>
  );
}
