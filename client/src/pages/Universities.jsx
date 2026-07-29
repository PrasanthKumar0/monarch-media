import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import UniversityCard from '../components/cards/UniversityCard';
import { contentApi } from '../api/services';

const Universities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    contentApi
      .universities({ search: searchParams.get('search') || undefined, limit: 24 })
      .then((res) => setItems(res.data.data || []))
      .catch(() => setItems([]));
  }, [searchParams]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchParams(search ? { search } : {});
  };

  return (
    <>
      <SEO title="Universities" description="Browse partner universities worldwide." />
      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-4xl font-semibold text-ink-900">Universities</h1>
              <p className="mt-2 text-ink-500">Explore institutions vetted for academic quality and student support.</p>
            </div>
            <form onSubmit={onSubmit} className="glass flex max-w-md flex-1 gap-2 rounded-xl p-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or city"
                className="flex-1 bg-transparent px-2 text-sm outline-none"
              />
              <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
                Filter
              </button>
            </form>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((u, i) => (
              <UniversityCard key={u._id} university={u} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Universities;
