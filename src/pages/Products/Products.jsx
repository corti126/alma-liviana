import { useEffect, useMemo, useState } from 'react';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { listProducts } from '../../firebase/products.js';
import './Products.css';

export default function Products() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
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

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(products.filter((p) => p.active).map((p) => p.category).filter(Boolean))
    );
    return ['Todas', ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.active)
      .filter((p) => (category === 'Todas' ? true : p.category === category))
      .filter((p) =>
        query.trim() ? p.name.toLowerCase().includes(query.toLowerCase()) : true
      );
  }, [products, query, category]);

  return (
    <div className="products-page">
      <div className="container">
        <SectionTitle
          eyebrow="Tienda"
          title="Camisetas Alma Liviana"
          subtitle="Una colección breve, hecha con calma. Pensada para acompañarte cada día."
        />

        <div className="products-page__toolbar">
          <SearchBar value={query} onChange={setQuery} placeholder="Buscar una camiseta…" />
          {categories.length > 1 && (
            <CategoryFilter categories={categories} active={category} onChange={setCategory} />
          )}
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
