import { useEffect, useMemo, useState } from 'react';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { listProducts } from '../../firebase/products.js';
import {
  PRODUCT_TYPE_OPTIONS,
  productTypeOf,
  productTypeLabel,
} from '../../utils/productTypes.js';
import './Products.css';

export default function Products() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [type, setType] = useState('todos');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await listProducts();
        if (active) setProducts(data);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Product types present in the catalog, ordered by our canonical list so the
  // navigation scales automatically as new families (buzos, camperas…) appear.
  const types = useMemo(() => {
    const present = new Set(products.filter((p) => p.active).map(productTypeOf));
    const ordered = PRODUCT_TYPE_OPTIONS.map((t) => t.value).filter((v) =>
      present.has(v)
    );
    const extras = [...present].filter(
      (v) => !PRODUCT_TYPE_OPTIONS.some((t) => t.value === v)
    );
    return ['todos', ...ordered, ...extras];
  }, [products]);

  // Categories available within the currently selected type.
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(
        products
          .filter((p) => p.active)
          .filter((p) => (type === 'todos' ? true : productTypeOf(p) === type))
          .map((p) => p.category)
          .filter(Boolean)
      )
    );
    return ['Todas', ...cats];
  }, [products, type]);

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.active)
      .filter((p) => (type === 'todos' ? true : productTypeOf(p) === type))
      .filter((p) => (category === 'Todas' ? true : p.category === category))
      .filter((p) =>
        query.trim() ? p.name.toLowerCase().includes(query.toLowerCase()) : true
      );
  }, [products, query, category, type]);

  // Reset category when switching type if the chosen category disappears.
  useEffect(() => {
    if (category !== 'Todas' && !categories.includes(category)) {
      setCategory('Todas');
    }
  }, [categories, category]);

  return (
    <div className="products-page">
      <div className="container">
        <SectionTitle
          eyebrow="Tienda"
          title="Colección Alma Liviana"
          subtitle="Una colección breve, hecha con calma. Pensada para acompañarte cada día."
        />

        {/* Product type navigation (Tipo). Scales with the catalog. */}
        {/* {types.length > 1 && (
          <nav className="products-page__types" aria-label="Tipo de producto">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                className={`type-tab ${type === t ? 'is-active' : ''}`}
                onClick={() => setType(t)}
              >
                {t === 'todos' ? 'Todos' : productTypeLabel(t)}
              </button>
            ))}
          </nav>
        )} */}

        <div className="products-page__toolbar">
          <SearchBar value={query} onChange={setQuery} placeholder="Buscar una prenda…" />
          <div className="products-page__filters">
            <CategoryFilter
              categories={types}
              active={type}
              onChange={setType}
              label="Tipo"
              getLabel={productTypeLabel}
              allValue="todos"
              allLabel="Todos"
            />
            <CategoryFilter categories={categories} active={category} onChange={setCategory} />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '4rem 0', display: 'grid', placeItems: 'center' }}>
            <LoadingSpinner />
          </div>
        ) : error ? (
          <EmptyState
            title="No pudimos cargar la tienda"
            description="Revisa la conexión e inténtalo de nuevo en unos minutos."
          />
        ) : filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <EmptyState
            title="No encontramos prendas con ese criterio"
            description="Intenta con otra búsqueda o explora todas las categorías."
          />
        )}
      </div>
    </div>
  );
}
