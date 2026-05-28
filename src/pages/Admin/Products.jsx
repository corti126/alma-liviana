import { Link } from 'react-router-dom';
import { useState } from 'react';
import products from '../../data/products.js';
import AdminTable from '../../components/AdminTable/AdminTable.jsx';
import Button from '../../components/Button/Button.jsx';
import { formatPrice } from '../../utils/format.js';
import './Admin.css';

export default function AdminProducts() {
  // Local mock state — replace with Firestore mutations later.
  const [rows, setRows] = useState(products);

  const toggleFeatured = (id) =>
    setRows((r) => r.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  const toggleActive = (id) =>
    setRows((r) => r.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));

  const columns = [
    {
      key: 'image',
      label: 'Producto',
      render: (r) => (
        <div className="admin__product-cell">
          <img src={r.image} alt={r.name} />
          <div>
            <div className="admin__product-name">{r.name}</div>
            <div className="admin__product-cat">{r.category}</div>
          </div>
        </div>
      ),
    },
    { key: 'price', label: 'Precio', render: (r) => formatPrice(r.price) },
    { key: 'stock', label: 'Stock' },
    {
      key: 'featured',
      label: 'Destacado',
      render: (r) => (
        <label className="switch">
          <input type="checkbox" checked={r.featured} onChange={() => toggleFeatured(r.id)} />
          <span />
        </label>
      ),
    },
    {
      key: 'active',
      label: 'Activo',
      render: (r) => (
        <label className="switch">
          <input type="checkbox" checked={r.active} onChange={() => toggleActive(r.id)} />
          <span />
        </label>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (r) => (
        <Link to={`/admin/products/${r.id}/edit`}>
          <Button variant="ghost" size="sm">Editar</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <span className="eyebrow">Tienda</span>
          <h1>Productos</h1>
          <p>Gestiona precios, stock y prendas destacadas.</p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary">+ Nuevo producto</Button>
        </Link>
      </header>
      <AdminTable columns={columns} rows={rows} />
    </div>
  );
}
