import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format.js';
import './CartItem.css';

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <article className="cart-item">
      <Link to={`/products/${item.id}`} className="cart-item__media">
        <img src={item.image} alt={item.name} />
      </Link>
      <div className="cart-item__body">
        <Link to={`/products/${item.id}`} className="cart-item__name">{item.name}</Link>
        {item.size && <span className="cart-item__size">Talle: {item.size}</span>}
        <span className="cart-item__price">{formatPrice(item.price)}</span>

        <div className="cart-item__controls">
          <div className="qty">
            <button onClick={() => onUpdate(item.lineId, item.quantity - 1)} aria-label="Disminuir">−</button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onUpdate(item.lineId, item.quantity + 1)}
              aria-label="Aumentar"
              disabled={item.maxStock != null && item.quantity >= item.maxStock}
            >
              +
            </button>
          </div>
          <button className="cart-item__remove" onClick={() => onRemove(item.lineId)}>
            Quitar
          </button>
        </div>
      </div>
      <div className="cart-item__subtotal">
        {formatPrice(item.price * item.quantity)}
      </div>
    </article>
  );
}
