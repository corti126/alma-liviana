import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const close = () => setOpen(false);
  const firstName = user?.name?.split(' ')[0] || '';

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={close}>
          <img
            src="/favicon-96x96.png"
            alt="Alma Liviana"
            className="navbar__brand-mark"
          />
          <span className="navbar__brand-name">Alma Liviana</span>
        </Link>

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={close} className="navbar__link">Inicio</NavLink>
          <NavLink to="/products" onClick={close} className="navbar__link">Tienda</NavLink>
          <NavLink to="/contacto" onClick={close} className="navbar__link">Contacto</NavLink>
          {user?.role === 'admin' || user?.role === 'owner' ? (
            <NavLink to="/admin" onClick={close} className="navbar__link">Admin</NavLink>
          ) : null}
        </nav>

        <div className="navbar__actions">
          {user ? (
            <div className="navbar__account" ref={menuRef}>
              <button
                className="navbar__action navbar__account-trigger"
                onClick={() => setMenuOpen((o) => !o)}
              >
                Hola, {firstName}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {menuOpen && (
                <div className="navbar__menu">
                  <Link to="/mi-cuenta" className="navbar__menu-item" onClick={() => setMenuOpen(false)}>
                    Mi cuenta
                  </Link>
                  <button className="navbar__menu-item" onClick={handleLogout}>
                    Salir
                  </button>
                </div>
              )}
            </div>
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
