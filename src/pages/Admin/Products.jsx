import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listProducts, updateProduct, deleteProduct } from '../../firebase/products.js';
import AdminTable from '../../components/AdminTable/AdminTable.jsx';
import Button from '../../components/Button/Button.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { formatPrice } from '../../utils/format.js';
import { categoryLabel } from '../../utils/categories.js';
import './Admin.css';

const totalStock = (p) =>
  Object.values(p.sizesStock || {}).reduce((s, n) => s + Number(n || 0), 0);

export default function AdminProducts() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await listProducts();
        if (active) setRows(data);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const toggleField = async (id, field) => {
    const current = rows.find((p) => p.id === id);
    if (!current) return;
    const next = !current[field];
    setRows((r) => r.map((p) => (p.id === id ? { ...p, [field]: next } : p)));
    try {
      await updateProduct(id, { [field]: next });
    } catch {
      setRows((r) => r.map((p) => (p.id === id ? { ...p, [field]: !next } : p)));
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    const prev = rows;
    setRows((r) => r.filter((p) => p.id !== id));
    try {
      await deleteProduct(id);
    } catch {
      setRows(prev);
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Producto',
      render: (r) => (
        <div className="admin__product-cell">
          <img src={r.image} alt={r.name} />
          <div>
            <div className="admin__product-name">{r.name}</div>
            <div className="admin__product-cat">{categoryLabel(r.category)}</div>
          </div>
        </div>
      ),
    },
    { key: 'price', label: 'Precio', render: (r) => formatPrice(r.price) },
    { key: 'stock', label: 'Stock', render: (r) => totalStock(r) },
    {
      key: 'featured',
      label: 'Destacado',
      render: (r) => (
        <label className="switch">
          <input type="checkbox" checked={!!r.featured} onChange={() => toggleField(r.id, 'featured')} />
          <span />
        </label>
      ),
    },
    {
      key: 'active',
      label: 'Activo',
      render: (r) => (
        <label className="switch">
          <input type="checkbox" checked={!!r.active} onChange={() => toggleField(r.id, 'active')} />
          <span />
        </label>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (r) => (
        <div className="admin__row-actions">
          <Link to={`/admin/products/${r.id}/edit`}>
            <Button variant="ghost" size="sm">Editar</Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => handleDelete(r.id, r.name)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <span className="eyebrow">Tienda</span>
          <h1>Productos</h1>
          <p>Gestiona precios, stock por talla y prendas destacadas.</p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary">+ Nuevo producto</Button>
        </Link>
      </header>
      {loading ? (
        <div style={{ padding: '3rem 0', display: 'grid', placeItems: 'center' }}>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p style={{ color: 'var(--color-text-soft, #8a7d72)' }}>
          No pudimos cargar los productos. Revisa la conexión con Firebase.
        </p>
      ) : (
        <AdminTable columns={columns} rows={rows} empty="Aún no tienes productos." />
      )}
    </div>
  );
}
