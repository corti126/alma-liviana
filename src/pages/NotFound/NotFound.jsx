import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';

export default function NotFound() {
  return (
    <div style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
      <span className="eyebrow">404</span>
      <h1 style={{ marginTop: '1rem' }}>Esta página se perdió en calma.</h1>
      <p style={{ color: 'var(--color-text-soft)', marginBottom: '2rem' }}>
        Volvamos al inicio para encontrar lo que buscas.
      </p>
      <Link to="/"><Button variant="primary">Volver al inicio</Button></Link>
    </div>
  );
}
