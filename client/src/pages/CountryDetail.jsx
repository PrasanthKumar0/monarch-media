import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import CourseCard from '../components/cards/CourseCard';
import { contentApi } from '../api/services';
import { formatCurrency } from '../utils/helpers';

const CountryDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    contentApi.country(id).then((res) => {
      const c = res.data.data;
      setCountry(c);
      contentApi.courses({ country: c._id, limit: 12 }).then((r) => setCourses(r.data.data || []));
    });
  }, [id]);

  if (!country) {
    return (
      <section className="section-padding">
        <div className="container-wide">Loading destination…</div>
      </section>
    );
  }

  return (
    <>
      <SEO title={country.name} description={country.description} />
      <section className="section-padding">
        <div className="container-wide">
          <div className="glass rounded-3xl p-8">
            <p className="text-5xl">{country.flagEmoji}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold">{country.name}</h1>
            <p className="mt-4 max-w-3xl text-ink-600">{country.description}</p>
            <p className="mt-4 text-sm font-semibold text-brand-700">
              Avg. tuition benchmark: {formatCurrency(country.avgTuition, country.currency)}
            </p>
            {country.visaInfo && <p className="mt-3 text-sm text-ink-500">{country.visaInfo}</p>}
          </div>
          <h2 className="mt-10 font-display text-2xl font-semibold">Programs in {country.name}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => (
              <CourseCard key={c._id} course={c} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CountryDetail;
