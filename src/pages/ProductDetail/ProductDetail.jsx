import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, listProducts } from '../../firebase/products.js';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { formatPrice } from '../../utils/format.js';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setProduct(null);
    setSize('');
    setQty(1);
    (async () => {
      try {
        const [p, all] = await Promise.all([getProduct(id), listProducts()]);
        if (!active) return;
        setProduct(p);
        if (p) {
          setRelated(
            all
              .filter((x) => x.id !== p.id && x.active && x.category === p.category)
              .slice(0, 4)
          );
        }
      } catch {
        if (active) setProduct(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', display: 'grid', placeItems: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

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

  const sizes = product.sizes || [];
  const sizesStock = product.sizesStock || {};
  const stockFor = (s) => Number(sizesStock[s] || 0);
  const totalStock = sizes.reduce((sum, s) => sum + stockFor(s), 0);
  const selectedStock = size ? stockFor(size) : 0;
  const soldOut = sizes.length > 0 && totalStock === 0;

  const handleSelectSize = (s) => {
    if (stockFor(s) <= 0) return;
    setSize(s);
    setSizeError(false);
    setQty(1);
  };

  const handleAdd = () => {
    if (sizes.length > 0 && !size) {
      setSizeError(true);
      return;
    }
    if (size && selectedStock <= 0) return;
    addItem(product, { size: size || null, quantity: qty, maxStock: size ? selectedStock : Infinity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const maxQty = size ? selectedStock : 99;

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
          </div>

          <div className="pdp__info">
            <span className="eyebrow">{product.category}</span>
            <h1 className="pdp__title">{product.name}</h1>
            <div className="pdp__price">{formatPrice(product.price)}</div>
            <p className="pdp__desc">{product.description}</p>

            {sizes.length > 0 && (
              <div className="pdp__sizes">
                <div className="pdp__sizes-head">
                  <span>Talle</span>
                  {size && <span className="pdp__sizes-stock">{selectedStock} disponibles</span>}
                </div>
                <div className="pdp__sizes-grid">
                  {sizes.map((s) => {
                    const out = stockFor(s) <= 0;
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`pdp__size ${size === s ? 'is-active' : ''} ${out ? 'is-out' : ''}`}
                        onClick={() => handleSelectSize(s)}
                        disabled={out}
                        title={out ? 'Sin stock' : `Talle ${s}`}
                      >
                        {s}
                        {out && <span className="pdp__size-out">Sin stock</span>}
                      </button>
                    );
                  })}
                </div>
                {sizeError && (
                  <p className="pdp__size-error">Por favor elige un talle.</p>
                )}
              </div>
            )}

            <div className="pdp__stock">
              {soldOut ? (
                <span className="pdp__stock--out">Agotada por ahora</span>
              ) : (
                <span>Disponible</span>
              )}
            </div>

            <div className="pdp__actions">
              <div className="pdp__qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Disminuir">−</button>
                <span>{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                  aria-label="Aumentar"
                  disabled={qty >= maxQty}
                >
                  +
                </button>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleAdd}
                disabled={soldOut || (!!size && selectedStock <= 0)}
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
