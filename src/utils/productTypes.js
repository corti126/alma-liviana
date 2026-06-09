// Product type system for Alma Liviana.
//
// Firestore stores the product family in the `productType` field and the
// availability stage in the `launchStatus` field. This module centralizes all
// product-type knowledge so the store can scale to new families (buzos,
// camperas, accesorios, pantalones, …) WITHOUT hardcoding logic per type.
//
// Document fields used:
//   productType:  "remera" | "buzo" | "campera" | "accesorio" | "pantalon"
//   launchStatus: "available" | "coming_soon"

// Order here defines the order used across the store and admin tabs.
export const PRODUCT_TYPE_OPTIONS = [
  { value: 'remera', label: 'Remeras', singular: 'Remera' },
  { value: 'buzo', label: 'Buzos', singular: 'Buzo' },
  // Future families — already supported by the data model and UI:
  { value: 'campera', label: 'Camperas', singular: 'Campera' },
  { value: 'accesorio', label: 'Accesorios', singular: 'Accesorio' },
  { value: 'pantalon', label: 'Pantalones', singular: 'Pantalón' },
];

// Product types offered to admins when creating/editing a product.
// Extend this list (or PRODUCT_TYPE_OPTIONS) to roll out new families.
export const ADMIN_PRODUCT_TYPES = ['remera', 'buzo'];

// The default type for legacy products that predate the `productType` field.
export const DEFAULT_PRODUCT_TYPE = 'remera';

const TYPE_MAP = PRODUCT_TYPE_OPTIONS.reduce(
  (acc, t) => ({ ...acc, [t.value]: t }),
  {}
);

// Normalizes a product's type, defaulting legacy data to remera.
export function productTypeOf(product) {
  return product?.productType || DEFAULT_PRODUCT_TYPE;
}

// Friendly plural label (e.g. "Buzos"). Falls back to a humanized slug.
export function productTypeLabel(value) {
  if (!value) return '';
  if (TYPE_MAP[value]) return TYPE_MAP[value].label;
  return String(value)
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Friendly singular label (e.g. "Buzo"). Falls back to the plural label.
export function productTypeSingular(value) {
  if (value && TYPE_MAP[value]) return TYPE_MAP[value].singular;
  return productTypeLabel(value);
}

// ===== Launch status =====
export const LAUNCH_STATUS = {
  AVAILABLE: 'available',
  COMING_SOON: 'coming_soon',
};

export const LAUNCH_STATUS_OPTIONS = [
  { value: 'available', label: 'Disponible' },
  { value: 'coming_soon', label: 'Próximamente' },
];

// True when a product is not yet released to customers.
export function isComingSoon(product) {
  return (product?.launchStatus || LAUNCH_STATUS.AVAILABLE) === LAUNCH_STATUS.COMING_SOON;
}

// Friendly label for a launch status value.
export function launchStatusLabel(value) {
  const found = LAUNCH_STATUS_OPTIONS.find((o) => o.value === value);
  return found ? found.label : 'Disponible';
}
