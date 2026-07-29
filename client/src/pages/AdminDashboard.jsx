import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';
import { adminApi } from '../api/services';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    Promise.all([adminApi.stats(), adminApi.students({ limit: 8 }), adminApi.contacts()])
      .then(([statsRes, studentsRes, contactsRes]) => {
        setStats(statsRes.data.data);
        setStudents(studentsRes.data.data || []);
        setContacts(contactsRes.data.data?.slice(0, 6) || []);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  const statCards = stats
    ? [
        { label: 'Students', value: stats.students },
        { label: 'Universities', value: stats.universities },
        { label: 'Courses', value: stats.courses },
        { label: 'Applications', value: stats.applications },
        { label: 'New inquiries', value: stats.newContacts },
        { label: 'Published blogs', value: stats.blogs },
      ]
    : [];

  return (
    <>
      <SEO title="Admin Dashboard" />
      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-3xl font-semibold">Operations overview</h1>
            <div className="flex gap-2">
              <Link to="/universities" className="rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm">
                Manage content
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((card) => (
              <div key={card.label} className="glass rounded-2xl p-5">
                <p className="text-sm text-ink-500">{card.label}</p>
                <p className="mt-1 font-display text-3xl font-semibold text-brand-700">{card.value ?? '—'}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold">Recent students</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {students.map((s) => (
                  <li key={s._id} className="flex justify-between border-b border-slate-200/70 pb-2">
                    <span>{s.user?.name}</span>
                    <span className="capitalize text-ink-500">{s.stage}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold">Latest contact messages</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {contacts.map((c) => (
                  <li key={c._id} className="rounded-xl bg-white/70 p-3">
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-ink-500">{c.subject}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
