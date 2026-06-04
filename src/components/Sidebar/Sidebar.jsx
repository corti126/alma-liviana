import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Sidebar.css';

const links = [
  { to: '/admin', label: 'Resumen', end: true },
  { to: '/admin/products', label: 'Productos' },
  { to: '/admin/orders', label: 'Pedidos' },
];

export default function Sidebar({ onNavigate }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    onNavigate?.();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <Link to="/" className="navbar__brand" onClick={close}>
          <img
            src="/favicon-96x96.png"
            alt="Alma Liviana"
            className="navbar__brand-mark"
          />
          <div>
            <div className="sidebar__title">Alma Liviana</div>
            <div className="sidebar__sub">Panel de administración</div>
          </div>
        </Link>
      </div>

      <nav className="sidebar__nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'is-active' : ''}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__store">
        <span className="sidebar__store-label">Tienda</span>
        <Link to="/" onClick={onNavigate} className="sidebar__store-link">
          <span aria-hidden="true">⌂</span> Ir al inicio
        </Link>
        <Link to="/products" onClick={onNavigate} className="sidebar__store-link">
          <span aria-hidden="true">←</span> Volver a la tienda
        </Link>
      </div>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
          <div>
            <div className="sidebar__user-name">{user?.name}</div>
            <div className="sidebar__user-role">{user?.role}</div>
          </div>
        </div>
        <button className="sidebar__logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
