import './CategoryFilter.css';

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="category-filter">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`category-filter__chip ${active === c ? 'is-active' : ''}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
