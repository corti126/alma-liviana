import { useMemo, useState } from 'react';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import products, { getCategories } from '../../data/products.js';
import './Products.css';

export default function Products() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const categories = getCategories();

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.active)
      .filter((p) => (category === 'Todas' ? true : p.category === category))
      .filter((p) =>
        query.trim()
          ? p.name.toLowerCase().includes(query.toLowerCase())
          : true
      );
  }, [query, category]);

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
          <CategoryFilter categories={categories} active={category} onChange={setCategory} />
        </div>

        {filtered.length > 0 ? (
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
