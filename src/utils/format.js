// Formats a number as Colombian peso style currency.
export function formatPrice(value) {
  if (typeof value !== 'number') return '';
  return '$' + value.toLocaleString('es-CO');
}
