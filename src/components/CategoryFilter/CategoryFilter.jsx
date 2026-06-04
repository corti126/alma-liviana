import './CategoryFilter.css';
import { categoryLabel } from '../../utils/categories.js';

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <label className="category-filter">
      <span className="category-filter__label">Categoría</span>
      <span className="category-filter__select-wrap">
        <select
          className="category-filter__select"
          value={active}
          onChange={(e) => onChange(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'Todas' ? 'Todos' : categoryLabel(c)}
            </option>
          ))}
        </select>
        <span className="category-filter__chevron" aria-hidden="true">▾</span>
      </span>
    </label>
  );
}
