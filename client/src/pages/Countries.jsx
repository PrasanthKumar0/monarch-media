import { useEffect, useState } from 'react';
import SEO from '../components/common/SEO';
import CountryCard from '../components/cards/CountryCard';
import { contentApi } from '../api/services';

const Countries = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    contentApi.countries({ limit: 24 }).then((res) => setItems(res.data.data || []));
  }, []);

  return (
    <>
      <SEO title="Countries" description="Compare study destinations, visa pathways, and tuition benchmarks." />
      <section className="section-padding">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-semibold text-ink-900">Study destinations</h1>
          <p className="mt-2 max-w-2xl text-ink-500">
            Each country guide covers intakes, work rights, and typical budgets — updated for 2026 cycles.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c, i) => (
              <CountryCard key={c._id} country={c} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Countries;
