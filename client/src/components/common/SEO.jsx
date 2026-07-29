import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  const site = 'EduPath Global';
  const fullTitle = title ? `${title} | ${site}` : `${site} | Education Consultancy`;
  const desc =
    description ||
    'Premium education consultancy helping students discover universities, courses, and scholarships worldwide.';

  useEffect(() => {
    document.title = fullTitle;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, [fullTitle, desc]);

  return null;
};

export default SEO;
