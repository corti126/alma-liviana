import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { resetPassword } from '../../firebase/auth.js';
import '../Login/Auth.css';

const friendlyError = (code) => {
  switch (code) {
    case 'auth/invalid-email':
      return 'El correo no es válido.';
    case 'auth/user-not-found':
      // For privacy we still show a success message even if not found.
      return null;
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intentá de nuevo más tarde.';
    default:
      return 'No pudimos enviar el correo. Intentá de nuevo.';
  }
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (err) {
      const message = friendlyError(err?.code);
      if (message === null) {
        // Treat "user not found" as success to avoid leaking which emails exist.
        setSent(true);
      } else {
        setError(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Alma Liviana</span>
        <h1>Recuperar contraseña</h1>
        <p className="auth-page__sub">
          Ingresá tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {sent ? (
          <>
            <p className="auth-page__success">
              Si existe una cuenta con ese correo, te enviamos un enlace para
              restablecer tu contraseña. Revisá tu bandeja de entrada y la carpeta
              de spam. 💌
            </p>
            <Link to="/login">
              <Button variant="primary" size="lg" className="btn--block">
                Volver a ingresar
              </Button>
            </Link>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            <Input
              label="Correo"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@correo.com"
            />
            {error && <p className="auth-page__error">{error}</p>}
            <Button type="submit" variant="primary" size="lg" className="btn--block" disabled={submitting}>
              {submitting ? 'Enviando…' : 'Enviar enlace'}
            </Button>
          </form>
        )}

        <div className="auth-page__links">
          <span>¿Recordaste tu contraseña? <Link to="/login">Ingresar</Link></span>
        </div>
      </div>
    </div>
  );
}
