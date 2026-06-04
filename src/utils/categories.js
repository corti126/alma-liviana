// Product categories for Alma Liviana.
//
// Firestore stores the category as a slug (e.g. "oversized", "basicas").
// The UI shows a friendly label. New categories created in Firestore that are
// not in this list will still work: `categoryLabel` falls back to a
// capitalized version of the slug, and the products page reads categories
// dynamically from the products themselves.

export const CATEGORY_OPTIONS = [
  { value: 'oversized', label: 'Oversized' },
  { value: 'basicas', label: 'Básicas' },
  { value: 'con-diseno', label: 'Con diseño' },
  { value: 'musculosas', label: 'Musculosas' },
  { value: 'manga-larga', label: 'Manga larga' },
  { value: 'edicion-limitada', label: 'Edición limitada' },
];

const LABELS = CATEGORY_OPTIONS.reduce(
  (acc, c) => ({ ...acc, [c.value]: c.label }),
  {}
);

// Returns a friendly label for a category slug. Falls back to a humanized
// version of the slug so unknown/legacy categories still display nicely.
export function categoryLabel(slug) {
  if (!slug) return '';
  if (LABELS[slug]) return LABELS[slug];
  return String(slug)
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
