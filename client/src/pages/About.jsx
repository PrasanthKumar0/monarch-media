import SEO from '../components/common/SEO';

const About = () => (
  <>
    <SEO title="About" description="Learn about EduPath Global's mission, values, and counselor-led approach." />
    <section className="section-padding">
      <div className="container-wide grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">About EduPath</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900">Independent counseling, built for outcomes</h1>
          <p className="mt-5 text-lg text-ink-500">
            We are a boutique education consultancy focused on fit — aligning your academic profile, budget, and career
            ambitions with programs that actually deliver value.
          </p>
        </div>
        <div className="glass rounded-3xl p-8">
          <h2 className="font-display text-2xl font-semibold">What sets us apart</h2>
          <ul className="mt-5 space-y-4 text-sm text-ink-600">
            <li>• Counselor-led shortlists — not commission-driven lists</li>
            <li>• Document architecture for competitive applications</li>
            <li>• Visa readiness reviews before you pay embassy fees</li>
            <li>• Student dashboard for milestones and uploads</li>
          </ul>
        </div>
      </div>
    </section>
  </>
);

export default About;
