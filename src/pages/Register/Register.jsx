import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './Auth.css';

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    try {
      await register(form);
      navigate('/', { replace: true });
    } catch {
      setError('No pudimos crear tu cuenta.');
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
          <Button type="submit" variant="primary" size="lg" className="btn--block" disabled={loading}>
            {loading ? 'Creando…' : 'Crear cuenta'}
          </Button>
        </form>
        <div className="auth-page__links">
          <span>¿Ya tienes cuenta? <Link to="/login">Ingresar</Link></span>
        </div>
      </div>
    </div>
  );
}
