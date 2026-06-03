import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import CartItem from '../../components/CartItem/CartItem.jsx';
import Button from '../../components/Button/Button.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import { openWhatsappCheckout } from '../../services/whatsapp.js';
import { createOrder } from '../../firebase/orders.js';
import { formatPrice } from '../../utils/format.js';
import './Cart.css';

export default function Cart() {
  const { items, updateQuantity, removeItem, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    // Best-effort: persist the order, but never block the WhatsApp flow.
    try {
      await createOrder({
        userId: user.uid,
        customerName: user.name,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          size: i.size,
          price: i.price,
          quantity: i.quantity,
        })),
        total,
      });
    } catch {
      // Firestore may not be reachable yet; continue to WhatsApp anyway.
    }
    openWhatsappCheckout(items, total, user.name);
  };

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
                  key={item.lineId}
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

      <Modal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        title="Inicia sesión para continuar"
        actions={
          <>
            <Button variant="ghost" onClick={() => setShowLogin(false)}>Cancelar</Button>
            <Button
              variant="primary"
              onClick={() => navigate('/login', { state: { from: '/cart' } })}
            >
              Ir a iniciar sesión
            </Button>
          </>
        }
      >
        Debes iniciar sesión para finalizar tu compra.
      </Modal>
    </div>
  );
}
