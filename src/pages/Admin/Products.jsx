import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { listProducts, updateProduct, deleteProduct } from '../../firebase/products.js';
import AdminTable from '../../components/AdminTable/AdminTable.jsx';
import Button from '../../components/Button/Button.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { formatPrice } from '../../utils/format.js';
import { categoryLabel } from '../../utils/categories.js';
import {
  ADMIN_PRODUCT_TYPES,
  productTypeOf,
  productTypeLabel,
  productTypeSingular,
  isComingSoon,
} from '../../utils/productTypes.js';
import './Admin.css';

const totalStock = (p) =>
  Object.values(p.sizesStock || {}).reduce((s, n) => s + Number(n || 0), 0);

export default function AdminProducts() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('todos');

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

  // Tabs: Todos + the product families admins can manage. Counts update live.
  const tabs = useMemo(() => {
    const counts = (value) =>
      value === 'todos'
        ? rows.length
        : rows.filter((p) => productTypeOf(p) === value).length;
    return [
      { value: 'todos', label: 'Todos', count: counts('todos') },
      ...ADMIN_PRODUCT_TYPES.map((v) => ({
        value: v,
        label: productTypeLabel(v),
        count: counts(v),
      })),
    ];
  }, [rows]);

  const visibleRows = useMemo(
    () => (tab === 'todos' ? rows : rows.filter((p) => productTypeOf(p) === tab)),
    [rows, tab]
  );

  const columns = [
    {
      key: 'image',
      label: 'Producto',
      render: (r) => (
        <div className="admin__product-cell">
          <img src={r.image} alt={r.name} />
          <div>
            <div className="admin__product-name">{r.name}</div>
            <div className="admin__product-cat">
              {productTypeSingular(productTypeOf(r))} · {categoryLabel(r.category)}
            </div>
          </div>
        </div>
      ),
    },
    { key: 'price', label: 'Precio', render: (r) => formatPrice(r.price) },
    { key: 'stock', label: 'Stock', render: (r) => totalStock(r) },
    {
      key: 'launch',
      label: 'Estado',
      render: (r) =>
        isComingSoon(r) ? (
          <span className="admin__badge admin__badge--soon">Próximamente</span>
        ) : (
          <span className="admin__badge admin__badge--live">Disponible</span>
        ),
    },
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

  const newProductHref =
    tab === 'todos' ? '/admin/products/new' : `/admin/products/new?type=${tab}`;

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <span className="eyebrow">Tienda</span>
          <h1>Productos</h1>
          <p>Gestiona precios, stock por talle y prendas destacadas por tipo.</p>
        </div>
        <Link to={newProductHref}>
          <Button variant="primary">+ Nuevo producto</Button>
        </Link>
      </header>

      {/* Product type tabs — Shopify-style, scrollable on mobile */}
      <div className="admin__tabs" role="tablist" aria-label="Tipo de producto">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            className={`admin__tab ${tab === t.value ? 'is-active' : ''}`}
            onClick={() => setTab(t.value)}
          >
            {t.label}
            <span className="admin__tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '3rem 0', display: 'grid', placeItems: 'center' }}>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p style={{ color: 'var(--color-text-soft, #8a7d72)' }}>
          No pudimos cargar los productos. Revisa la conexión con Firebase.
        </p>
      ) : visibleRows.length === 0 ? (
        <div className="admin__empty">
          <div className="admin__empty-icon" aria-hidden="true">🧺</div>
          <h3>No hay productos cargados todavía</h3>
          <p>
            {tab === 'todos'
              ? 'Empieza creando tu primera prenda.'
              : `Aún no cargaste ${productTypeLabel(tab).toLowerCase()}. Prepara tu inventario antes del lanzamiento.`}
          </p>
          <Link to={newProductHref}>
            <Button variant="primary">Crear primer producto</Button>
          </Link>
        </div>
      ) : (
        <AdminTable columns={columns} rows={visibleRows} empty="Aún no tienes productos." />
      )}
    </div>
  );
}
