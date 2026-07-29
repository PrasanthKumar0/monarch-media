import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';
import { contentApi, studentApi } from '../api/services';
import { formatCurrency, levelLabels } from '../utils/helpers';
import { useAppSelector } from '../hooks/redux';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAppSelector((s) => s.auth);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    contentApi.course(id).then((res) => setCourse(res.data.data));
  }, [id]);

  const apply = async () => {
    if (!user) {
      toast.error('Please log in to apply');
      return;
    }
    try {
      await studentApi.createApplication({
        university: course.university._id || course.university,
        course: course._id,
        intake: 'September',
      });
      toast.success('Application submitted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!course) {
    return (
      <section className="section-padding">
        <div className="container-wide">Loading program…</div>
      </section>
    );
  }

  return (
    <>
      <SEO title={course.title} description={course.description} />
      <section className="section-padding">
        <div className="container-wide grid gap-8 lg:grid-cols-3">
          <div className="glass rounded-3xl p-8 lg:col-span-2">
            <p className="text-sm font-semibold text-brand-600">{levelLabels[course.level]}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold">{course.title}</h1>
            <p className="mt-2 text-ink-500">
              {course.university?.name} · {course.country?.name}
            </p>
            <p className="mt-6 text-ink-600">{course.description}</p>
            <h2 className="mt-8 font-display text-xl font-semibold">Entry requirements</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-600">
              {(course.requirements || []).map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <aside className="glass h-fit rounded-3xl p-6">
            <p className="text-sm text-ink-500">Tuition</p>
            <p className="font-display text-3xl font-semibold text-brand-700">
              {formatCurrency(course.tuitionFee, course.currency)}
            </p>
            <p className="mt-2 text-sm text-ink-500">Duration: {course.duration}</p>
            <button
              type="button"
              onClick={apply}
              className="mt-6 w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Start application
            </button>
            <Link to="/contact" className="mt-3 block text-center text-sm font-semibold text-brand-600">
              Ask a counselor
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
};

export default CourseDetail;
