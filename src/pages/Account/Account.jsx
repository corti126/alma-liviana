import { Link, useNavigate } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './Account.css';

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="container account-page__inner">
        <SectionTitle eyebrow="Mi cuenta" title={`Hola, ${user.name?.split(' ')[0] || ''}`} />

        <div className="account-card">
          <div className="account-card__row">
            <span className="account-card__label">Nombre</span>
            <span className="account-card__value">{user.name}</span>
          </div>
          <div className="account-card__row">
            <span className="account-card__label">Correo</span>
            <span className="account-card__value">{user.email}</span>
          </div>
          <div className="account-card__row">
            <span className="account-card__label">Tipo de cuenta</span>
            <span className="account-card__value">
              {user.role === 'customer' ? 'Clienta' : user.role}
            </span>
          </div>
        </div>

        <div className="account-page__actions">
          {(user.role === 'admin' || user.role === 'owner') && (
            <Link to="/admin"><Button variant="ghost">Ir al panel de administración</Button></Link>
          )}
          <Link to="/products"><Button variant="ghost">Seguir comprando</Button></Link>
          <Button variant="primary" onClick={handleLogout}>Cerrar sesión</Button>
        </div>
      </div>
    </div>
  );
}
