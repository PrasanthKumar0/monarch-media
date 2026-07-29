import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';
import { studentApi } from '../api/services';
import { useAppSelector } from '../hooks/redux';

const StudentDashboard = () => {
  const { user } = useAppSelector((s) => s.auth);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    Promise.all([studentApi.profile(), studentApi.applications()])
      .then(([profileRes, appsRes]) => {
        setProfile(profileRes.data.data);
        setApplications(appsRes.data.data || []);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  return (
    <>
      <SEO title="Student Dashboard" />
      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-ink-500">Welcome back</p>
              <h1 className="font-display text-3xl font-semibold">{user?.name}</h1>
            </div>
            <Link to="/courses" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
              Browse programs
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass rounded-2xl p-6 lg:col-span-1">
              <h2 className="font-semibold">Profile stage</h2>
              <p className="mt-2 text-2xl font-display font-semibold text-brand-700 capitalize">
                {profile?.stage || 'lead'}
              </p>
              <p className="mt-3 text-sm text-ink-500">
                Nationality: {profile?.nationality || 'Not set'}
              </p>
            </div>

            <div className="glass rounded-2xl p-6 lg:col-span-2">
              <h2 className="font-semibold">Applications</h2>
              {applications.length === 0 ? (
                <p className="mt-4 text-sm text-ink-500">No applications yet. Explore courses to get started.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {applications.map((app) => (
                    <li key={app._id} className="rounded-xl border border-slate-200/80 bg-white/60 p-4 text-sm">
                      <p className="font-semibold">{app.course?.title || 'Program'}</p>
                      <p className="text-ink-500">{app.university?.name}</p>
                      <p className="mt-1 capitalize text-brand-700">Status: {app.status.replace('_', ' ')}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentDashboard;
