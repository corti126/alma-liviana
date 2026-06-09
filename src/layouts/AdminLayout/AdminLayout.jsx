import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle.jsx';
import './AdminLayout.css';

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className={`admin-layout ${open ? 'is-open' : ''}`}>
      {/* Mobile top bar with menu toggle and quick storefront access */}
      <header className="admin-topbar">
        <button
          className="admin-topbar__menu"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
        <Link to="/admin" className="admin-topbar__brand" onClick={close}>
          Alma Liviana
        </Link>
        <Link to="/products" className="admin-topbar__store" onClick={close}>
          Volver a la tienda
        </Link>
        <ThemeToggle />
      </header>

      {/* Drawer backdrop on mobile */}
      {open && <div className="admin-layout__backdrop" onClick={close} />}

      <Sidebar onNavigate={close} />

      <main className="admin-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
