import { useEffect, useState } from 'react';
import { listProducts } from '../../firebase/products.js';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { formatPrice } from '../../utils/format.js';
import './Admin.css';

const totalStock = (p) =>
  Object.values(p.sizesStock || {}).reduce((s, n) => s + Number(n || 0), 0);

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await listProducts();
        if (active) setProducts(data);
      } catch {
        if (active) setProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const activeProducts = products.filter((p) => p.active);
  const lowStock = activeProducts.filter((p) => totalStock(p) <= 6).length;
  const featured = activeProducts.filter((p) => p.featured).length;
  const inventoryValue = activeProducts.reduce((s, p) => s + p.price * totalStock(p), 0);

  const stats = [
    { label: 'Productos activos', value: activeProducts.length },
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

      {loading ? (
        <div style={{ padding: '3rem 0', display: 'grid', placeItems: 'center' }}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="admin__stats">
          {stats.map((s) => (
            <div key={s.label} className="admin__stat">
              <span className="admin__stat-label">{s.label}</span>
              <span className="admin__stat-value">{s.value}</span>
            </div>
          ))}
        </div>
      )}

      <section className="admin__tips">
        <h3>Consejos rápidos</h3>
        <ul>
          <li>Edita tus productos en <strong>Productos</strong> para actualizar precios o stock por talla.</li>
          <li>Activa <strong>Destacado</strong> para mostrar la prenda en la página principal.</li>
          <li>Revisa los pedidos llegados por WhatsApp en <strong>Pedidos</strong>.</li>
        </ul>
      </section>
    </div>
  );
}
