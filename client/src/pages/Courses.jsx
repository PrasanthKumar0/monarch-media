import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import CourseCard from '../components/cards/CourseCard';
import { contentApi } from '../api/services';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    contentApi
      .courses({ search: searchParams.get('search') || undefined, limit: 24 })
      .then((res) => setItems(res.data.data || []));
  }, [searchParams]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchParams(search ? { search } : {});
  };

  return (
    <>
      <SEO title="Courses" description="Search bachelor, master, MBA, and PhD programs abroad." />
      <section className="section-padding">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-semibold text-ink-900">Courses & programs</h1>
          <form onSubmit={onSubmit} className="glass mt-6 flex max-w-xl gap-2 rounded-xl p-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search programs"
              className="flex-1 bg-transparent px-2 text-sm outline-none"
            />
            <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
              Search
            </button>
          </form>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((c, i) => (
              <CourseCard key={c._id} course={c} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
