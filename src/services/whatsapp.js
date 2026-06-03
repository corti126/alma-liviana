import { formatPrice } from '../utils/format.js';

// Replace with the boutique's real business WhatsApp number (E.164, no +).
export const BUSINESS_PHONE = '573000000000';

export function buildWhatsappMessage(items, total, customerName) {
  const greeting = customerName
    ? `¡Hola Alma Liviana! Soy ${customerName} y me gustaría hacer este pedido:`
    : '¡Hola Alma Liviana! Me gustaría hacer este pedido:';

  const lines = items.flatMap((i) => [
    `• ${i.name}`,
    `   Talle: ${i.size || 'Única'} · Cantidad: ${i.quantity} — ${formatPrice(
      i.price * i.quantity
    )}`,
  ]);

  return [
    greeting,
    '',
    ...lines,
    '',
    `Total: ${formatPrice(total)}`,
    '',
    '¿Me ayudan a coordinar el envío? 💌',
  ].join('\n');
}

export function openWhatsappCheckout(items, total, customerName) {
  const message = buildWhatsappMessage(items, total, customerName);
  const url = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
