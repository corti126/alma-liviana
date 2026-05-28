import { formatPrice } from '../utils/format.js';

// Replace with the boutique's real business WhatsApp number (E.164, no +).
const BUSINESS_PHONE = '573000000000';

export function buildWhatsappMessage(items, total) {
  const lines = items.map(
    (i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`
  );
  return [
    '¡Hola Alma Liviana! Me gustaría hacer este pedido:',
    '',
    ...lines,
    '',
    `Total: ${formatPrice(total)}`,
    '',
    '¿Me ayudan a coordinar el envío? 💌',
  ].join('\n');
}

export function openWhatsappCheckout(items, total) {
  const message = buildWhatsappMessage(items, total);
  const url = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
