import { useState } from 'react';
import { popularProducts } from '../data/products';
import SectionHead from './SectionHead';
import ProductCard from './ProductCard';
import { State } from './States';

const FILTERS = [
  { id: 'all', label: 'All Games' },
  { id: 'pubg', label: 'PUBG Mobile' },
  { id: 'mlbb', label: 'Mobile Legends' },
  { id: 'hok', label: 'Honor of Kings' },
  { id: 'genshin', label: 'Genshin Impact' }
];

function ProductSkeleton() {
  return (
    <div className="skel-product" aria-hidden="true">
      <div className="skel skel-product__art" />
      <div className="skel skel-line skel-line--w40" />
      <div className="skel skel-line" />
      <div className="skel skel-line skel-line--w60" />
    </div>
  );
}

export default function PopularProducts({ limit = 8, loading = false }) {
  const [filter, setFilter] = useState('all');
  const all = popularProducts();
  const list = filter === 'all' ? all : all.filter((p) => p.game === filter);
  const visible = list.slice(0, limit);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHead eyebrow="Bestsellers" title="Most Popular" desc="Top picks from across Nabeel Astro Store." link="/games" linkLabel="Browse all" />

        <div className="filter-pills" role="tablist" aria-label="Filter games">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={`filter-pill${filter === f.id ? ' active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid--4" role="tabpanel">
            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : visible.length ? (
          <div className="grid grid--4" role="tabpanel">
            {visible.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="panel" role="tabpanel">
            {filter === 'genshin' ? (
              <State
                tone="empty"
                icon="✦"
                title="Genshin Impact is coming soon"
                desc="We're preparing top-up packages for Genshin Impact. Prices and packages will be available shortly."
              />
            ) : (
              <State
                tone="empty"
                icon="✦"
                title="No products available yet"
                desc="We're preparing more top-up options for this game."
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
