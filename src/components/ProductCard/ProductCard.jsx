import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format.js';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card__media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.featured && <span className="product-card__tag">Destacado</span>}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <span className="product-card__price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
