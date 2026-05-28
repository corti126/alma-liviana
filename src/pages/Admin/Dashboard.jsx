import products from '../../data/products.js';
import { formatPrice } from '../../utils/format.js';
import './Admin.css';

export default function Dashboard() {
  const active = products.filter((p) => p.active);
  const lowStock = active.filter((p) => p.stock <= 6).length;
  const featured = active.filter((p) => p.featured).length;
  const inventoryValue = active.reduce((s, p) => s + p.price * p.stock, 0);

  const stats = [
    { label: 'Productos activos', value: active.length },
    { label: 'Destacados', value: featured },
    { label: 'Bajo stock (≤6)', value: lowStock },
    { label: 'Valor inventario', value: formatPrice(inventoryValue) },
  ];

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <span className="eyebrow">Panel</span>
          <h1>Hola de nuevo 🌿</h1>
          <p>Aquí tienes un resumen rápido de tu boutique.</p>
        </div>
      </header>

      <div className="admin__stats">
        {stats.map((s) => (
          <div key={s.label} className="admin__stat">
            <span className="admin__stat-label">{s.label}</span>
            <span className="admin__stat-value">{s.value}</span>
          </div>
        ))}
      </div>

      <section className="admin__tips">
        <h3>Consejos rápidos</h3>
        <ul>
          <li>Edita tus productos en <strong>Productos</strong> para actualizar precios o stock.</li>
          <li>Activa <strong>Destacado</strong> para mostrar la prenda en la página principal.</li>
          <li>Revisa los pedidos llegados por WhatsApp en <strong>Pedidos</strong>.</li>
        </ul>
      </section>
    </div>
  );
}
