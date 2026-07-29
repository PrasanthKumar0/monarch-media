import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';

const scholarships = [
  {
    name: 'Global Merit Award',
    region: 'UK & Canada',
    value: 'Up to 40% tuition',
    note: 'For strong academic records and leadership portfolios.',
  },
  {
    name: 'STEM Innovators Grant',
    region: 'Australia',
    value: 'AUD 15,000',
    note: 'Research-focused master’s applicants in engineering and CS.',
  },
  {
    name: 'Future Leaders Fellowship',
    region: 'Germany',
    value: 'Living stipend + fee waiver',
    note: 'Public universities with industry co-op tracks.',
  },
];

const Scholarships = () => (
  <>
    <SEO title="Scholarships" description="Curated scholarship opportunities for international students." />
    <section className="section-padding">
      <div className="container-wide">
        <h1 className="font-display text-4xl font-semibold text-ink-900">Scholarships & funding</h1>
        <p className="mt-3 max-w-2xl text-ink-500">
          We maintain an updated pipeline of merit, need-based, and country-specific awards. Eligibility varies by intake.
        </p>
        <div className="mt-10 space-y-4">
          {scholarships.map((s) => (
            <article key={s.name} className="glass flex flex-col gap-2 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold">{s.name}</h2>
                <p className="text-sm text-ink-500">{s.region}</p>
                <p className="mt-2 text-sm text-ink-600">{s.note}</p>
              </div>
              <p className="text-lg font-semibold text-brand-700">{s.value}</p>
            </article>
          ))}
        </div>
        <Link to="/contact" className="mt-8 inline-flex text-sm font-semibold text-brand-600">
          Check eligibility with a counselor →
        </Link>
      </div>
    </section>
  </>
);

export default Scholarships;
