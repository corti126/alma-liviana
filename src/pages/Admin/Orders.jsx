import { useEffect, useState } from 'react';
import AdminTable from '../../components/AdminTable/AdminTable.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { listOrders, updateOrderStatus } from '../../firebase/orders.js';
import { formatPrice } from '../../utils/format.js';
import './Admin.css';

const STATUSES = ['pendiente', 'pagado', 'preparando', 'enviado', 'entregado'];

const formatDate = (createdAt) => {
  if (!createdAt) return '—';
  const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
  return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await listOrders();
        if (active) setOrders(data);
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

  const changeStatus = async (id, status) => {
    const prev = orders;
    setOrders((o) => o.map((ord) => (ord.id === id ? { ...ord, status } : ord)));
    try {
      await updateOrderStatus(id, status);
    } catch {
      setOrders(prev);
    }
  };

  const columns = [
    { key: 'id', label: 'Pedido', render: (r) => `#${r.id.slice(0, 6)}` },
    { key: 'customerName', label: 'Cliente', render: (r) => r.customerName || '—' },
    { key: 'items', label: 'Items', render: (r) => (r.items || []).reduce((s, i) => s + i.quantity, 0) },
    { key: 'total', label: 'Total', render: (r) => formatPrice(r.total || 0) },
    {
      key: 'status',
      label: 'Estado',
      render: (r) => (
        <select
          className="admin__status-select"
          value={r.status || 'pendiente'}
          onChange={(e) => changeStatus(r.id, e.target.value)}
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      ),
    },
    { key: 'date', label: 'Fecha', render: (r) => formatDate(r.createdAt) },
  ];

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <span className="eyebrow">Pedidos</span>
          <h1>Tus pedidos recientes</h1>
          <p>Aquí verás los pedidos coordinados por WhatsApp.</p>
        </div>
      </header>
      {loading ? (
        <div style={{ padding: '3rem 0', display: 'grid', placeItems: 'center' }}>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p style={{ color: 'var(--color-text-soft, #8a7d72)' }}>
          No pudimos cargar los pedidos. Revisa la conexión con Firebase.
        </p>
      ) : (
        <AdminTable columns={columns} rows={orders} empty="Aún no tienes pedidos." />
      )}
    </div>
  );
}
