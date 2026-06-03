import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'alma-liviana-cart';

const lineIdFor = (id, size) => `${id}__${size || 'unica'}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // addItem(product, { size, quantity, maxStock })
  const addItem = (product, { size, quantity = 1, maxStock = Infinity } = {}) => {
    const lineId = lineIdFor(product.id, size);
    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId);
      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, maxStock);
        return prev.map((i) =>
          i.lineId === lineId ? { ...i, quantity: nextQty, maxStock } : i
        );
      }
      return [
        ...prev,
        {
          lineId,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: size || null,
          quantity: Math.min(quantity, maxStock),
          maxStock: Number.isFinite(maxStock) ? maxStock : null,
        },
      ];
    });
  };

  const removeItem = (lineId) =>
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));

  const updateQuantity = (lineId, quantity) => {
    if (quantity <= 0) return removeItem(lineId);
    setItems((prev) =>
      prev.map((i) => {
        if (i.lineId !== lineId) return i;
        const cap = i.maxStock || Infinity;
        return { ...i, quantity: Math.min(quantity, cap) };
      })
    );
  };

  const clear = () => setItems([]);

  const value = useMemo(() => {
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);
    return { items, addItem, removeItem, updateQuantity, clear, total, count };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
