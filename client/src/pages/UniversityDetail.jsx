import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { contentApi } from '../api/services';
import { formatCurrency } from '../utils/helpers';

const UniversityDetail = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    contentApi.university(id).then((res) => {
      const uni = res.data.data;
      setUniversity(uni);
      contentApi.courses({ university: uni._id, limit: 12 }).then((r) => setCourses(r.data.data || []));
    });
  }, [id]);

  if (!university) {
    return (
      <section className="section-padding">
        <div className="container-wide">Loading university profile…</div>
      </section>
    );
  }

  return (
    <>
      <SEO title={university.name} description={university.description} />
      <section className="section-padding">
        <div className="container-wide">
          <div className="glass rounded-3xl p-8 lg:p-10">
            <p className="text-sm text-ink-500">
              {university.country?.flagEmoji} {university.country?.name} · {university.city}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900">{university.name}</h1>
            <p className="mt-4 max-w-3xl text-ink-600">{university.description}</p>
            {university.tuitionRange && (
              <p className="mt-4 text-sm font-semibold text-brand-700">
                Tuition range: {formatCurrency(university.tuitionRange.min, university.tuitionRange.currency)} –{' '}
                {formatCurrency(university.tuitionRange.max, university.tuitionRange.currency)}
              </p>
            )}
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl font-semibold">Programs at this institution</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <Link
                  key={course._id}
                  to={`/courses/${course.slug || course._id}`}
                  className="glass rounded-xl p-4 transition hover:bg-white"
                >
                  <p className="font-semibold text-ink-900">{course.title}</p>
                  <p className="text-sm text-ink-500">{course.level} · {course.duration}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UniversityDetail;
