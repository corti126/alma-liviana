import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={close}>
          <span className="navbar__brand-mark">A·L</span>
          <span className="navbar__brand-name">Alma Liviana</span>
        </Link>

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={close} className="navbar__link">Inicio</NavLink>
          <NavLink to="/products" onClick={close} className="navbar__link">Tienda</NavLink>
          <a href="#about" onClick={close} className="navbar__link">Sobre nosotras</a>
          {user?.role === 'admin' || user?.role === 'owner' ? (
            <NavLink to="/admin" onClick={close} className="navbar__link">Admin</NavLink>
          ) : null}
        </nav>

        <div className="navbar__actions">
          {user ? (
            <button className="navbar__action" onClick={logout} title="Cerrar sesión">
              Hola, {user.name}
            </button>
          ) : (
            <Link to="/login" className="navbar__action">Ingresar</Link>
          )}
          <Link to="/cart" className="navbar__cart" aria-label="Carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 4h2l2.5 12h11L21 7H6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="20" r="1.4"/>
              <circle cx="18" cy="20" r="1.4"/>
            </svg>
            {count > 0 && <span className="navbar__cart-count">{count}</span>}
          </Link>
          <button
            className={`navbar__burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
