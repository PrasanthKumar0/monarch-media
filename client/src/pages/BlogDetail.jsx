import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { contentApi } from '../api/services';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    contentApi.blog(id).then((res) => setPost(res.data.data));
  }, [id]);

  if (!post) {
    return (
      <section className="section-padding">
        <div className="container-wide">Loading article…</div>
      </section>
    );
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <section className="section-padding">
        <article className="container-wide max-w-3xl">
          <Link to="/blog" className="text-sm font-semibold text-brand-600">
            ← Back to blog
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-brand-600">{post.category}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900">{post.title}</h1>
          <p className="mt-3 text-sm text-ink-500">
            By {post.author?.name || 'EduPath Team'} · {post.readTimeMinutes} min read
          </p>
          <div
            className="prose prose-slate mt-8 max-w-none text-ink-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </section>
    </>
  );
};

export default BlogDetail;
