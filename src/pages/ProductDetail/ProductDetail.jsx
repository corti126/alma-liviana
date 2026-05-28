import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products, { getById } from '../../data/products.js';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { formatPrice } from '../../utils/format.js';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getById(id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 0' }}>
        <EmptyState
          title="No encontramos esta prenda"
          description="Es posible que ya no esté disponible."
          action={<Link to="/products"><Button variant="primary">Volver a la tienda</Button></Link>}
        />
      </div>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="pdp">
      <div className="container">
        <nav className="pdp__crumbs">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to="/products">Tienda</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="pdp__main">
          <div className="pdp__gallery">
            <div className="pdp__photo">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="pdp__thumbs">
              {[product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="pdp__thumb">
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div className="pdp__info">
            <span className="eyebrow">{product.category}</span>
            <h1 className="pdp__title">{product.name}</h1>
            <div className="pdp__price">{formatPrice(product.price)}</div>
            <p className="pdp__desc">{product.description}</p>

            <div className="pdp__stock">
              {product.stock > 0 ? (
                <span>Disponible · {product.stock} en stock</span>
              ) : (
                <span className="pdp__stock--out">Agotada por ahora</span>
              )}
            </div>

            <div className="pdp__actions">
              <div className="pdp__qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Disminuir">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Aumentar">+</button>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleAdd}
                disabled={product.stock === 0}
              >
                {added ? '✓ Añadido al carrito' : 'Añadir al carrito'}
              </Button>
            </div>

            <ul className="pdp__meta">
              <li>Algodón orgánico premium</li>
              <li>Hecho a mano en pequeñas tandas</li>
              <li>Envíos en 3–5 días hábiles</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="pdp__related">
            <SectionTitle eyebrow="También te pueden gustar" title="Piezas relacionadas" />
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </div>
  );
}
