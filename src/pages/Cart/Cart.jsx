import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import CartItem from '../../components/CartItem/CartItem.jsx';
import Button from '../../components/Button/Button.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import { openWhatsappCheckout } from '../../services/whatsapp.js';
import { formatPrice } from '../../utils/format.js';
import './Cart.css';

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();

  const handleCheckout = () => openWhatsappCheckout(items, total);

  return (
    <div className="cart-page">
      <div className="container">
        <SectionTitle eyebrow="Tu carrito" title="Resumen de tu pedido" />

        {items.length === 0 ? (
          <EmptyState
            title="Tu carrito está vacío"
            description="Descubre nuestra colección de camisetas y elige tus favoritas."
            action={<Link to="/products"><Button variant="primary">Ir a la tienda</Button></Link>}
          />
        ) : (
          <div className="cart-page__grid">
            <div className="cart-page__items">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdate={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <aside className="cart-page__summary">
              <h3>Resumen</h3>
              <div className="cart-page__row">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="cart-page__row cart-page__row--muted">
                <span>Envío</span>
                <span>Se coordina por WhatsApp</span>
              </div>
              <div className="cart-page__row cart-page__row--total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button variant="primary" size="lg" className="btn--block" onClick={handleCheckout}>
                Finalizar por WhatsApp
              </Button>
              <Link to="/products" className="cart-page__continue">← Seguir comprando</Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
