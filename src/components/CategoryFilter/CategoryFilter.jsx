import './CategoryFilter.css';
import { categoryLabel } from '../../utils/categories.js';

// Reusable dropdown filter. Used for both Categoría and Tipo de producto.
// `options` is a list of values; `allValue` represents the "show all" choice.
export default function CategoryFilter({
  categories,
  active,
  onChange,
  label = 'Categoría',
  getLabel = categoryLabel,
  allValue = 'Todas',
  allLabel = 'Todos',
}) {
  return (
    <label className="category-filter">
      <span className="category-filter__label">{label}</span>
      <span className="category-filter__select-wrap">
        <select
          className="category-filter__select"
          value={active}
          onChange={(e) => onChange(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === allValue ? allLabel : getLabel(c)}
            </option>
          ))}
        </select>
        <span className="category-filter__chevron" aria-hidden="true">▾</span>
      </span>
    </label>
  );
}
