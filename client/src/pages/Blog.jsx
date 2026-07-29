import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { contentApi } from '../api/services';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    contentApi.blogs({ limit: 20 }).then((res) => setPosts(res.data.data || []));
  }, []);

  return (
    <>
      <SEO title="Blog" description="Study abroad guides, visa updates, and application tips." />
      <section className="section-padding">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-semibold text-ink-900">Insights & guides</h1>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post._id} className="glass overflow-hidden rounded-2xl">
                <div className="h-40 bg-gradient-to-br from-brand-100 to-brand-300" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{post.category}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold">{post.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-500">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug || post._id}`}
                    className="mt-4 inline-flex text-sm font-semibold text-brand-600"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
