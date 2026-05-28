import AdminTable from '../../components/AdminTable/AdminTable.jsx';
import './Admin.css';

export default function AdminOrders() {
  // Mock orders — replace with Firestore data.
  const orders = [
    { id: 'AL-1021', client: 'María José', items: 2, total: '$47.000', status: 'Enviado', date: '12 May' },
    { id: 'AL-1020', client: 'Lucía', items: 1, total: '$22.000', status: 'Preparando', date: '11 May' },
    { id: 'AL-1019', client: 'Andrea', items: 3, total: '$72.000', status: 'Pagado', date: '10 May' },
  ];

  const columns = [
    { key: 'id', label: 'Pedido' },
    { key: 'client', label: 'Cliente' },
    { key: 'items', label: 'Items' },
    { key: 'total', label: 'Total' },
    {
      key: 'status',
      label: 'Estado',
      render: (r) => <span className={`admin__status admin__status--${r.status.toLowerCase()}`}>{r.status}</span>,
    },
    { key: 'date', label: 'Fecha' },
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
      <AdminTable columns={columns} rows={orders} empty="Aún no tienes pedidos." />
    </div>
  );
}
