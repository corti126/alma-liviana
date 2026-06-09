// Formats a number as Argentine peso style currency (e.g. $25.000).
export function formatPrice(value) {
  if (typeof value !== 'number') return '';
  return '$' + value.toLocaleString('es-AR');
}
