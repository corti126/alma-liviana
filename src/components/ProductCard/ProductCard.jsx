import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { isComingSoon } from '../../utils/productTypes.js';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(['admin', 'owner']);
  const comingSoon = isComingSoon(product);
  // Customers see coming-soon pieces as an elegant preview they cannot open.
  // Admins keep full access so they can prepare inventory before launch.
  const locked = comingSoon && !isAdmin;

  const media = (
    <div className="product-card__media">
      <img src={product.image} alt={product.name} loading="lazy" />
      {product.featured && !comingSoon && (
        <span className="product-card__tag">Destacado</span>
      )}
      {comingSoon && (
        <span className="product-card__soon-tag">Próximamente</span>
      )}
      {locked && (
        <div className="product-card__veil">
          <span className="product-card__veil-title">Próximamente</span>
          <span className="product-card__veil-sub">Coming Soon</span>
        </div>
      )}
    </div>
  );

  const body = (
    <div className="product-card__body">
      <h3 className="product-card__name">{product.name}</h3>
      {locked ? (
        <span className="product-card__price product-card__price--soon">Lanzamiento próximo</span>
      ) : (
        <span className="product-card__price">{formatPrice(product.price)}</span>
      )}
    </div>
  );

  if (locked) {
    return (
      <div className="product-card is-locked" aria-disabled="true">
        {media}
        {body}
      </div>
    );
  }

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      {media}
      {body}
    </Link>
  );
}
